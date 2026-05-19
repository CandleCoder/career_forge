// =============================================================================
// CareerForge — Resume Upload API
// Handles PDF/DOCX upload, parsing, and AI-structured extraction
// =============================================================================

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  extractTextFromPDF,
  extractTextFromDOCX,
  parseResumeWithAI,
} from "@/services/resume-parser";
import { generateSlug } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text based on file type
    let rawText: string;
    if (file.type === "application/pdf") {
      rawText = await extractTextFromPDF(buffer);
    } else {
      rawText = await extractTextFromDOCX(buffer);
    }

    if (!rawText || rawText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract sufficient text from the file" },
        { status: 400 }
      );
    }

    // Parse with AI
    const resumeData = await parseResumeWithAI(rawText);

    // Save to database
    const slug = generateSlug(resumeData.personalInfo.name || "resume");
    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: `${resumeData.personalInfo.name}'s Resume`,
        personalInfo: resumeData.personalInfo as object,
        summary: resumeData.summary || "",
        experience: resumeData.experience as object[],
        education: resumeData.education as object[],
        skills: resumeData.skills as object[],
        certifications: (resumeData.certifications || []) as object[],
        projects: (resumeData.projects || []) as object[],
        publicSlug: slug,
        isPublic: true,
      },
    });

    return NextResponse.json({ resume, parsed: resumeData }, { status: 201 });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
