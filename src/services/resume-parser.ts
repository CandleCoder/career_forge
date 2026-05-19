// =============================================================================
// CareerForge — Resume Parser Service
// Parses PDF/DOCX files and extracts structured resume data via AI
// =============================================================================

import { generateAIJson } from "@/lib/ai";
import type { ResumeData } from "@/types";

/**
 * Parse raw text content from a resume and extract structured data using AI
 */
export async function parseResumeWithAI(rawText: string): Promise<ResumeData> {
  const systemPrompt = `You are an expert resume parser. Given raw text from a resume/CV document,
extract and return structured data in the following JSON format:

{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+1-234-567-8900",
    "location": "City, State, Country",
    "website": "https://website.com",
    "linkedin": "https://linkedin.com/in/profile",
    "github": "https://github.com/username"
  },
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "location": "City, State",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or null if current",
      "current": false,
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "3.8/4.0",
      "honors": "Magna Cum Laude"
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "items": ["Python", "JavaScript", "TypeScript"]
    }
  ],
  "certifications": [
    {
      "name": "AWS Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2024-01",
      "url": "https://..."
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "url": "https://...",
      "technologies": ["React", "Node.js"]
    }
  ]
}

Rules:
- Extract ALL available information from the text
- If a field is not found, use null or empty string/array as appropriate
- Dates should be in YYYY-MM format
- Group skills into logical categories
- Make bullet points concise and action-oriented
- Preserve original content accurately — do NOT fabricate information`;

  return generateAIJson<ResumeData>(systemPrompt, rawText, {
    temperature: 0.2,
  });
}

/**
 * Extract text from a PDF buffer using pdf-parse
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to avoid issues with SSR
  const pdfParseModule = await import("pdf-parse");
  // @ts-expect-error - pdf-parse exports are inconsistent
  const pdfParse = pdfParseModule.default || pdfParseModule;
  const data = await pdfParse(buffer);
  return data.text;
}

/**
 * Extract text from a DOCX buffer using mammoth
 */
export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/**
 * Enhance resume content using AI — improve bullets, add action verbs, quantify achievements
 */
export async function enhanceResumeContent(resumeData: ResumeData): Promise<ResumeData> {
  const systemPrompt = `You are a professional resume writer and career coach. Given structured resume data,
enhance the content to be more impactful and ATS-friendly.

Rules:
1. Start each bullet point with a strong action verb
2. Quantify achievements wherever possible (numbers, percentages, dollar amounts)
3. Remove filler words and make content concise
4. Optimize for ATS keyword matching
5. Keep the summary to 2-3 impactful sentences
6. DO NOT fabricate any information — only enhance what exists
7. Return the SAME JSON structure with enhanced content`;

  return generateAIJson<ResumeData>(
    systemPrompt,
    JSON.stringify(resumeData),
    { temperature: 0.5 }
  );
}
