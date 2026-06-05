"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) router.replace("/dashboard");
      else router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-crust)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "3px solid var(--color-surface0)",
          borderTopColor: "var(--color-mauve)",
        }}
        className="animate-spin"
      />
      <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>
        Loading NexusCRM...
      </p>
    </div>
  );
}
