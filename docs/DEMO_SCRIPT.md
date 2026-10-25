# SlothShift — 90-second demo recording plan

**Goal:** show a working user journey, not a tour of the code. Record the real local app and keep the model output visible.

## Before recording

1. Install Node.js and Ollama.
2. In PowerShell, run **ollama pull gemma4:e2b**.
3. From the repository root, run **npm install**, then **npm run dev**.
4. Open the Vite localhost URL. Check Settings shows Ollama connected and the selected model is installed. If that fails, fix it before recording; don't fake a successful run.
5. Start screen capture with Windows Game Bar (Win+G) or OBS. Hide unrelated notifications and personal files.

## Shot list

| Time | Show | Say |
| --- | --- | --- |
| 0–8 sec | SlothShift opening screen | “These aren't hard files to deal with—just easy tasks to keep postponing.” |
| 8–18 sec | Click Try a sample vault; show the synthetic invoice, meeting notes, expenses and email | “I start with synthetic files so the demo doesn't expose anyone's documents.” |
| 18–28 sec | Open Local model settings; show Ollama connected and the real selected model name | “The analysis runs through Gemma on this machine, not a hosted model API.” |
| 28–50 sec | Click Run Night Shift; show progress and actual model results | “SlothShift turns each file into a summary and suggested next steps. It doesn't pretend the model is always right.” |
| 50–66 sec | Open Review; point to summary, source excerpt and warnings; edit a next step; approve one item | “I check the source evidence, make a change, and approve only the result I want to keep.” |
| 66–82 sec | Export the approved result; open the downloaded ZIP and show the organized copy, Markdown notes and manifest | “The handoff includes the file, next steps and source hash. The original stays untouched.” |
| 82–90 sec | End on repo or README | “Slow and steady: local AI does the first pass, and I keep the final decision.” |

## Recording integrity

- Use a real run with the actual local model. If the first run takes longer, record the wait or shorten the sample to one or two files—don't replace output with prewritten results.
- Do not show real client, financial, medical, or personal files.
- If you hit an error, fix the cause and re-record the full happy path.
- Upload the recording somewhere public and replace the demo placeholder in docs/CHALLENGE_SUBMISSION.md with that exact URL.
- Record actual timings before writing any time-saved claim. The dashboard estimate is an assumption, not a benchmark.
- Mention Best Use of Gemma only if the recording proves the selected Gemma model generated the suggestions.
