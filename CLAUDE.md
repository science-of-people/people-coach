# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Repository:** https://github.com/science-of-people/people-coach

## Project Overview

**People Coach** - Landing page for the Science of People Coach Certification Program. A simple static marketing site built with Vite.

**Domain**: coach.scienceofpeople.com

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Build to dist/
npm run preview  # Preview production build
```

## Architecture

Vanilla HTML/CSS/JS with Vite for bundling.

```
people-coach/
├── index.html       # Main landing page
├── terms.html       # Terms and conditions
├── style.css        # All styles
├── main.js          # Entry point for Vite
├── src/
│   ├── main.js      # JavaScript functionality
│   └── counter.js   # Example module
├── public/          # Static assets (images, favicon)
└── dist/            # Production build output
```

## Key Details

### Purpose
Marketing landing page for the People Coach Certification cohort (2026). Includes:
- Video sales letter (Vimeo embed)
- Program overview and curriculum
- Application CTAs (Google Form)
- Booking calls (Google Calendar)

### External Links
- **Application**: Google Forms
- **Booking**: Google Calendar
- **Videos**: Vimeo embeds

### Deployment
Static site deployed via Cloudflare (wrangler.toml present).

## Styling

Custom CSS in `style.css` - no framework. Key classes:
- `.hero` - Hero section
- `.section` / `.section-dark` - Content sections
- `.btn`, `.btn-gold`, `.btn-outline-gold` - Button styles
- `.container` - Max-width content wrapper

## Development Notes

- No JavaScript framework (vanilla JS)
- Responsive design with CSS media queries
- Navigation with dark/light logo variants
- Vimeo player API for video embeds
