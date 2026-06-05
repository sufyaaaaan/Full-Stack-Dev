"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/customers", label: "Customers", icon: "👥" },
  { href: "/dashboard/customers/add", label: "Add Customer", icon: "➕" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "🧾" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "260px",
      background: "var(--color-mantle)",
      borderRight: "1px solid var(--color-surface0)",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 1rem",
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", padding: "0 0.5rem" }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
          borderRadius: "0.75rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(203,166,247,0.3)",
        }}>⚡</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text)" }}>NexusCRM</div>
          <div style={{ fontSize: "0.7rem", color: "var(--color-subtext0)" }}>Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <p style={{ fontSize: "0.7rem", color: "var(--color-overlay0)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 0.5rem", marginBottom: "0.5rem" }}>
          Navigation
        </p>
        {navLinks.map((link) => {
          const isActive = link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div style={{ borderTop: "1px solid var(--color-surface0)", paddingTop: "1rem" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.625rem 0.75rem",
          background: "var(--color-surface0)",
          borderRadius: "0.75rem",
          marginBottom: "0.75rem",
        }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.875rem", fontWeight: 700, color: "var(--color-crust)",
          }}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--color-subtext0)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </div>
          </div>
        </div>
        <button
          id="logout-btn"
          onClick={logout}
          className="sidebar-link"
          style={{ color: "var(--color-red)" }}
        >
          <span style={{ fontSize: "1rem" }}>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
