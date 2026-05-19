// =============================================================================
// CareerForge — Email Generator Service (Module B)
// AI-powered personalized cold email generator
// =============================================================================

import { generateAICompletion } from "@/lib/ai";

export interface EmailGenerationResult {
  subject: string;
  body: string;
}

export async function generateColdEmail(
  jobDetails: { title: string; company: string; description: string },
  resumeDetails: string,
  senderName: string
): Promise<EmailGenerationResult> {
  const prompt = `
You are an expert career coach and copywriter.
Write a concise, compelling cold outreach email to a recruiter or hiring manager for the following job, based on the candidate's resume.
Keep it under 150 words. Focus on the unique value the candidate brings based on their past experience.
Do not use placeholders like [Insert Date], make reasonable assumptions or leave them out. Do not include signature placeholders if the senderName is provided.

Job Details:
Title: ${jobDetails.title}
Company: ${jobDetails.company}
Description: ${jobDetails.description.substring(0, 1000)} // Truncated for token limits

Candidate Resume Details:
${resumeDetails.substring(0, 2000)}

Sender Name:
${senderName}

Return ONLY valid JSON in the exact format:
{
  "subject": "Compelling subject line",
  "body": "The email body text (use plain text with \\n for newlines)"
}
`;

  try {
    const response = await generateAICompletion(prompt, "", { response_format: { type: "json_object" } });
    return JSON.parse(response) as EmailGenerationResult;
  } catch (error) {
    console.error("Email Generator Error:", error);
    return {
      subject: `Application for ${jobDetails.title} at ${jobDetails.company}`,
      body: `Hi,\n\nI am writing to express my interest in the ${jobDetails.title} position at ${jobDetails.company}.\n\nPlease find my resume attached.\n\nBest regards,\n${senderName}`
    };
  }
}
