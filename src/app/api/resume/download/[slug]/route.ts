// =============================================================================
// CareerForge — Resume PDF Download API
// Generates a clean PDF from resume data using HTML-to-PDF approach
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PersonalInfo, Experience, Education, SkillCategory } from "@/types";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const resume = await prisma.resume.findUnique({
      where: { publicSlug: slug },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const info = resume.personalInfo as unknown as PersonalInfo;
    const experience = resume.experience as unknown as Experience[];
    const education = resume.education as unknown as Education[];
    const skills = resume.skills as unknown as SkillCategory[];

    // Generate clean HTML for PDF
    const html = generateResumeHTML(info, resume.summary, experience, education, skills);

    // Return HTML that can be printed to PDF via browser's print dialog
    // For server-side PDF generation, you'd use puppeteer-core or @react-pdf/renderer
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="${info.name || "resume"}.html"`,
      },
    });
  } catch (error) {
    console.error("PDF download error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

function generateResumeHTML(
  info: PersonalInfo,
  summary: string | null,
  experience: Experience[],
  education: Education[],
  skills: SkillCategory[]
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${info.name} — Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #1a1a2e; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 40px; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
      @page { margin: 0.5in; }
    }
    .print-btn { position: fixed; top: 20px; right: 20px; background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 14px; }
    .print-btn:hover { background: #4f46e5; }
    h1 { font-size: 28px; font-weight: 700; color: #0f172a; }
    .contact { font-size: 13px; color: #64748b; margin-top: 6px; }
    .contact a { color: #6366f1; text-decoration: none; }
    .section { margin-top: 24px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
    .summary { font-size: 14px; color: #475569; }
    .exp-item { margin-bottom: 16px; }
    .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
    .exp-title { font-size: 15px; font-weight: 600; color: #0f172a; }
    .exp-dates { font-size: 12px; color: #94a3b8; }
    .exp-company { font-size: 13px; color: #475569; font-weight: 500; }
    .bullets { margin-top: 4px; padding-left: 16px; }
    .bullets li { font-size: 13px; color: #475569; margin-bottom: 2px; }
    .edu-item { margin-bottom: 8px; }
    .edu-degree { font-size: 14px; font-weight: 600; color: #0f172a; }
    .edu-school { font-size: 13px; color: #475569; }
    .skill-row { font-size: 13px; margin-bottom: 4px; }
    .skill-cat { font-weight: 600; color: #0f172a; }
    .skill-items { color: #475569; }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">⬇ Print / Save as PDF</button>

  <h1>${info.name}</h1>
  <div class="contact">
    ${[info.email, info.phone, info.location].filter(Boolean).join(" • ")}
    ${info.linkedin ? ` • <a href="${info.linkedin}">LinkedIn</a>` : ""}
    ${info.github ? ` • <a href="${info.github}">GitHub</a>` : ""}
    ${info.website ? ` • <a href="${info.website}">Portfolio</a>` : ""}
  </div>

  ${summary ? `<div class="section"><h2 class="section-title">Professional Summary</h2><p class="summary">${summary}</p></div>` : ""}

  ${experience.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${experience.map(exp => `
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">${exp.title}</span>
        <span class="exp-dates">${exp.startDate} — ${exp.current ? "Present" : exp.endDate || ""}</span>
      </div>
      <div class="exp-company">${exp.company}${exp.location ? ` • ${exp.location}` : ""}</div>
      ${exp.bullets.filter(Boolean).length > 0 ? `<ul class="bullets">${exp.bullets.filter(Boolean).map(b => `<li>${b}</li>`).join("")}</ul>` : ""}
    </div>`).join("")}
  </div>` : ""}

  ${education.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${education.map(edu => `
    <div class="edu-item">
      <div class="edu-degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</div>
      <div class="edu-school">${edu.school}${edu.gpa ? ` • GPA: ${edu.gpa}` : ""}</div>
    </div>`).join("")}
  </div>` : ""}

  ${skills.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    ${skills.map(cat => `<div class="skill-row"><span class="skill-cat">${cat.category}:</span> <span class="skill-items">${cat.items.join(", ")}</span></div>`).join("")}
  </div>` : ""}
</body>
</html>`;
}
