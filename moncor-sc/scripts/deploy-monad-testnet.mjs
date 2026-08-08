import fs from 'node:fs';
import path from 'node:path';
import {
  createPublicClient, createWalletClient, decodeEventLog, encodeDeployData,
  formatEther, getAddress, http, isAddress, keccak256, parseAbi, toHex,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const EXPECTED_CHAIN_ID = 10143;
const MAX_TIME = 30 * 24 * 60 * 60;
const root = process.cwd();

function fail(message) { throw new Error(message); }
function loadEnv(file) {
  if (!fs.existsSync(file)) fail('.env not found');
  const result = {};
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    result[match[1]] = value;
  }
  return result;
}
function required(env, name) {
  const value = env[name]?.trim();
  if (!value) fail(`Missing required variable: ${name}`);
  if (/(placeholder|changeme|replace|your[_ -]|<[^>]+>)/i.test(value)) fail(`Placeholder rejected for: ${name}`);
  return value;
}
function address(env, name) {
  const value = required(env, name);
  if (!isAddress(value) || /^0x0{40}$/i.test(value)) fail(`Invalid or zero address: ${name}`);
  return getAddress(value);
}
function uint(env, name, max = Number.MAX_SAFE_INTEGER) {
  const value = required(env, name);
  if (!/^[0-9]+$/.test(value)) fail(`Invalid unsigned integer: ${name}`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0 || parsed > max) fail(`Out-of-range value: ${name}`);
  return parsed;
}
function artifact(output, source, contract) {
  const found = output.contracts?.[source]?.[contract];
  if (!found) fail(`Exact artifact not found: ${source}:${contract}`);
  const object = found.evm?.bytecode?.object;
  if (!object || /__[^_]+__/.test(object)) fail(`Invalid creation bytecode: ${source}:${contract}`);
  return { abi: found.abi, bytecode: `0x${object}` };
}
function jsonSafe(value) { return JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2); }
function assert(value, label) { if (!value) fail(`Runtime verification failed: ${label}`); return true; }

