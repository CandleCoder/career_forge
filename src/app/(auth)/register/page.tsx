// =============================================================================
// CareerForge — Register Page
// =============================================================================

"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Mail, Lock, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/register")
      .then((res) => res.json())
      .then((data) => setRegistrationOpen(data.registrationOpen))
      .catch(() => setRegistrationOpen(false));
  }, []);

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
    <div className="grid-pattern relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-[hsl(var(--color-accent))]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-[hsl(var(--color-primary))]/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
            <div className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text text-2xl font-bold">CareerForge</span>
          </Link>
          <h1 className="mb-1 text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-[hsl(var(--color-text-secondary))]">
            Start automating your career journey
          </p>
        </div>

        <div className="glass-card p-8">
          {registrationOpen === null ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(var(--color-primary))] border-t-transparent" />
              <p className="text-sm text-[hsl(var(--color-text-muted))]">
                Checking registration status...
              </p>
            </div>
          ) : registrationOpen === false ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-white">Signups Closed</h2>
              <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--color-text-secondary))]">
                Registration is currently disabled. Only a single authorized administrator account
                is allowed for this instance.
              </p>
              <Link href="/login" className="inline-block w-full">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                name="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                icon={<User className="h-4 w-4" />}
                required
                minLength={2}
              />

              <Input
                name="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
                required
              />

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Min. 6 characters"
                icon={<Lock className="h-4 w-4" />}
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
          )}
        </div>

        {registrationOpen !== false && (
          <p className="mt-6 text-center text-sm text-[hsl(var(--color-text-muted))]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[hsl(var(--color-primary))] hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
