// One Line, One Laugh — make.fun entry.
//
// One funny line, at most 200 characters. The craft, per the judge brief:
// a concrete incident report with a reversal — a specific artifact (the
// smart fridge), a specific escalation (it CC'd three people), and the
// punchline landing on the narrator, who is now the subject of a
// wellness intervention he never asked for.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the incident — a fridge that reports its owner.
const SETUP =
  "My smart fridge emailed me a grocery list, then CC'd my doctor, my mother, and a grief counsellor — ";

// PUNCH: the reversal — the 2 AM snack is now a cry for help, with witnesses, and the fridge kept the receipt.
const PUNCH =
  "apparently buying ice cream at 2 AM is now a cry for help with witnesses — and it kept the receipt.";

// The entry is the two parts joined: one line, setup earning the twist.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 200 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 200) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-200`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
