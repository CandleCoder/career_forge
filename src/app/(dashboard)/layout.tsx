// =============================================================================
// CareerForge — Dashboard Layout
// Server component that wraps all dashboard pages with sidebar
// =============================================================================

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/shared/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen flex">
        <Sidebar
          userName={session.user.name || undefined}
          userEmail={session.user.email || undefined}
        />

        {/* Main content area — offset by sidebar width */}
        <main
          className="flex-1 min-h-screen transition-all duration-300"
          style={{ marginLeft: "260px" }}
        >
          {/* Top bar */}
          <header
            className="h-16 border-b border-[hsl(var(--color-border))] px-8 flex items-center justify-between sticky top-0 z-30"
            style={{
              background: "hsla(230, 25%, 7%, 0.8)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div>
              <p className="text-sm text-[hsl(var(--color-text-secondary))]">
                Welcome back,{" "}
                <span className="text-[hsl(var(--color-text-primary))] font-medium">
                  {session.user.name}
                </span>
              </p>
            </div>
          </header>

          {/* Page content */}
          <div className="p-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
