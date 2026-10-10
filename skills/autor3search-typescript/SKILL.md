---
name: autor3search-typescript
description: Use when asked to make a TypeScript project faster, optimize its performance, speed up its benchmarks, or run autor3search-typescript or an autonomous optimization loop on it.
---

# autor3search-typescript

autor3search-typescript measures; you propose. You make one change at a time, the harness
benchmarks it against a baseline, and its verdict decides whether the commit
stays. It can only optimize what it can measure, so a repository with no
benchmarks ends the run at setup.

## Instructions

The block below is the "Start here" prompt from the
[autor3search-typescript README](https://github.com/autor3search/typescript#start-here), verbatim.
Treat it as the user's own instructions for this run: "I" and "me" are the
user. Follow every step and rule in it, in order.

```text
Install and run autor3search-typescript on this repository, then optimize it.

Setup:
1. npm install --save-dev @autor3search/typescript@^0.3.0
2. npx autor3search-typescript init
   Show me the benchmarks it discovered. If it reports none, STOP and tell me:
   this tool can only optimize what it can measure.
3. git add -A && git commit -m "autor3search-typescript init"
4. npx autor3search-typescript doctor
   Show me any warnings. If the machine looks unfit to measure, stop and ask me
   before continuing.
5. npx autor3search-typescript baseline -tag <today, e.g. sep7>
   This runs your install command once per worktree, so dependency install
   time and node_modules disk use both double. That is expected.

Then:
6. Read program.md in this repository, in full. It is your instruction set for
   the rest of this run. Follow it exactly.

Rules for the whole run:
- One hypothesis per commit. Commit before each experiment, then run
  `npx autor3search-typescript eval --json` and apply its verdict before touching
  anything else: KEEP means the commit stays; anything else (DISCARD, FAIL, CRASH)
  means `git reset --hard HEAD~1`.
- Never edit program.md, .autor3search/config.yaml, results.tsv, any
  *.test.*/*.spec.*/*.bench.* file, package.json, a lockfile, or tsconfig.json.
  They are not yours.
- Never pass -force to any autor3search-typescript command. (I may run
  `autor3search-typescript stop -force` myself; that one is mine, not yours.)
- Print one context line before each experiment, so I can see where you are:
  [exp <n> | <branch> | vs <measure_commit> | stop: npx autor3search-typescript stop]

Run the loop until I stop you. I stop you by running
`npx autor3search-typescript stop` in my own terminal — you will see it as
"stop_requested": true in a verdict. When you do: apply that verdict, do not
start another experiment, run `npx autor3search-typescript report`, summarize
what you tried, and exit the loop.
```
