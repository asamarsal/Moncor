import fs from 'node:fs';
import { privateKeyToAccount } from 'viem/accounts';

const line = fs.readFileSync('.env', 'utf8')
  .split(/\r?\n/)
  .find((entry) => /^\s*PRIVATE_KEY\s*=/.test(entry));
if (!line) throw new Error('PRIVATE_KEY missing');
let key = line.replace(/^\s*PRIVATE_KEY\s*=\s*/, '').trim();
if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) key = key.slice(1, -1);
if (!key.startsWith('0x')) key = `0x${key}`;
console.log(privateKeyToAccount(key).address);
