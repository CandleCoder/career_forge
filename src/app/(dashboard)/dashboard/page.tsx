// =============================================================================
// CareerForge — Analytics Dashboard (Module C)
// Main dashboard with metrics, charts, and pipeline tracking
// =============================================================================

"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  Mail,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Clock,
  XCircle,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Demo data — in production, fetched from DB via server action
const stats = [
  {
    label: "Jobs Analyzed",
    value: "247",
    change: "+34 this week",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
  },
  {
    label: "Emails Sent",
    value: "89",
    change: "+12 this week",
    icon: Mail,
    color: "from-cyan-500 to-blue-600",
  },
  {
    label: "Responses",
    value: "23",
    change: "+5 this week",
    icon: MessageSquare,
    color: "from-emerald-500 to-green-600",
  },
  {
    label: "Conversion Rate",
    value: "25.8%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
  },
];

const pipelineStages = [
  { label: "New", count: 142, color: "bg-blue-500", percentage: 57 },
  { label: "Applied", count: 64, color: "bg-violet-500", percentage: 26 },
  { label: "Interviewing", count: 23, color: "bg-amber-500", percentage: 9 },
  { label: "Offered", count: 8, color: "bg-emerald-500", percentage: 3 },
  { label: "Rejected", count: 10, color: "bg-red-500", percentage: 4 },
];

const recentActivity = [
  {
    action: "Email sent to",
    target: "Sarah K. at Google",
    time: "2h ago",
    icon: Mail,
    status: "sent",
  },
  {
    action: "New job match",
    target: "Senior Dev at Stripe",
    time: "4h ago",
    icon: Briefcase,
    status: "new",
  },
  {
    action: "Response from",
    target: "TechCorp Recruiting",
    time: "6h ago",
    icon: MessageSquare,
    status: "replied",
  },
  {
    action: "Applied to",
    target: "Frontend Lead at Vercel",
    time: "1d ago",
    icon: CheckCircle2,
    status: "applied",
  },
  {
    action: "Interview scheduled",
    target: "Meta - E5 Engineer",
    time: "2d ago",
    icon: Clock,
    status: "interviewing",
  },
  {
    action: "Rejected by",
    target: "Amazon SDE III",
    time: "3d ago",
    icon: XCircle,
    status: "rejected",
  },
];

const statusColors: Record<string, string> = {
  sent: "info",
  new: "default",
  replied: "success",
  applied: "default",
  interviewing: "warning",
  rejected: "error",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Career Dashboard</h1>
        <p className="text-sm text-[hsl(var(--color-text-secondary))] mt-1">
          Your job hunt pipeline at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[hsl(var(--color-text-muted))] uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-[hsl(var(--color-success))] mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Pipeline Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[hsl(var(--color-primary))]" />
                Application Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Stacked bar */}
              <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
                {pipelineStages.map((stage) => (
                  <motion.div
                    key={stage.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className={`${stage.color} rounded-full`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.label} className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${stage.color}`}
                    />
                    <div>
                      <p className="text-xs text-[hsl(var(--color-text-muted))]">
                        {stage.label}
                      </p>
                      <p className="text-sm font-semibold">{stage.count}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly breakdown bars */}
              <div className="mt-6 space-y-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => {
                    const width = [45, 72, 60, 85, 35, 20, 15][i];
                    return (
                      <div key={day} className="flex items-center gap-3">
                        <span className="text-xs text-[hsl(var(--color-text-muted))] w-8">
                          {day}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-[hsl(var(--color-bg-tertiary))]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{
                              duration: 0.6,
                              delay: 0.6 + i * 0.05,
                            }}
                            className="h-full rounded-full gradient-bg"
                          />
                        </div>
                        <span className="text-xs text-[hsl(var(--color-text-muted))] w-8 text-right">
                          {Math.round(width * 0.35)}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[hsl(var(--color-secondary))]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                    className="flex items-start gap-3 pb-4 border-b border-[hsl(var(--color-border))] last:border-0 last:pb-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--color-bg-tertiary))] flex items-center justify-center shrink-0 mt-0.5">
                      <activity.icon className="w-3.5 h-3.5 text-[hsl(var(--color-text-muted))]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="text-[hsl(var(--color-text-secondary))]">
                          {activity.action}
                        </span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            statusColors[activity.status] as
                              | "default"
                              | "success"
                              | "warning"
                              | "error"
                              | "info"
                          }
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-[hsl(var(--color-text-muted))]">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
