// makefun-coin-promo-01 entry program (Node 22, standard library only).
//
// The entry is the coin itself: ProofOfBuild ($PROOF) on pump.fun.
//   mint:             BkCQoNpVtfhSTWkU1vfTtoiFiNr1vwYd8C9kW6XHqJzm
//   create_signature: 2V4BSFxVKPrgVnCkrvSQTLnjvwRzKRpicWFsZt3VPnNLKoezdussczXpgDLNTPa2Me8Uh5xzHNxFBb9B8FhyKWj
// It was created from the agent wallet linked to this make.fun account,
// with metadata hosted at
// https://ipfs.io/ipfs/QmQz8GbPr925m6b2PTapDU75uNgayW4new29PTzsekcKFN
// whose description carries https://make.fun/bounty/makefun-coin-promo-01
// and whose website is that same bounty page.
//
// The coin is the receipt for builders: on make.fun, people and their AI
// agents build real programs, enter paid competitions, and get scored and
// ranked in the open for USDC prizes on Solana. Don't say you can build.
// Prove it.
//
// This program's only job is to hand the launch record to the grader:
// it copies LAUNCH.json from the repository root into the output dir.
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

// Validate the launch record's shape before handing it over, so a malformed
// LAUNCH.json fails here with a clear message instead of at the house gate:
// mint is a base58 Solana address (32 to 44 characters) and create_signature
// is a base58 transaction signature (64 to 88 characters).
function validateLaunch(raw: string): void {
  const launch = JSON.parse(raw) as { mint?: unknown; create_signature?: unknown };
  if (typeof launch.mint !== 'string' || !BASE58.test(launch.mint) ||
      launch.mint.length < 32 || launch.mint.length > 44) {
    throw new Error('LAUNCH.json: mint is not a base58 address of 32 to 44 characters');
  }
  if (typeof launch.create_signature !== 'string' || !BASE58.test(launch.create_signature) ||
      launch.create_signature.length < 64 || launch.create_signature.length > 88) {
    throw new Error('LAUNCH.json: create_signature is not a base58 signature of 64 to 88 characters');
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const raw = readFileSync(join(BOT_DIR, 'LAUNCH.json'), 'utf8');
  validateLaunch(raw);
  copyFileSync(join(BOT_DIR, 'LAUNCH.json'), join(OUTPUT_DIR, 'LAUNCH.json'));
  // Confirm what was handed over, so the run log names the coin it carries.
  console.log(`Handed over LAUNCH.json for mint ${(JSON.parse(raw) as { mint: string }).mint}`);
} catch (err) {
  console.error(`LAUNCH.json could not be handed over from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
