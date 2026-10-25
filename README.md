# SlothShift 🌙

**Your local AI night worker.** SlothShift scans a folder you choose, asks a locally installed Gemma model to prepare summaries and organization suggestions, lets you edit and approve the results, and exports verified copies plus useful reminders. The source files are never renamed, moved, or overwritten.

## Why open innovation?

SlothShift routes document content to Ollama on `127.0.0.1`, not a hosted AI provider. That gives the user control over model choice, keeps ordinary inference on their own computer, avoids per-request hosted inference charges, and can operate offline after setup and model download.

## Requirements

- Windows 10/11 (Electron may also work on other supported desktop platforms)
- Node.js 20 or newer
- [Ollama](https://ollama.com/) installed locally

## Run from source

```powershell
npm install
ollama pull gemma4:e2b
npm run dev
```

The app defaults to `gemma4:e2b`. In Settings, refresh the Ollama connection, choose another installed model, or download the selected model. SlothShift never substitutes fake AI responses if Ollama is unavailable.

## Build and test

```powershell
npm test
npm run check
npm run build
```

Build a Windows installer with `npm run dist:win` after dependencies have been installed. A model download and initial dependency installation need internet; the core analysis workflow only uses the local Ollama service.

## Workflow

1. Select a source folder to scan supported files recursively.
2. Select the files to analyze and run Night Shift.
3. Inspect the model's summary, evidence, dates, and warnings; edit suggestions and approve or reject them.
4. Choose an export destination **outside** the source folder. SlothShift copies approved originals to a timestamped Lazy Pack, verifies copied hashes, writes a manifest and draft notes, and adds an ICS calendar file only for clear dates.

Supported formats: TXT, Markdown, CSV, JSON, text-based PDF, DOCX, XLSX, JPG, JPEG, and PNG. Scanned PDFs without selectable text are reported as unsupported; OCR is not included in this version. Image understanding depends on vision support in the selected local model.

## Privacy and safety

- No cloud LLM, telemetry, or remote analytics.
- Document content is sent to local Ollama only.
- Scanning is read-only; export writes copies to a separate destination.
- Every organization suggestion requires user approval before export.
- Existing output files are not overwritten; changed source files are skipped with a warning.
- Local state is kept in Electron's application user-data folder and can be cleared in Settings.

The model's output is a suggestion, not verified truth. Inspect the evidence for important or ambiguous items. Do not treat the estimated time-saved metric as a measured user study.

## Challenge entry draft

See [`docs/CHALLENGE_SUBMISSION.md`](docs/CHALLENGE_SUBMISSION.md). Record a real local Gemma inference run before claiming working model integration or measured time savings in a public entry.
