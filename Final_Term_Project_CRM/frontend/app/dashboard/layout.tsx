"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-crust)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="animate-spin" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid var(--color-surface0)", borderTopColor: "var(--color-mauve)" }} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-crust)" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "260px", padding: "2rem", maxWidth: "calc(100vw - 260px)", overflowX: "hidden" }}>
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
