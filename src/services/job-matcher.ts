// =============================================================================
// CareerForge — Job Matcher Service (Module B)
// Compares job descriptions with resumes using AI to calculate a match score
// =============================================================================

import { generateAICompletion } from "@/lib/ai";

export interface MatchResult {
  score: number;
  strengths: string[];
  missingSkills: string[];
  recommendation: "Strong Match" | "Good Match" | "Weak Match";
  analysis: string;
}

export async function matchJobWithResume(jobDescription: string, resumeContent: string): Promise<MatchResult> {
  const prompt = `
You are an expert technical recruiter and AI job matcher.
Compare the following Job Description to the candidate's Resume.
Score the match out of 100 based on skills, experience, and requirements.
Provide a brief analysis of strengths and missing skills.
Return ONLY valid JSON in the exact format:
{
  "score": number (0-100),
  "strengths": ["skill 1", "skill 2"],
  "missingSkills": ["skill 1"],
  "recommendation": "Strong Match" | "Good Match" | "Weak Match",
  "analysis": "A brief 2-sentence summary of why this score was given."
}

Job Description:
${jobDescription}

Resume:
${resumeContent}
`;

  try {
    const response = await generateAICompletion(prompt, "", { response_format: { type: "json_object" } });
    return JSON.parse(response) as MatchResult;
  } catch (error) {
    console.error("Job Matcher Error:", error);
    return {
      score: 0,
      strengths: [],
      missingSkills: [],
      recommendation: "Weak Match",
      analysis: "Failed to analyze match."
    };
  }
}
