# 🚀 CareerForge

**CareerForge** is a fully automated, AI-powered Job Hunting & Career Management Micro-SaaS built on Next.js 16. It handles resume generation, job scraping, AI matching, cold email drafting, and LinkedIn optimization.

## 🌟 Core Modules

1. **Intelligent Resume Engine**: Upload PDF/DOCX or build manually. Generates a hosted, shareable, SEO-friendly web resume with PDF export.
2. **Autonomous AI Job Hunter**: Scrapes jobs from multiple sources and uses AI to score them against your resume.
3. **Automated Outreach**: Generates tailored cold emails focusing on your unique value proposition and sends them via SMTP.
4. **Career Analytics**: Dashboard to track pipeline, match scores, and activity.
5. **LinkedIn Optimizer**: AI service to generate SEO-friendly headlines, summaries, and skills.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Prisma ORM + Neon PostgreSQL
- **Auth**: NextAuth.js v5 (JWT & Credentials)
- **Styling**: Tailwind CSS v4, Framer Motion, Shadcn UI
- **AI**: OpenAI API
- **Email**: Nodemailer

## 🚀 Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```
*Note: You will need an OpenAI API key and a PostgreSQL connection string (e.g., from Neon.tech).*

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## ☁️ Deployment

This project is built to be deployed on Vercel.
1. Connect your GitHub repository to Vercel.
2. Add the environment variables from `.env.local`.
3. Set the build command to `npx prisma generate && next build`.
4. To enable the automated job hunter, set up a cron job on Vercel (or an external service like Cron-job.org) pointing to `/api/cron/job-hunter` with the `Authorization: Bearer CRON_SECRET` header.

## 📄 License
MIT License
