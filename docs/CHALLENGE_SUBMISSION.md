---
title: "I Gave My Forgotten Files a Night Shift—Without Uploading Them"
published: false
tags: devchallenge, hf26challenge
---

*This is a submission draft for the Hacktoberfest Open-Source AI Challenge: Week 3 — **Slow and Steady**.*

## What I Built

The most annoying files aren't necessarily complicated. They're the invoice with a date buried near the bottom, the meeting notes that contain two follow-ups, and the email you keep reopening because you can't remember what needs to happen next.

Each task takes a minute or two. The pile grows because every file asks for one more decision.

**SlothShift gives that pile a night shift.** Point it at a folder and a locally running Gemma model reads the supported documents, drafts a short summary, suggests a sensible filename and category, surfaces possible dates, and proposes next steps. You inspect the evidence, edit what you want, and approve or reject the result. Only approved items can be exported.

The export is designed to be useful the next morning, not just impressive in a chat window: it contains organized copies of approved originals, per-file Markdown handoff notes, a JSON manifest with source hashes and warnings, optional response drafts, and calendar reminders when the model identifies an explicit ISO-formatted date.

The app also has a synthetic sample vault—an invoice, meeting follow-up, expense register, and email—so a first-time user can try the workflow without handing over personal files. Those files still go through the real local model; the app doesn't substitute canned AI responses.

## Demo

**Before publishing this post, replace this line with a public link to your real 60–90 second screen recording.** The recording should show Ollama running the selected Gemma model, the sample vault being processed, one review/approval, and the downloaded export opened to reveal its notes and manifest. Don't use a mock-up or claim a successful model run until you have recorded it on your machine.

## Code

[SlothShift on GitHub](https://github.com/surajns0033-collab/slothshift)

## How I Built It

SlothShift has two local ways to try it:

- **Browser preview:** Vite serves the interface on 127.0.0.1; its development proxy forwards /ollama/* to the Ollama service on the same machine. The browser mode supports common text files, HTML, RTF, and EML, then downloads the reviewed pack as a ZIP.
- **Desktop app:** Electron provides native folder dialogs, persistent local review state, and the wider file-extraction path for text-based PDF, DOCX, and XLSX alongside the common text/email formats.

Both modes send analysis requests to the local Ollama API, not a hosted LLM endpoint. The model returns structured JSON for the review queue. SlothShift treats the document as untrusted input, checks whether the proposed evidence excerpt occurs in extracted text, validates export names and paths, copies rather than moves the source files, and checks SHA-256 hashes before export.

The limits are deliberate: a scan is capped at 300 supported files, each input is capped at 10 MB, and up to 20,000 extracted characters per file are sent to the model. Scanned PDF OCR and image understanding are not included. The app calls out unsupported or unreadable files instead of pretending it understood them.

## Why Does Open Innovation Matter?

These files can contain personal details, invoices, internal meeting notes, or work correspondence. For this kind of utility, sending the pile to a cloud AI service just to sort the first pass feels like the wrong trade-off.

Running an open-weight model locally lets people keep document content on their own machine after setup and model download. It avoids a hosted inference bill for every run, makes model choice replaceable, and lets contributors inspect how files are read and how suggestions get turned into exported artifacts. Open innovation here isn't an abstract preference: it changes who controls the data, the running cost, and the ability to adapt the tool.

Local doesn't mean infallible. A model can miss a date or produce a plausible but wrong summary. SlothShift keeps the human in charge: suggestions are reviewable, approval is explicit, and source files are not rearranged in place.

## My Agent Session

Optional: add a DevRelay session link here if you recorded one. Don't add a placeholder or claim a session that doesn't exist.

## The Lazy Payoff

The aim is to turn a folder of deferred decisions into one queue you can review in a sitting. The dashboard's “minutes back” value is explicitly an estimate based on a user-adjustable assumption—not a measured user study. I won't invent a time-saving percentage. For a meaningful result, record the number of files processed, the number approved, the time spent reviewing, and the manual baseline for the same small folder, then add those observed figures here.

## Prize Categories

**Best Use of Gemma** — keep this category only after verifying and recording a successful real run with Gemma. The model is integrated through the local Ollama runtime; the demo should prove that the selected model really generated the suggestions.
