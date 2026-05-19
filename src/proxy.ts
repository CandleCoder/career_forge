// =============================================================================
// CareerForge — Middleware (Route Protection)
// =============================================================================

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect dashboard routes, skip API/static/public routes
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/jobs/:path*",
    "/outreach/:path*",
    "/linkedin/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
