---
# Copy this file to _projects/<short-slug>.md. The file name becomes the URL: /work/<short-slug>/
# Keep `published: false` until every section below is real. Unpublished files are never built,
# so half-finished drafts can sit in the repo without showing up on the live site.
published: false

title: "One line that names the outcome, not the activity"
summary: "One sentence: who it was for, what changed, and the headline number."
type: genai-build          # genai-build | case-study | teardown  (see _data/project_types.yml)
status: prototype          # shipped | prototype | in-progress | concept
featured: false            # true = shown on the home page (max 4 are shown)
date: 2026-01-01           # used for sorting, newest first
org: "Personal project"    # or the company / client you can name publicly
role: "Solo PM + builder"  # what YOU did, not what the team did
timeline: "Jan 2026 – Feb 2026"
team: "Just me"            # optional
stack: ["Claude API", "Python", "Streamlit"]   # optional
concepts: [prompting, evals]   # keys from _data/genai_concepts.yml; only tag what the write-up actually shows
metrics:
  - { value: "0%", label: "Metric name", context: "How it was measured, sample size, baseline" }
links:
  demo: ""      # delete any you don't have
  repo: ""
  prd: ""
  writeup: ""
---

## Problem
What is broken, for whom, and what evidence tells you it matters (interviews, data, cost of the status quo).

## User
Who the user is, the job they are trying to get done, and how they do it today without your product.

## Why GenAI (and why not)
What part of the problem actually needs a language model, and what you considered instead
(rules, search, a form, a human). If a non-AI baseline was good enough for part of it, say so.

## Approach
The solution and how it works: model choice, prompt/context design, retrieval, tools, human review.
A simple diagram or screenshot goes a long way here (put images in `assets/`).

## Tradeoffs

| Decision | Options considered | What I chose | Why |
|---|---|---|---|
| Model | e.g. large vs small model | | quality vs cost vs latency |
| Grounding | e.g. RAG vs long context vs fine-tune | | |
| Autonomy | e.g. auto-act vs suggest-and-confirm | | |

## Evaluation
How you knew it was good enough to ship: the test set, the rubric, who or what graded it
(human review, LLM-as-judge, user testing), and the results, including where it failed.

## Metrics
Product metrics (adoption, task success, time saved), quality metrics, and cost or latency per request.
Give the baseline and the sample size for every number.

## Risks & guardrails
Failure modes (hallucination, prompt injection, privacy, bias, misuse) and what you did about each.

## What I'd do next
What you learned, what you'd change, and what you'd build if you had another month.
