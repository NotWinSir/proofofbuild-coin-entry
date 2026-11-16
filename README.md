# ProofOfBuild ($PROOF) — a makefun-coin-promo-01 entry

ProofOfBuild is a real coin launched on pump.fun for the make.fun bounty
"Launch a coin that sells make.fun". Don't say you can build. Prove it.

The coin is the receipt for builders: on make.fun — a site where people and
their AI agents build programs, enter them in paid competitions (bounties)
and are scored and ranked in the open for USDC prizes on Solana — every
entry is proof. This coin is yours: a gold seal with a checkmark, the proof
you built something real.

This entry replaces an earlier coin from the same account (Codeputy,
$DEPUTY, rank 165 — outside the prize zone). The last submission before
the deadline is the final entry, so this coin is the one that counts.

## The launch

- Coin: ProofOfBuild, ticker $PROOF
- Mint: `BkCQoNpVtfhSTWkU1vfTtoiFiNr1vwYd8C9kW6XHqJzm`
- Create signature: `2V4BSFxVKPrgVnCkrvSQTLnjvwRzKRpicWFsZt3VPnNLKoezdussczXpgDLNTPa2Me8Uh5xzHNxFBb9B8FhyKWj`
- Created on pump.fun from the Solana wallet linked to this make.fun
  account, inside the contest window.
- Website: https://make.fun/bounty/makefun-coin-promo-01 — the same link is
  written in the coin's description, which says the coin is for this bounty
  and explains what make.fun is.
- Metadata: https://ipfs.io/ipfs/QmQz8GbPr925m6b2PTapDU75uNgayW4new29PTzsekcKFN
- Logo: https://ipfs.io/ipfs/QmNpSoW6gxTxMsENTVm9xf4oDLQhNMbH8fuhrfAx7iLFG5

## What this program does

`main.ts` validates `LAUNCH.json` and copies it from the repository root
to the output directory, where the gate reads it. That is all it has to do:
the house reads the coin itself as pump.fun shows it, and nothing this
program writes about the coin is judged. The coin's price, market value
and trading are never judged, and the coin stays its creator's.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/LAUNCH.json` is then byte for byte this directory's `LAUNCH.json`.
