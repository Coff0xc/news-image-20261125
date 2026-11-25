// News image entry for make.fun, 25 November 2026.
// The picture was drawn up front and ships in this repository as
// entry.png; the grader runs this program with no network, so the
// program's only job is to place that exact picture at the output
// path the grader reads, with permissions any user can read.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const picture = readFileSync(new URL("./entry.png", import.meta.url));
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, picture, { mode: 0o644 });
// The write mode above is masked by the process umask, so set the
// readable-by-everyone mode explicitly: the grader collects the
// output as a different user, and a file only its owner can read
// fails its check even though the program wrote it.
chmodSync(outPath, 0o644);
