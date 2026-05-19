// =============================================================================
// CareerForge — Outreach Log (Module B)
// View generated emails, track applications, and send via SMTP
// =============================================================================

"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const MOCK_OUTREACH = [
  {
    id: "1",
    company: "TechCorp",
    role: "Senior Frontend Engineer",
    status: "Sent",
    date: "2 days ago",
    recruiter: "Sarah J.",
  },
  {
    id: "2",
    company: "Innovate Inc",
    role: "Full Stack Developer",
    status: "Draft",
    date: "Today",
    recruiter: "Michael T.",
  },
  {
    id: "3",
    company: "WebSolutions",
    role: "React Developer",
    status: "Failed",
    date: "1 week ago",
    recruiter: "Unknown",
  },
];

export default function OutreachPage() {
  const [emails, setEmails] = useState(MOCK_OUTREACH);

  const handleSend = (id: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Sending email via SMTP...",
      success: "Email sent successfully!",
      error: "Failed to send email.",
    });
    setEmails(
      emails.map((e) =>
        e.id === id ? { ...e, status: "Sent", date: "Just now" } : e,
      ),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sent":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "Draft":
        return <Clock className="w-4 h-4 text-amber-400" />;
      case "Failed":
        return <XCircle className="w-4 h-4 text-rose-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Outreach Log
        </h1>
        <p className="text-white/60">
          Track your automated job applications and generated cold emails.
        </p>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-white/60">
            Your automated outreach history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emails.map((email) => (
              <div
                key={email.id}
                className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    {getStatusIcon(email.status)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {email.role} at {email.company}
                    </h3>
                    <p className="text-sm text-white/50">
                      To: {email.recruiter} • {email.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      email.status === "Sent"
                        ? "success"
                        : email.status === "Draft"
                          ? "warning"
                          : "error"
                    }
                  >
                    {email.status}
                  </Badge>
                  {email.status === "Draft" && (
                    <Button
                      size="sm"
                      onClick={() => handleSend(email.id)}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Send className="w-3 h-3 mr-2" />
                      Send Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
