// =============================================================================
// CareerForge — Public Hosted Resume Page (/r/[slug])
// Beautiful, shareable resume page accessible without authentication
// =============================================================================

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PersonalInfo, Experience, Education, SkillCategory, Project, Certification } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resume = await prisma.resume.findUnique({ where: { publicSlug: slug } });
  if (!resume) return { title: "Resume Not Found" };

  const info = resume.personalInfo as unknown as PersonalInfo;
  return {
    title: `${info.name} — Resume`,
    description: resume.summary || `Professional resume of ${info.name}`,
    openGraph: {
      title: `${info.name} — Resume`,
      description: resume.summary || `Professional resume of ${info.name}`,
      type: "profile",
    },
  };
}

export default async function PublicResumePage({ params }: PageProps) {
  const { slug } = await params;
  const resume = await prisma.resume.findUnique({
    where: { publicSlug: slug, isPublic: true },
  });

  if (!resume) notFound();

  const info = resume.personalInfo as unknown as PersonalInfo;
  const experience = resume.experience as unknown as Experience[];
  const education = resume.education as unknown as Education[];
  const skills = resume.skills as unknown as SkillCategory[];
  const certifications = resume.certifications as unknown as Certification[] | null;
  const projects = resume.projects as unknown as Project[] | null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500" />

      <div className="max-w-[800px] mx-auto py-12 px-6">
        {/* Download button */}
        <div className="flex justify-end mb-4">
          <a
            href={`/api/resume/download/${slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>

        {/* Resume Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-10 py-10">
            <h1 className="text-3xl font-bold tracking-tight">{info.name}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-300">
              {info.email && (
                <a href={`mailto:${info.email}`} className="hover:text-white transition-colors">
                  {info.email}
                </a>
              )}
              {info.phone && <span>{info.phone}</span>}
              {info.location && <span>{info.location}</span>}
            </div>
            <div className="flex flex-wrap gap-x-4 mt-2 text-sm">
              {info.linkedin && (
                <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">
                  LinkedIn ↗
                </a>
              )}
              {info.github && (
                <a href={info.github} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">
                  GitHub ↗
                </a>
              )}
              {info.website && (
                <a href={info.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">
                  Portfolio ↗
                </a>
              )}
            </div>
          </div>

          <div className="px-10 py-8 space-y-8">
            {/* Summary */}
            {resume.summary && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Professional Summary
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">{resume.summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-semibold text-slate-900">{exp.title}</h3>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                          {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{exp.company}{exp.location ? ` • ${exp.location}` : ""}</p>
                      {exp.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.bullets.filter(Boolean).map((bullet, j) => (
                            <li key={j} className="text-sm text-slate-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                        </h3>
                        <span className="text-xs text-slate-500">{edu.startDate} — {edu.endDate}</span>
                      </div>
                      <p className="text-sm text-slate-600">{edu.school}{edu.gpa ? ` • GPA: ${edu.gpa}` : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((cat, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <span className="font-semibold text-slate-800 shrink-0">{cat.category}:</span>
                      <span className="text-slate-600">{cat.items.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((proj, i) => (
                    <div key={i}>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">{proj.name}</h3>
                        {proj.url && (
                          <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                            ↗ Link
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{proj.description}</p>
                      {proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {proj.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-200 pb-2 mb-4">
                  Certifications
                </h2>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium text-slate-800">{cert.name}</span>
                      <span className="text-slate-500"> — {cert.issuer}{cert.date ? `, ${cert.date}` : ""}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="px-10 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Generated with CareerForge • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
