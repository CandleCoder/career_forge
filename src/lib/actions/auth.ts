// =============================================================================
// CareerForge — Auth Actions (Register)
// Server action for user registration
// =============================================================================

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/lib/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterState = {
  error?: string;
  success?: boolean;
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Validation failed" };
  }

  const { name, email, password } = parsed.data;

  // Prevent signups if there is already 1 user in the database
  const userCount = await prisma.user.count();
  if (userCount >= 1) {
    return { error: "Registration is currently closed." };
  }

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Auto sign-in after registration
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });

  return { success: true };
}
