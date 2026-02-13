# Task Generator - AI Powered Planning Tool

## Overview
Task Generator is a web application that helps product managers and developers quickly generate user stories and engineering tasks from a simple feature idea. It leverages Google Gemini AI to transform high-level goals into actionable plans.

## Features
- **AI Generation**: Input a goal and target users to get a structured plan.
- **Interactive Results**: Edit, reorder, and export generated tasks.
- **History**: View past generated specifications.
- **System Status**: Real-time health checks for backend, database, and LLM.
- **Aesthetic UI**: Modern glassmorphism design with smooth animations.

## How to Run
1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   MONGODB_URI=...
   GEMINI_API_KEY=...
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: MongoDB (Mongoose)
- **AI**: Google Gemini Pro (via `@google/generative-ai`)
- **Icons**: Lucide React

## What is Done
- [x] Full AI generation flow
- [x] MongoDB integration for history
- [x] Aesthetic UI with animations
- [x] Status monitoring page
- [x] Markdown export functionality

## Deployment
This project is ready for deployment on Vercel. Connect your GitHub repository and add the environment variables in the Vercel dashboard.

## Structure
The project uses the `src/` directory structure. Key directories:
- `src/app`: Page routes and API endpoints.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities and database connection.
- `src/models`: Mongoose schemas.

## Troubleshooting
If you encounter `module not found` errors during build:
1. Ensure you have installed dependencies: `npm install`
2. Clear Next.js cache: Delete the `.next` folder.
3. Verify `tsconfig.json` paths mapping (`@/*` -> `./src/*`).
