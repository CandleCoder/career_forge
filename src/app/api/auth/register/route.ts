// =============================================================================
// CareerForge — Register API Route
// =============================================================================

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({ registrationOpen: userCount < 1 });
  } catch (error) {
    console.error("Error checking registration status:", error);
    return NextResponse.json({ registrationOpen: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Prevent signups if there is already 1 user in the database
    const userCount = await prisma.user.count();
    if (userCount >= 1) {
      return NextResponse.json({ error: "Registration is currently closed." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
