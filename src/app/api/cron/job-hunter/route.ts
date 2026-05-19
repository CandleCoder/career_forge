// =============================================================================
// CareerForge — Cron Job Hunter (Module B)
// Automated endpoint to run job scraping and matching periodically
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchJobs } from "@/services/job-scraper";
import { matchJobWithResume } from "@/services/job-matcher";
import { generateColdEmail } from "@/services/email-generator";

export async function GET(req: Request) {
  // Validate Cron Secret to prevent unauthorized triggers
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch users who have automation enabled
    const users = await prisma.user.findMany({
      include: { resumes: { take: 1, orderBy: { updatedAt: "desc" } } },
    });

    let processedCount = 0;

    for (const user of users) {
      if (!user.resumes.length) continue; // Skip if no resume
      const resume = user.resumes[0];

      // We would normally fetch the user's preferred search query from their settings
      const query = "Software Engineer";
      const location = "Remote";

      // 2. Scrape Jobs
      const jobs = await searchJobs(query, location);

      // 3. Match and save high-scoring jobs
      for (const job of jobs.slice(0, 5)) {
        // Process top 5 for demo
        const match = await matchJobWithResume(
          `${job.title} at ${job.company}\n\n${job.description}`,
          JSON.stringify(resume),
        );

        if (match.score >= 80) {
          // Generate draft email
          const emailDraft = await generateColdEmail(
            job,
            JSON.stringify(resume),
            user.name || "Candidate",
          );

          // Save to DB
          await prisma.emailOutreach.create({
            data: {
              userId: user.id,
              recipientEmail: "recruiter@example.com",
              company: job.company,
              subject: emailDraft.subject,
              body: emailDraft.body,
              status: "draft",
            },
          });
        }
      }
      processedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processedCount} users`,
    });
  } catch (error) {
    console.error("Cron Job Hunter Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
