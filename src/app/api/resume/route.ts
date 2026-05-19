// =============================================================================
// CareerForge — Resume CRUD API
// Create, read, update, list resumes
// =============================================================================

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

// GET /api/resume — List all resumes for the current user
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("List resumes error:", error);
    return NextResponse.json({ error: "Failed to list resumes" }, { status: 500 });
  }
}

// POST /api/resume — Create a new resume from form data
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const slug = generateSlug(body.personalInfo?.name || "resume");

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: body.title || "My Resume",
        personalInfo: body.personalInfo || {},
        summary: body.summary || "",
        experience: body.experience || [],
        education: body.education || [],
        skills: body.skills || [],
        certifications: body.certifications || [],
        projects: body.projects || [],
        template: body.template || "modern",
        region: body.region || "US",
        publicSlug: slug,
        isPublic: true,
      },
    });

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error("Create resume error:", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}

// PUT /api/resume — Update an existing resume
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const resume = await prisma.resume.update({
      where: { id },
      data: {
        title: data.title,
        personalInfo: data.personalInfo,
        summary: data.summary,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
        certifications: data.certifications,
        projects: data.projects,
        template: data.template,
        region: data.region,
        isPublic: data.isPublic,
      },
    });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Update resume error:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
