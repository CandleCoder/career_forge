// =============================================================================
// CareerForge — Premium Landing Page
// Hero + Features + CTA with stunning animations
// =============================================================================

"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Search,
  Mail,
  BarChart3,
  Zap,
  ArrowRight,
  Sparkles,
  Shield,
  Globe,
  UserCircle,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Intelligent Resume Engine",
    description:
      "Parse PDFs/DOCX or build from scratch. AI-optimized for ATS. Generate stunning, shareable hosted resumes with PDF export.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Search,
    title: "Autonomous Job Hunter",
    description:
      "AI scans thousands of jobs across multiple sources, matches them to your profile, and scores each opportunity for relevance.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Mail,
    title: "Smart Email Outreach",
    description:
      "Generate hyper-personalized cold emails and cover letters. Auto-send applications on a cron schedule every few days.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: UserCircle,
    title: "LinkedIn AI Optimizer",
    description:
      "Get professional-grade headline, about section, and keyword optimizations to rank at the top of recruiter searches.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: BarChart3,
    title: "Career Analytics Dashboard",
    description:
      "Track your entire pipeline: jobs analyzed, emails sent, response rates, and conversion metrics — all in one place.",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Shield,
    title: "White-Label Ready",
    description:
      "Fully environment-variable driven. Deploy in 10 minutes with your own branding, API keys, and domain.",
    gradient: "from-slate-400 to-slate-600",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--color-bg-primary))] grid-pattern">
      {/* ---- Navbar ---- */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.05)]"
        style={{
          background: "rgba(10, 11, 20, 0.8)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">CareerForge</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="gradient" size="sm">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Hero Section ---- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[hsl(var(--color-primary))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-[hsl(var(--color-secondary))]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(var(--color-accent))]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-sm text-[hsl(var(--color-text-secondary))] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--color-primary))]" />
            AI-Powered Career Automation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          >
            Your Career on <span className="gradient-text">Autopilot</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[hsl(var(--color-text-secondary))] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Generate stunning resumes, discover perfect job matches, and
            automate personalized outreach — all powered by AI. Land your dream
            role while you sleep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button variant="gradient" size="lg" className="text-base px-8">
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-8">
                <Globe className="w-4 h-4" /> View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "10K+", label: "Jobs Matched" },
              { value: "95%", label: "ATS Pass Rate" },
              { value: "3x", label: "More Interviews" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-[hsl(var(--color-text-muted))] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- Features Grid ---- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Land Your Dream Role</span>
            </h2>
            <p className="text-[hsl(var(--color-text-secondary))] max-w-xl mx-auto">
              A complete career automation suite — from resume generation to
              automated job applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 group cursor-default"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center glass-card p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[hsl(var(--color-primary))]/20 blur-[80px] rounded-full" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">
            Ready to Supercharge Your Career?
          </h2>
          <p className="text-[hsl(var(--color-text-secondary))] mb-8 relative z-10">
            Join now and let AI handle the heavy lifting of your job search.
          </p>
          <Link href="/register" className="relative z-10">
            <Button variant="gradient" size="lg" className="text-base px-10">
              Get Started Free <Sparkles className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-[rgba(255,255,255,0.05)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-[hsl(var(--color-text-muted))]">
          <span>
            © {new Date().getFullYear()} CareerForge. All rights reserved.
          </span>
          <span>Built with AI ✨</span>
        </div>
      </footer>
    </div>
  );
}
