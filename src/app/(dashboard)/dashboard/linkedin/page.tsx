// =============================================================================
// CareerForge — LinkedIn Optimizer Dashboard (Module D)
// UI for generating and applying LinkedIn profile optimizations
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
import { UserCircle, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";

export default function LinkedInOptimizerPage() {
  const [targetRole, setTargetRole] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<{
    headlines: string[];
    aboutSection: string;
    recommendedSkills: string[];
  } | null>(null);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole) return;

    setIsOptimizing(true);
    // Simulate API call to linkedin optimizer service
    setTimeout(() => {
      setResult({
        headlines: [
          `${targetRole} | Driving Innovation & Growth | Ex-TechCorp`,
          `Award-Winning ${targetRole} | Specialized in Scalable Systems`,
          `Passionate ${targetRole} helping startups achieve 10x growth`,
        ],
        aboutSection: `I am a dedicated ${targetRole} with over 5 years of experience building impactful solutions. My expertise lies in bridging the gap between complex technical problems and elegant, user-centric designs.\n\nThroughout my career, I've consistently delivered projects that not only meet technical requirements but also drive business value. I thrive in collaborative environments and am always eager to learn new technologies.`,
        recommendedSkills: [
          "React.js",
          "Node.js",
          "TypeScript",
          "System Architecture",
          "Agile Leadership",
        ],
      });
      setIsOptimizing(false);
      toast.success("Profile optimized successfully!");
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-[#0A66C2]" />
          LinkedIn Optimizer
        </h1>
        <p className="text-white/60">
          Generate SEO-optimized headlines and summaries for your LinkedIn
          profile.
        </p>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardContent className="pt-6">
          <form onSubmit={handleOptimize} className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Target Role (e.g., Senior Full Stack Engineer)"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>
            <Button
              type="submit"
              disabled={isOptimizing || !targetRole}
              className="h-12 px-8 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
            >
              {isOptimizing ? (
                "Optimizing..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Profile
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  Optimized Headlines
                </CardTitle>
                <CardDescription className="text-white/60">
                  Choose the one that best fits your brand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.headlines.map((headline, i) => (
                  <div
                    key={i}
                    className="p-3 rounded bg-black/40 border border-white/5 flex justify-between items-center group"
                  >
                    <p className="text-white text-sm">{headline}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(headline)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recommended Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedSkills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-white/10 text-white hover:bg-white/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">About Section</CardTitle>
              <CardDescription className="text-white/60">
                A compelling summary of your experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-white/80 whitespace-pre-wrap text-sm leading-relaxed">
                {result.aboutSection}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                onClick={() => copyToClipboard(result.aboutSection)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Summary
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
