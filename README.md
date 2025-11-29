# Magnet Mind Quiz Funnel

A Next.js-based quiz funnel application that guides users through a personalized assessment and redirects to a ClickBank affiliate page.

## Features

- **Landing Page**: Gender selection and program introduction
- **9 Quiz Questions**: Interactive questions with single and multiple choice options
- **Progress Tracking**: Visual progress bar and question counter
- **Results Calculation**: Animated progress circle during calculation
- **Results Page**: Personalized results summary
- **ClickBank Integration**: Redirect to affiliate page

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file:
```
NEXT_PUBLIC_CLICKBANK_URL=https://your-clickbank-affiliate-link.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your Google Analytics 4 Measurement ID (found in your GA4 property settings).

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /quiz
    /[id]          # Dynamic quiz question pages (/quiz/1, /quiz/2, etc.)
    /calculating   # Results calculation page with animated progress
    /results       # Results display page
  page.tsx         # Landing page
  layout.tsx       # Root layout
  globals.css      # Global styles
```

## Quiz Flow

1. Landing page (`/`) - User selects gender and starts quiz
2. Quiz questions (`/quiz/1` through `/quiz/9`) - 9 questions total
3. Calculating (`/quiz/calculating`) - Animated progress circle
4. Results (`/quiz/results`) - Display personalized results
5. ClickBank redirect - User clicks CTA to go to affiliate page

## Customization

- Update quiz questions in `/app/quiz/[id]/page.tsx` (QUIZ_QUESTIONS array)
- Modify ClickBank URL in `/app/quiz/results/page.tsx` or via environment variable
- Customize styling in `tailwind.config.js` and component files

## Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

