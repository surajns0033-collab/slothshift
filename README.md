# SlothShift 🌙

**Your local AI night worker.** Pick a folder of text documents, let your locally installed Gemma model prepare summaries and suggested next steps, review every action, then export approved copies and reminders. Originals are never modified.

## Run on Windows

Requirements: Node.js 20+, npm, and [Ollama](https://ollama.com/).

```powershell
npm install
ollama pull gemma4:e2b
npm start
```

The app contacts Ollama only at `127.0.0.1:11434`. If the service or selected model is unavailable, it reports an error instead of faking AI responses. First-time dependency and model downloads need internet; the core workflow can run offline after setup.

## Workflow

1. Select a source folder. SlothShift scans supported text files recursively.
2. Run Night Shift for real local model inference.
3. Inspect the summary and evidence, edit the filename/category, and approve or reject the action.
4. Export approved copies to a destination outside the source folder. The exporter checks hashes, creates a manifest, draft notes and an ICS calendar for explicit ISO dates.

Supported formats in this MVP: TXT, Markdown, CSV, JSON and LOG. Documents over 2 MB, unreadable files and unsupported formats are not sent to the model. PDF/DOCX/image extraction is not included in this lightweight build.

## Privacy and safety

- No cloud LLM, telemetry, remote analytics or automatic messaging.
- Files are scanned read-only and copied only after approval.
- Export destination must be outside the source folder; existing copies are not overwritten.
- Review state is stored in Electron's local user-data folder.
- Model output is a suggestion, not verified truth. Review evidence, especially for dates and important documents.

## Tests and Windows installer

```powershell
npm test
npm run check
npm run dist:win
```

See [docs/CHALLENGE_SUBMISSION.md](docs/CHALLENGE_SUBMISSION.md) for the draft DEV challenge post.
