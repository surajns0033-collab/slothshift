---
title: "SlothShift: Your Offline AI Night Worker"
published: false
tags: devchallenge, hf26challenge
---

*This is a submission for the Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady.*

## What I Built

SlothShift is a local AI night worker for the small admin tasks that quietly accumulate: identifying a document, figuring out what matters, giving it a sensible name, spotting a stated deadline, and deciding what to do next.

Choose a folder, run your installed Gemma model through Ollama, inspect every result, edit the proposed filename/category/next steps, and approve only what you trust. SlothShift exports copies plus per-document Markdown handoff notes, a source-integrity manifest, optional response drafts, and calendar reminders for explicit dates.

The first-run sample vault creates clearly synthetic invoice, meeting, expense and email files. They go through the same live-model pipeline as real files; there are no prewritten model results pretending to be AI.

## Demo

**Before publishing:** attach a real 60–90 second screen recording or demo URL. Show the sample vault, a successful local Gemma analysis, one reviewed/approved item, and the exported notes plus manifest. Do not claim a run has succeeded until you have recorded it on the actual machine.

## Code

https://github.com/surajns0033-collab/slothshift

## How I Built It

The Electron desktop app uses a narrow preload bridge, native folder dialogs, local parsing for TXT/MD/CSV/JSON/LOG, text-based PDF, DOCX, XLSX, EML, HTML and RTF extraction, and Ollama's localhost API for structured Gemma output. The review queue makes AI suggestions explicit. Export copies the original bytes, verifies SHA-256, and records suggestions in Markdown handoff notes and a JSON manifest.

The scanner skips hidden entries and symbolic links, caps a run at 300 supported files and 10 MB per input, and limits model context to 20,000 extracted characters per file. Unsupported formats and image-only PDF OCR are called out instead of silently treated as understood.

## Why Does Open Innovation Matter?

The model runs on the user's computer rather than a hosted inference API. After model/dependency setup, document content can be processed locally, without a per-call hosted inference bill or the need to upload private files to an AI service. Because the runtime is local, people can choose among installed compatible models and inspect the code handling their files. The trade-off is transparent: inference depends on local hardware, and downloading model weights takes disk space and internet access.

## The Human-in-the-Loop Promise

SlothShift does not rename, move, or delete source files. A model suggestion is not a completed action: users inspect the summary and evidence excerpt, edit the result, then approve or reject it. The app warns when a proposed evidence quote cannot be found in extracted source text. Important deadlines and financial decisions still need human verification.

## The Lazy Payoff

The goal is to reduce repeated low-value decisions around digital clutter. The dashboard only counts estimated minutes for approved items, using a user-adjustable assumption rather than claiming a measured user study. Add a real time-saved result only after timing a real folder and recording the number of approved files.

## Prize Categories

**Best Use of Gemma** — enter this category only after recording and verifying a successful real local Gemma inference run.
