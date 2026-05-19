// =============================================================================
// CareerForge — Outreach Send API
// API Endpoint to send emails via the Email Service
// =============================================================================

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, subject, html, jobId } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send the email
    await sendEmail({ to, subject, html });

    // Update outreach status if jobId provided (jobId is used as outreachId in frontend)
    if (jobId) {
      await prisma.emailOutreach.update({
        where: { id: jobId, userId: session.user.id },
        data: { status: "sent", sentAt: new Date() }
      });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Outreach Send API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