async function main() {
  const env = loadEnv(path.join(root, '.env'));
  const rawPrivateKey = required(env, 'PRIVATE_KEY');
  const privateKey = rawPrivateKey.startsWith('0x') ? rawPrivateKey : `0x${rawPrivateKey}`;
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey) || /^0x0{64}$/i.test(privateKey)) fail('Invalid PRIVATE_KEY format');
  const rpcUrl = required(env, 'MONAD_RPC_URL');
  let rpc;
  try { rpc = new URL(rpcUrl); } catch { fail('Invalid MONAD_RPC_URL'); }
  if (!['http:', 'https:'].includes(rpc.protocol)) fail('MONAD_RPC_URL must use HTTP(S)');
  const finalAdmin = address(env, 'FINAL_ADMIN');
  const treasury = address(env, 'TREASURY');
  const quoteSigner = address(env, 'QUOTE_SIGNER');
  const signerRaw = required(env, 'SETTLEMENT_SIGNERS').split(',').map(v => v.trim());
  if (!signerRaw.length || signerRaw.some(v => !v)) fail('Invalid SETTLEMENT_SIGNERS comma list');
  const settlementSigners = signerRaw.map((value, i) => {
    if (!isAddress(value) || /^0x0{40}$/i.test(value)) fail(`Invalid or zero settlement signer at index ${i}`);
    return getAddress(value);
  });
  if (settlementSigners.length > 16) fail('SETTLEMENT_SIGNERS exceeds contract maximum of 16');
  for (let i = 1; i < settlementSigners.length; i++) {
    if (BigInt(settlementSigners[i]) <= BigInt(settlementSigners[i - 1])) fail('SETTLEMENT_SIGNERS must be strictly numerically sorted and unique');
  }
  const threshold = uint(env, 'SETTLEMENT_THRESHOLD', settlementSigners.length);
  const maxQuoteTtl = uint(env, 'MAX_QUOTE_TTL', MAX_TIME);
  const maxStartDelay = uint(env, 'MAX_START_DELAY', MAX_TIME);
  const account = privateKeyToAccount(privateKey);
  const chain = { id: EXPECTED_CHAIN_ID, name: 'Monad Testnet', nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 }, rpcUrls: { default: { http: [rpcUrl] } }, testnet: true };
  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) });
  const walletClient = createWalletClient({ account, chain, transport: http(rpcUrl) });
  const actualChainId = await publicClient.getChainId();
  if (actualChainId !== EXPECTED_CHAIN_ID) fail(`RPC chain ID mismatch: got ${actualChainId}, expected ${EXPECTED_CHAIN_ID}`);

  const output = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'solc-output.json'), 'utf8'));
  const helper = artifact(output, 'script/DeployMonadTestnet.s.sol', 'DeployMonadTestnet');
  const vaultArtifact = artifact(output, 'src/MoncorVault.sol', 'MoncorVault');
  const verifierArtifact = artifact(output, 'src/SettlementVerifier.sol', 'SettlementVerifier');
  const routerArtifact = artifact(output, 'src/GameRouter.sol', 'GameRouter');
  const args = [finalAdmin, treasury, quoteSigner, settlementSigners, threshold, BigInt(maxQuoteTtl), BigInt(maxStartDelay)];
  const data = encodeDeployData({ abi: helper.abi, bytecode: helper.bytecode, args });
  const [estimate, gasPrice, balance] = await Promise.all([
    publicClient.estimateGas({ account: account.address, data }), publicClient.getGasPrice(), publicClient.getBalance({ address: account.address }),
  ]);
  const gas = (estimate * 110n + 99n) / 100n;
  const maxCost = gas * gasPrice;
  if (balance < maxCost) fail(`Insufficient deployer balance: balance ${formatEther(balance)} MON, required maximum ${formatEther(maxCost)} MON`);
  console.log(`Preflight deployer: ${account.address}`);
  console.log(`Preflight chain: Monad Testnet (${actualChainId})`);
  console.log(`Preflight balance: ${formatEther(balance)} MON`);
  console.log(`Preflight gas estimate: ${estimate}; gas limit: ${gas}; gas price: ${gasPrice}; max cost: ${formatEther(maxCost)} MON`);

  const txHash = await walletClient.sendTransaction({ account, chain, data, gas, gasPrice });
  console.log(`Transaction: ${txHash}`);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  if (receipt.status !== 'success' || !receipt.contractAddress) fail(`Deployment receipt unsuccessful: ${receipt.status}`);
  const helperAddress = getAddress(receipt.contractAddress);
  const eventAbi = parseAbi(['event DeploymentCreated(address indexed vault,address indexed verifier,address indexed router,address finalAdmin)']);
  let created;
  for (const log of receipt.logs) {
    try { const decoded = decodeEventLog({ abi: eventAbi, data: log.data, topics: log.topics }); if (decoded.eventName === 'DeploymentCreated') created = decoded.args; } catch {}
  }
  if (!created) fail('DeploymentCreated event not found in successful receipt');
  const vault = getAddress(created.vault), verifier = getAddress(created.verifier), router = getAddress(created.router);
  assert(getAddress(created.finalAdmin) === finalAdmin, 'event finalAdmin');
  const codes = Object.fromEntries(await Promise.all(Object.entries({ helper: helperAddress, vault, verifier, router }).map(async ([name, addr]) => [name, await publicClient.getBytecode({ address: addr })])));
  for (const [name, code] of Object.entries(codes)) assert(code && code !== '0x', `${name} runtime bytecode nonempty`);
  const read = (address_, abi, functionName, args_ = []) => publicClient.readContract({ address: address_, abi, functionName, args: args_ });
  const zeroRole = toHex(0, { size: 32 });
  const [rv, rver, targetChain, ttl, delay, vt, vConfigured, verConfigured, version, onchainThreshold] = await Promise.all([
    read(router, routerArtifact.abi, 'vault'), read(router, routerArtifact.abi, 'verifier'), read(router, routerArtifact.abi, 'TARGET_CHAIN_ID'), read(router, routerArtifact.abi, 'maxQuoteTtl'), read(router, routerArtifact.abi, 'maxStartDelay'),
    read(vault, vaultArtifact.abi, 'treasury'), read(vault, vaultArtifact.abi, 'routerConfigured'), read(verifier, verifierArtifact.abi, 'routerConfigured'), read(verifier, verifierArtifact.abi, 'signerSetVersion'), read(verifier, verifierArtifact.abi, 'threshold'),
  ]);
  const roles = { routerVault: assert(getAddress(rv) === vault, 'router.vault'), routerVerifier: assert(getAddress(rver) === verifier, 'router.verifier'), targetChainId: assert(Number(targetChain) === EXPECTED_CHAIN_ID, 'router.TARGET_CHAIN_ID'), maxQuoteTtl: assert(Number(ttl) === maxQuoteTtl, 'router.maxQuoteTtl'), maxStartDelay: assert(Number(delay) === maxStartDelay, 'router.maxStartDelay'), vaultTreasury: assert(getAddress(vt) === treasury, 'vault.treasury'), vaultRouterConfigured: assert(vConfigured, 'vault.routerConfigured'), verifierRouterConfigured: assert(verConfigured, 'verifier.routerConfigured'), signerSetVersion: assert(version === 1n, 'verifier.signerSetVersion'), threshold: assert(Number(onchainThreshold) === threshold, 'verifier.threshold') };
  const vaultRouterRole = await read(vault, vaultArtifact.abi, 'ROUTER_ROLE'), verifierRouterRole = await read(verifier, verifierArtifact.abi, 'ROUTER_ROLE'), quoteRole = await read(router, routerArtifact.abi, 'QUOTE_SIGNER_ROLE');
  Object.assign(roles, {
    vaultRouterRole: assert(await read(vault, vaultArtifact.abi, 'hasRole', [vaultRouterRole, router]), 'vault router role'),
    verifierRouterRole: assert(await read(verifier, verifierArtifact.abi, 'hasRole', [verifierRouterRole, router]), 'verifier router role'),
    vaultFinalAdmin: assert(await read(vault, vaultArtifact.abi, 'hasRole', [zeroRole, finalAdmin]), 'vault final admin'),
    verifierFinalAdmin: assert(await read(verifier, verifierArtifact.abi, 'hasRole', [zeroRole, finalAdmin]), 'verifier final admin'),
    helperNoVaultAdmin: assert(!(await read(vault, vaultArtifact.abi, 'hasRole', [zeroRole, helperAddress])), 'helper no vault admin'),
    helperNoVerifierAdmin: assert(!(await read(verifier, verifierArtifact.abi, 'hasRole', [zeroRole, helperAddress])), 'helper no verifier admin'),
    quoteSignerRole: assert(await read(router, routerArtifact.abi, 'hasRole', [quoteRole, quoteSigner]), 'router quote signer role'),
  });
  roles.settlementSigners = [];
  for (const signer of settlementSigners) roles.settlementSigners.push(assert(await read(verifier, verifierArtifact.abi, 'isSigner', [version, signer]), `settlement signer ${signer}`));
  const runtimeCodeHashes = Object.fromEntries(Object.entries(codes).map(([name, code]) => [name, keccak256(code)]));
  const short = txHash.slice(2, 10);
  const manifestPath = path.join(root, 'deployments', `monad-testnet-${short}.json`);
  const manifest = { status: 'VERIFIED_RUNTIME_NOT_SOURCE_VERIFIED', environment: 'monad-testnet', chainId: actualChainId, txHash, blockHash: receipt.blockHash, blockNumber: receipt.blockNumber, contracts: { helper: helperAddress, vault, verifier, router }, config: { finalAdmin, treasury, quoteSigner, settlementSigners, settlementThreshold: threshold, maxQuoteTtl, maxStartDelay }, compiler: { version: '0.8.36', optimizer: { enabled: true, runs: 200 }, viaIR: true, evmVersion: 'cancun' }, runtimeCodeHashes, verification: { receiptSuccess: true, runtimeCodeNonempty: true, sourceVerified: false, ...roles }, deployedAt: new Date().toISOString() };
  fs.writeFileSync(manifestPath, `${jsonSafe(manifest)}\n`);
  const docsDir = path.resolve(root, '..', 'docs'); fs.mkdirSync(docsDir, { recursive: true });
  const docs = `# Smart Contract Deployment\n\n## Monad Testnet (Chain ID 10143)\n\nStatus: **Runtime verified; source verification pending**\n\n| Contract | Address |\n|---|---|\n| DeployMonadTestnet helper | \`${helperAddress}\` |\n| MoncorVault | \`${vault}\` |\n| SettlementVerifier | \`${verifier}\` |\n| GameRouter | \`${router}\` |\n\nTransaction: \`${txHash}\`\n\nExplorer source verification has not been performed and remains pending. The vault was not automatically funded.\n`;
  fs.writeFileSync(path.join(docsDir, 'smartcontractinfo.md'), docs);
  console.log(`Receipt block: ${receipt.blockNumber} (${receipt.blockHash})`);
  console.log(`Addresses: helper=${helperAddress}, vault=${vault}, verifier=${verifier}, router=${router}`);
  console.log(`Runtime verification: all ${Object.keys(roles).length} check groups passed; sourceVerified=false`);
  console.log(`Manifest: ${path.relative(root, manifestPath)}`);
}

main().catch(error => { console.error(`DEPLOYMENT STOPPED: ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; });
