# Interactive Learning Course

A self-paced interactive learning course built as a static web application. Features video content, categorization quizzes, and slider-based framing exercises.

## Features

- **JSON-Driven Content**: All course content is managed through `course-config.json`
- **Two Quiz Types**:
  - Categorization Quiz: Multiple choice questions with tailored feedback
  - Slider Quiz: Rating questions with tier-based feedback
- **Progress Tracking**: Visual progress bar and score calculation
- **Responsive Design**: Mobile-friendly interface with clean UI
- **Static Deployment**: No backend required, fully static site

## Course Flow

1. Video 1: Introduction
2. Quiz 1: Categorization (7 questions)
3. Video 2: Deep Dive
4. Quiz 2: Slider Ratings (6 questions)
5. Video 3: Summary
6. Completion Screen with Score

## Design System

- **Colors**:
  - Blue: #1a5276 (background)
  - Cream: #f5f0e8 (main frame)
  - Green: #27864a (correct answers)
  - Red: #c0392b (incorrect answers)
  - Gold: #d4a017 (active state)
- **Font**: Inter
- **Layout**: Centered card with rounded corners and shadow

## Files

- `index.html` - Main HTML structure with design system
- `app.js` - Course logic and quiz functionality
- `course-config.json` - All course content and quiz data
- `vercel.json` - Vercel deployment configuration

## Deployment

This app is designed to be deployed on Vercel as a static site.

### Deploy to Vercel

1. Push this repository to GitHub
2. Import the repository in Vercel
3. Deploy (no build configuration needed)

## Local Development

To run locally, use any static file server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Updating Content

All content updates can be made by editing `course-config.json`. No code changes required for:

- Quiz questions and answers
- Feedback messages
- Video information
- Section titles and descriptions

## License

Proprietary
