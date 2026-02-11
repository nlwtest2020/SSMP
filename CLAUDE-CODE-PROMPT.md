# Claude Code Handoff: Interactive Learning Course

## Overview
I'm building a self-paced interactive learning course as a static web app. I have a working HTML prototype and two quiz content configs. I need you to turn this into a deployable app.

## Files Included
- `course-prototype.html` — Working single-page HTML prototype with the design system (solid blue background, cream rounded frame, progress bar, quiz UI patterns)
- `quiz1-config.json` — 7 categorization questions (Safer / Stronger / More Prosperous) with tailored feedback for each wrong answer
- `quiz2-slider-config.json` — 6 slider questions rating message framing (0-100 scale) with tier-based feedback (non-framed 0-20, mid 20-70, framed 70-100)

## What to Build

### 1. JSON-driven content system
All content should be driven by a single config (or the two JSON files merged). The app should render everything — videos, quizzes, feedback — from config so I never touch HTML/JS to update content.

### 2. Course flow
Video 1 (YouTube embed) → Quiz 1 (7 categorization questions, one at a time) → Video 2 (YouTube embed) → Quiz 2 (6 slider questions, one at a time) → Video 3 (YouTube embed) → Completion screen

### 3. Quiz 1: Categorization (Safer / Stronger / More Prosperous)
- Show one question at a time
- Three answer buttons: Safer, Stronger, More Prosperous
- On submit, show tailored feedback based on which specific answer was picked (correct or each wrong answer has its own response)
- "Next" button to advance to next question
- Use the content from `quiz1-config.json`

### 4. Quiz 2: Framing Slider
- Show one statement at a time
- Slider from 0 (Non-Framed) to 100 (Framed)
- On submit, determine which tier the user's answer falls in: non-framed (0-20), mid (20-70), framed (70-100)
- Show the feedback for that tier — feedback explains what words nudged the statement up or down, no explicit benchmark numbers shown
- Use the content from `quiz2-slider-config.json`

### 5. YouTube video embeds
- I'll provide 3 YouTube video IDs to drop in. For now use placeholder boxes.
- Embed as iframes in the existing video container design

### 6. Design — keep exactly as-is
- Solid blue background (#1a5276)
- Cream rounded frame (#f5f0e8)
- Inter font
- Current progress bar, button styles, feedback styling
- Mobile responsive

### 7. Deploy on Vercel
- Set up as a static site, push to GitHub, deploy via Vercel
- No backend, no API calls — all feedback is pre-written in the configs

## No API Calls
All quiz feedback is pre-baked in the JSON configs. No Anthropic API, no backend, no database. Fully static.
