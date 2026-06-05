"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@crm.com");
  const [password, setPassword] = useState("admin123456");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb orb1" />
      <div className="auth-bg-orb orb2" />

      <div className="auth-card animate-fadeInUp">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="auth-logo">
            <span style={{ fontSize: "1.5rem" }}>⚡</span>
          </div>
          <h1 className="gradient-text" style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            NexusCRM
          </h1>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>
            Sign in to your workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="form-label">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="input-base"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              className="input-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginTop: "0.5rem" }}
          >
            {loading ? (
              <>
                <span className="animate-spin" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(17,17,27,0.3)", borderTopColor: "var(--color-crust)", display: "inline-block" }} />
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--color-mauve)", textDecoration: "none", fontWeight: 600 }}>
              Create one
            </Link>
          </p>
        </div>


      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: var(--color-crust);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .auth-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb1 {
          width: 400px; height: 400px;
          background: rgba(203,166,247,0.12);
          top: -100px; right: -100px;
        }
        .orb2 {
          width: 300px; height: 300px;
          background: rgba(137,180,250,0.1);
          bottom: -80px; left: -80px;
        }
        .auth-card {
          position: relative;
          z-index: 1;
          background: var(--color-mantle);
          border: 1px solid var(--color-surface0);
          border-radius: 1.5rem;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        .auth-logo {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--color-mauve), var(--color-blue));
          border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 8px 24px rgba(203,166,247,0.3);
        }
        .form-label {
          display: block;
          color: var(--color-subtext1);
          font-size: 0.8125rem;
          font-weight: 500;
          margin-bottom: 0.375rem;
        }
      `}</style>
    </div>
  );
}
