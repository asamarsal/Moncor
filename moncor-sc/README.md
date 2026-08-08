# Moncor smart contracts (v1 candidate)

Non-upgradeable, native-MON-only candidate for Monad Testnet (`chainId 10143`). Native currency uses `address(0)` and exact `msg.value`. Production remains ADR-gated for asset metadata, economics/outcomes, policy, quorum/revocation, governance, audit, and deployment approval.

## Build and validation

```sh
npm install
npm test
```

Foundry is unavailable locally. The npm compiler compiles all Solidity under `src/`, `script/`, and `test/` with solc 0.8.36, OpenZeppelin 5.6.1, optimizer 200, Cancun, and via-IR. The Node checks are explicitly **static checks**, not EVM runtime tests. `test/PureRules.t.sol` is a self-contained Solidity harness compiled here but requires Foundry/another EVM to execute. Generated `artifacts/solc-output.json` is local validation output.

## Security model

- Signed `maxPayout` is the wager's **total reserved economic exposure, including payout plus protocol fee**. Settlement requires `payout + fee <= maxPayout`. Vault protection is `claimable + refundable + reservedPayout + protocolFeesAccrued`; views expose `protectedBalance`, `freeReserve`, and `withdrawableProtocolFees`.
- Quote terms include signer-set version and immutable timeout-refund deadline. The wager ID is `keccak256(address(router), full EIP-712 quote struct hash)` and settlement signs/binds that `termsHash`.
- Signer sets remain valid by historical version. Emergency signer revocation is version-scoped; there is deliberately no bulk retirement function that could accidentally strand all old wagers. Exactly threshold, strictly ascending unique signatures are required.
- Anyone may trigger a stake refund after signed `refundAvailableAt`, including while acceptance or settlement is paused. Claims and refunds are never pause-gated. A zero-payout LOSS closes directly; WIN requires a positive payout.
- Acceptance, settlement, and fee withdrawal have separate pause controls. There is no arbitrary vault drain or global player/wager loop.
- `maxQuoteTtl` and `maxStartDelay` are nonzero, bounded constructor/manifest parameters. The latter also caps the signed post-settlement refund delay in this v1 candidate.

## Deployment helper

`DeployMonadTestnet.s.sol` is a constructor-only helper that reads no key and asserts chain 10143. Its creation transaction atomically deploys Vault and Verifier with itself as temporary admin, deploys Router with the final admin, wires Router roles, grants final governance roles, then renounces every helper role. Deployed addresses are emitted in `DeploymentCreated`. Constructor config must come from a reviewed manifest. The included manifest is only a placeholder and does not prove deployment.

No deployment, login, commit, runtime EVM test, Foundry fuzz/invariant run, RPC verification, audit, or production approval was performed.
