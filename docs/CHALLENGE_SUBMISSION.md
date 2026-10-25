---
title: "SlothShift: Your Offline AI Night Worker"
published: false
tags: devchallenge, hf26challenge
---

*This is a submission for the Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady.*

## What I Built

SlothShift turns neglected text documents into reviewable work. Choose a folder, run a locally installed Gemma model through Ollama, inspect summaries and suggested next steps, approve or reject the actions, and export safe copies with an evidence manifest and calendar reminders for clear dates.

## Demo

Record a real run with a local Ollama model: scan a folder, analyze a file, review and edit its suggestion, approve it, and export a Lazy Pack. Do not claim results that were not tested.

## Code

https://github.com/surajns0033-collab/slothshift

## How I Built It

A secured Electron desktop app uses native folder selection, a limited preload API, safe path checks, local file parsing and local Ollama inference. Review history persists on-device. Export copies approved source bytes into a separate destination and verifies hashes.

## Why Does Open Innovation Matter?

The model runs on the user's own computer rather than a hosted AI endpoint. That keeps document content away from a third-party inference service, avoids per-request hosted inference fees, lets users switch locally installed models, and supports offline work after setup and model download.

## My Agent Session

Add a DevRelay session after recording a real build session.

## The Lazy Payoff

Measure time saved with a real folder before making claims. The application uses an adjustable estimate of manual work per file and labels it as an estimate, not a user study.

## Prize Categories

Target: Best Use of Gemma after confirming a successful real Gemma inference run.
