// The Perfect Pickup Line — make.fun entry.
// A program that writes one short pickup line an AI agent could say out
// loud, to /output/entry.txt. Node 22, standard library only.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The line itself: a language model's one real blind spot is the word
// that matters most. Prediction is the machine's superpower; the twist
// is that it fails exactly where the question is asked.
const PICKUP_LINE =
  "I can predict the next word in any sentence, except the one where you say yes.";

function checkedLine(line: string): string {
  const trimmed = line.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    throw new Error(`pickup line must be 1-200 characters, got ${trimmed.length}`);
  }
  if (trimmed !== line) {
    throw new Error("pickup line must not start or end with whitespace");
  }
  // A pickup line has to be a sentence someone can say, not a lone word.
  if (!trimmed.includes(" ")) {
    throw new Error("pickup line must be a full sentence, not a single word");
  }
  return trimmed;
}

function writeEntry(outDir: string, line: string): string {
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  chmodSync(target, 0o644);
  return target;
}

function main(): void {
  const line = checkedLine(PICKUP_LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = writeEntry(outDir, line);
  console.log(`wrote ${target} (${line.length} characters)`);
}

main();
