// =============================================================================
// CareerForge — LinkedIn Optimizer Service (Module D)
// Uses AI to generate optimized LinkedIn headlines, about sections, and skills
// =============================================================================

import { generateAICompletion } from "@/lib/ai";

export interface LinkedInOptimizationResult {
  headlines: string[];
  aboutSection: string;
  recommendedSkills: string[];
}

export async function optimizeLinkedInProfile(resumeContent: string, targetRole: string): Promise<LinkedInOptimizationResult> {
  const prompt = `
You are an expert LinkedIn Profile Optimizer and Executive Career Coach.
Based on the provided resume and target role, generate:
1. 3 highly optimized, SEO-friendly LinkedIn headlines (under 120 characters each).
2. A compelling, narrative-driven 'About' section (summary) written in the first person (under 2000 characters).
3. 10 recommended skills to pin on the LinkedIn profile.

Return ONLY valid JSON in the exact format:
{
  "headlines": ["Headline 1", "Headline 2", "Headline 3"],
  "aboutSection": "The compelling summary...",
  "recommendedSkills": ["Skill 1", "Skill 2"]
}

Target Role: ${targetRole}

Resume Content:
${resumeContent}
`;

  try {
    const response = await generateAICompletion(prompt, "", { response_format: { type: "json_object" } });
    return JSON.parse(response) as LinkedInOptimizationResult;
  } catch (error) {
    console.error("LinkedIn Optimizer Error:", error);
    return {
      headlines: ["Experienced Professional"],
      aboutSection: "An experienced professional with a track record of success.",
      recommendedSkills: ["Leadership", "Communication", "Project Management"]
    };
  }
}
