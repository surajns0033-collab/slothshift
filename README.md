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

Supported formats in this MVP: TXT, Markdown, CSV, JSON and LOG. Files over 2 MB and unreadable files are marked with an error. PDF/DOCX/image extraction is not included in this lightweight release.

## Privacy and safety

- No cloud LLM, telemetry, remote analytics or automatic messaging.
- Files are scanned read-only and copied only after approval.
- Export destination must be outside the source folder. Existing copy names are not overwritten.
- Local review history persists in Electron's application user-data folder.
- The model's output is a suggestion, not verified truth. Review source evidence, especially around dates and important documents.
- The time-saved metric is an estimate based on an editable assumption, not a measured user study.

## Tests

```powershell
npm test
npm run check
```

Build a Windows installer with `npm run dist:win`. See [docs/CHALLENGE_SUBMISSION.md](docs/CHALLENGE_SUBMISSION.md) for the DEV challenge post draft.
