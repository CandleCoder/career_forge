// =============================================================================
// CareerForge — TypeScript Type Definitions
// =============================================================================

// ---- Resume Types ----
export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  honors?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  certifications?: Certification[];
  projects?: Project[];
}

// ---- Job Types ----
export type JobStatus = "new" | "saved" | "applied" | "interviewing" | "rejected" | "offered";
export type JobType = "freelance" | "consultancy" | "onsite" | "remote";

// ---- Email Types ----
export type EmailStatus = "pending" | "sent" | "delivered" | "opened" | "replied" | "bounced";

// ---- Dashboard Types ----
export interface DashboardStats {
  totalJobs: number;
  emailsSent: number;
  responses: number;
  conversionRate: number;
  pipeline: {
    new: number;
    applied: number;
    interviewing: number;
    offered: number;
    rejected: number;
  };
}

// ---- LinkedIn Types ----
export interface LinkedInOptimization {
  headline: string;
  about: string;
  experienceEnhancements: Array<{
    original: string;
    enhanced: string;
  }>;
  skillRecommendations: Array<{
    skill: string;
    reason: string;
    priority: "high" | "medium" | "low";
  }>;
  keywordSuggestions: Array<{
    keyword: string;
    relevance: number;
    usage: string;
  }>;
  completenessScore: number;
}

// ---- NextAuth Type Extensions ----
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    };
  }
}
