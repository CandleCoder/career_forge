// =============================================================================
// CareerForge — Register Page
// =============================================================================

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Call register API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Account created but sign-in failed. Please log in.");
        router.push("/login");
      } else {
        toast.success("Welcome to CareerForge! 🚀");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden grid-pattern">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[hsl(var(--color-accent))]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--color-primary))]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">CareerForge</span>
          </Link>
          <h1 className="text-xl font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-[hsl(var(--color-text-secondary))]">
            Start automating your career journey
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="w-4 h-4" />}
              required
              minLength={2}
            />

            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Min. 6 characters"
              icon={<Lock className="w-4 h-4" />}
              required
              minLength={6}
            />

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[hsl(var(--color-text-muted))] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[hsl(var(--color-primary))] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
