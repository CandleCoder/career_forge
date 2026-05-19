// =============================================================================
// CareerForge — Settings Page (Module E)
// Manage account, automation preferences, and API keys
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
import { Input } from "@/components/ui/input";
import { Settings, Save, User, Bell, Key } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-white/60">
          Manage your account preferences and automation rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" /> Profile Settings
            </CardTitle>
            <CardDescription className="text-white/60">
              Your basic information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Full Name
                </label>
                <Input
                  defaultValue="John Doe"
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Email
                </label>
                <Input
                  defaultValue="john@example.com"
                  type="email"
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" /> Automation Preferences
            </CardTitle>
            <CardDescription className="text-white/60">
              Configure how the Job Hunter works for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Target Job Title
              </label>
              <Input
                defaultValue="Senior Software Engineer"
                className="bg-black/50 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Target Location / Remote
              </label>
              <Input
                defaultValue="Remote"
                className="bg-black/50 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Minimum Match Score (%)
              </label>
              <Input
                type="number"
                defaultValue="80"
                min="0"
                max="100"
                className="bg-black/50 border-white/20 text-white"
              />
              <p className="text-xs text-white/50">
                Only jobs scoring above this threshold will generate drafts.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="w-5 h-5" /> Bring Your Own API (Optional)
            </CardTitle>
            <CardDescription className="text-white/60">
              Override the system defaults with your own keys.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                OpenAI API Key
              </label>
              <Input
                type="password"
                placeholder="sk-..."
                className="bg-black/50 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="h-12 px-8 bg-white text-black hover:bg-white/90"
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
