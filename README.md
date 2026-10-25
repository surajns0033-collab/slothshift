# SlothShift 🌙

<p align="center">
  <strong>Your local AI night worker.</strong><br />
  <em>Let the boring work wait less.</em>
</p>

<p align="center">
  <a href="https://github.com/surajns0033-collab/slothshift/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/surajns0033-collab/slothshift/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="Electron" src="https://img.shields.io/badge/Electron-45-47848F?logo=electron&logoColor=white" />
  <img alt="Local AI" src="https://img.shields.io/badge/AI-Gemma%20%2B%20Ollama-8A9A5B" />
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-green.svg" /></a>
</p>

SlothShift is a **local-first desktop assistant** for the files you keep meaning to organize. It scans a folder you choose, asks a locally installed Gemma model to prepare summaries and next-step suggestions, lets you review and approve the results, and exports a tidy collection of copies and useful follow-ups.

Unlike a cloud-first assistant, SlothShift sends document content to **Ollama on your own machine**. Your original files stay where they are; SlothShift works from a review queue and exports approved copies to a separate destination.

> **Built for:** people who want less repetitive digital admin without handing their documents to a hosted AI service.

## At a glance

| | |
| --- | --- |
| **Product** | Local-first AI desktop utility |
| **Desktop shell** | Electron |
| **Interface** | HTML, CSS, and JavaScript |
| **Model runtime** | [Ollama](https://ollama.com/) |
| **Default model** | gemma4:e2b |
| **Inference endpoint** | 127.0.0.1:11434 |
| **Primary platform** | Windows |
| **License** | MIT |

## Why SlothShift?

Digital clutter is not always a storage problem. It is a pile of small decisions: *What is this file? What matters in it? What should I do next? Where should it go?*

SlothShift applies a deliberately simple loop:

**Scan → Analyze locally → Review → Approve → Export**

The model prepares suggestions; the user makes the decisions. No document is considered “handled” just because a model generated text.

## Features

- **Real folder scanning** — choose a source directory through a native desktop dialog; SlothShift recursively discovers common text, PDF, DOCX, XLSX, email and RTF/HTML files.
- **Local Gemma inference** — use an installed Ollama model to generate a summary, proposed filename, category, evidence excerpt, possible dates, next steps, warnings, and an optional draft response.
- **Human review** — inspect the model's suggestion, edit the proposed filename or category, then approve or reject it.
- **Copy-only export** — approved files are copied to a separate destination; the originals are not renamed, moved, or deleted.
- **Export integrity checks** — compare SHA-256 hashes after copying and stop when a source file changed after analysis.
- **Actionable export pack** — create organized source copies, per-file Markdown handoff notes with next steps and evidence excerpts, a hash manifest, optional response drafts, and an ICS calendar file for clear ISO dates.
- **Persistent local state** — restore the last source folder, review queue, settings, and export history from the app's local user-data directory.
- **Animated, reduced-motion-aware UI** — a calm night-shift visual style with lightweight transitions and a prefers-reduced-motion fallback.
- **One-click sample vault** — generate clearly synthetic invoice, meeting, expense and email files and send them through the same live local-model pipeline; AI results are never mocked.
- **Format-aware extraction** — read text-based PDFs, DOCX, XLSX, EML, HTML and RTF as well as common text formats.
- **Per-file selection and skip reporting** — choose which files to analyze and see common unsupported extensions after a scan.
- **Evidence mismatch warning** — flag a model-proposed evidence quote that cannot be found in extracted source text.
- **No simulated AI fallback** — if Ollama or the selected model is unavailable, the app reports an error instead of presenting fabricated analysis.

## Supported file types and current limits

SlothShift extracts text from common documents, but does not run OCR or understand image-only files. It caps scanning at **300 supported files** per pass, limits each input file to **10 MB**, and sends at most 20,000 extracted characters per document to the model.

| Format | Supported | Notes |
| --- | :---: | --- |
| TXT, MD, CSV, JSON, LOG | Yes | UTF-8 text recommended |
| PDF | Yes | Text-based PDFs only; scanned/image-only PDF OCR is not included |
| DOCX | Yes | Extracts document text, not layout-perfect formatting |
| XLSX | Yes | Extracts worksheet cell values |
| EML | Yes | Extracts common email headers and body text |
| HTML / HTM | Yes | Removes scripts and markup before analysis |
| RTF | Yes | Best-effort text extraction |
| XLS, DOC, PPTX, JPG, PNG | No | Not supported in this release |

A supported extension is not a guarantee a file is readable: encrypted, malformed, blank, or scanned-only documents may still fail extraction. Unsupported extensions are summarized after scanning.

The default model is **gemma4:e2b**. Other models can be selected when they are installed in the local Ollama instance; compatibility depends on the model's structured-output support.

## Quick start

### Prerequisites

- Windows 10/11 (this is the primary target; other Electron platforms are not guaranteed).
- [Node.js](https://nodejs.org/) and npm.
- [Ollama](https://ollama.com/) installed and running locally.
- Enough free disk space and memory for the chosen local model.

### 1. Clone the repository

~~~powershell
git clone https://github.com/surajns0033-collab/slothshift.git
cd slothshift
~~~

### 2. Install dependencies

~~~powershell
npm install
~~~

### 3. Download the default model

~~~powershell
ollama pull gemma4:e2b
~~~

Model and dependency downloads require internet access. The model remains on your computer after download.

### 4. Launch SlothShift

~~~powershell
npm start
~~~

When the app opens, try **Try a sample vault** for a safe first run or choose a real folder. Select which files to analyze, click **Run Night Shift**, then open each suggestion with **Review**. Approve only results you trust and export to a destination outside the source folder. The sample vault uses the actual installed model, not canned AI output.

## Typical workflow

1. **Choose a folder.** SlothShift scans supported files under that directory. Hidden entries and symbolic links are skipped.
2. **Run Night Shift.** Supported files are passed to the locally installed model one at a time. Processing failures are reported per file.
3. **Review the evidence.** Check the summary and source excerpt, refine the name/category and next steps, and review proposed dates carefully.
4. **Approve or reject.** Only approved, analyzed items are eligible for export.
5. **Export a Lazy Pack.** Choose a destination outside the source folder. SlothShift creates a timestamped pack with organized copies, per-file Markdown handoff notes, a manifest, and optional reminder/draft files.

An export has this general structure:

~~~text
SlothShift-Lazy-Pack-<timestamp>/
├── organized/
│   ├── Work/
│   ├── Finance/
│   ├── Personal/
│   ├── Reference/
│   └── Archive/
├── notes/                      # next steps, evidence excerpts, warnings per file
├── drafts/                     # only when a draft is present
├── reminders.ics               # only when a clear date is present
├── slothshift_manifest.json
└── README.txt
~~~

Exact folders and files depend on the approved results. Existing files in the export destination are not intentionally overwritten. Review the manifest and the exported contents before relying on them for important work.

## How it works

~~~mermaid
flowchart TD
    A[User selects source folder] --> B[Local file scanner]
    B --> C[Supported text files]
    C --> D[Ollama on localhost]
    D --> E[Installed Gemma model]
    E --> F[Structured analysis]
    F --> G[Human review queue]
    G -->|Approve| H[Copy approved originals]
    G -->|Reject or edit| G
    H --> I[Hash verification]
    I --> J[Manifest, drafts and calendar file]
~~~

### Implementation

- **Electron main process** — native folder dialogs, scanning, local Ollama requests, persistent state, path checks, and copy-only export.
- **Preload bridge** — exposes a narrow set of IPC functions to the renderer.
- **Renderer** — the desktop UI, review controls, progress, status, and settings.
- **Safety helpers** — filename sanitization, path containment, hashing, and calendar value formatting.
- **GitHub Actions** — runs automated safety tests and JavaScript syntax checks on pushes and pull requests.

## Privacy and security model

SlothShift is designed to keep ordinary document analysis on the user's device.

- **Local inference:** document content is sent to the local Ollama endpoint, not a hosted LLM API.
- **No telemetry:** the project does not include analytics or telemetry collection.
- **Read-only source workflow:** files are scanned and read, not rearranged in place.
- **User-controlled export:** export is limited to analyzed items that have been approved in the review queue.
- **Path validation:** the main process checks that scanned/exported source paths remain under the selected source directory.
- **Model output is untrusted:** analysis is treated as a suggestion, not executable code or verified truth.

### Important caveats

Local inference is not a guarantee that every output is correct. Models can misread dates, omit context, or produce a misleading summary; inspect the evidence and verify important details yourself. Calendar items are generated only when a date is represented in the expected ISO format.

After installation and model download, the analysis flow can run without a remote AI service. First-time setup, downloading dependencies, obtaining model weights, and updating the application may require internet access.

## Development and quality checks

Run the checks from the repository root:

~~~powershell
npm test
npm run check
~~~

Create a Windows NSIS installer:

~~~powershell
npm run dist:win
~~~

The installer output is written to release/ when packaging succeeds. The repository's CI workflow runs the test suite and syntax checks; it does not validate a live model response on your computer or produce a signed Windows installer.

## Troubleshooting

### SlothShift says Ollama is offline

1. Open Ollama and confirm it is running.
2. In PowerShell, run **ollama list**.
3. If the default model is missing, run **ollama pull gemma4:e2b**.
4. Restart SlothShift and check the connection again.

### The selected model is not installed

The model must appear in **ollama list**. Pull the exact model tag configured in SlothShift, or select another installed local model from Settings.

### A file fails analysis

Check that the format is supported, the file is below the 10 MB limit, and it contains extractable text. Scanned PDFs do not have OCR. Empty, unsupported, or oversized files will not produce valid analysis. If Gemma returns malformed structured output, retry and review any repeated failure.

### A file changed after analysis

Re-scan and re-analyze that file before exporting. SlothShift compares its current content hash with the hash recorded during analysis to avoid exporting a stale review.

## Contributing

Issues and focused pull requests are welcome. For changes to file handling or export behavior, please include tests that cover path traversal, filename collisions, source-file preservation, and failure paths. Keep AI integration local by default and update this README whenever supported formats, limits, or privacy behavior change.

## Hackathon submission

A draft for the Hacktoberfest Open-Source AI Challenge Week 3 is available in [docs/CHALLENGE_SUBMISSION.md](docs/CHALLENGE_SUBMISSION.md). It should be updated with a real demonstration recording and verified results before publication.

## License

SlothShift is released under the [MIT License](LICENSE).

---

<p align="center"><sub>Built slowly on purpose. Private by default. Human approval stays in the loop.</sub></p>
