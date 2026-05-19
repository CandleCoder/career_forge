// =============================================================================
// CareerForge — Job Search Dashboard (Module B)
// View scraped jobs, run AI matching, and generate cold emails
// =============================================================================

"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building, Mail } from "lucide-react";
import { toast } from "sonner";

// Mock data for initial render
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "Remote",
    score: 92,
    matchStatus: "Strong Match",
    applied: false,
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Innovate Inc",
    location: "New York, NY",
    score: 85,
    matchStatus: "Good Match",
    applied: true,
  },
  {
    id: "3",
    title: "React Developer",
    company: "WebSolutions",
    location: "San Francisco, CA",
    score: 65,
    matchStatus: "Weak Match",
    applied: false,
  },
];

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [jobs] = useState(MOCK_JOBS);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    // Simulate API call to scraper
    setTimeout(() => {
      toast.success("Found 15 new jobs matching your query.");
      setIsSearching(false);
    }, 1500);
  };

  const generateEmail = (_jobId: string) => {
    console.log("Generating email for job:", _jobId);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Generating personalized AI email...",
      success: "Email draft generated! Check your Outreach tab.",
      error: "Failed to generate email.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Job Hunter
        </h1>
        <p className="text-white/60">
          Search for jobs and let AI match them against your resume.
        </p>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Job title, keywords, or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>
            <Button type="submit" disabled={isSearching} className="h-12 px-8">
              {isSearching ? (
                "Searching..."
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="bg-white/5 border-white/10 hover:border-white/20 transition-colors flex flex-col"
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant={
                    job.score >= 90
                      ? "success"
                      : job.score >= 70
                        ? "warning"
                        : "error"
                  }
                >
                  {job.score}% {job.matchStatus}
                </Badge>
                {job.applied && (
                  <Badge
                    variant="outline"
                    className="bg-blue-500/20 text-blue-300"
                  >
                    Applied
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl text-white">{job.title}</CardTitle>
              <CardDescription className="text-white/60 flex items-center gap-2">
                <Building className="w-4 h-4" /> {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm text-white/50 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                disabled={job.applied}
              >
                View Details
              </Button>
              <Button
                className="flex-1 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
                onClick={() => generateEmail(job.id)}
                disabled={job.applied}
              >
                <Mail className="w-4 h-4 mr-2" />
                Auto-Apply
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
