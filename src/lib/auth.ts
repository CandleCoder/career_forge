// =============================================================================
// CareerForge — Auth.js (NextAuth v5) Main Configuration
// Exports: auth, handlers, signIn, signOut
// =============================================================================

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      // Attach user ID to the JWT token on first sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose user ID in the session object
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
