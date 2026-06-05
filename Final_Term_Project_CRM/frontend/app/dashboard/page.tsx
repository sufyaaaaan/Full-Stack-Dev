"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Customer {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Lead" | "Inactive";
  totalRevenue: number;
  createdAt: string;
}

interface Stats {
  total: number;
  active: number;
  leads: number;
  inactive: number;
  revenue: number;
}

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "Active" ? "badge-active" : status === "Lead" ? "badge-lead" : "badge-inactive";
  const dot = status === "Active" ? "🟢" : status === "Lead" ? "🟡" : "⚫";
  return <span className={`badge ${cls}`}>{dot} {status}</span>;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, leads: 0, inactive: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/customers");
        const data: Customer[] = res.data.data;
        setCustomers(data);
        setStats({
          total: data.length,
          active: data.filter((c) => c.status === "Active").length,
          leads: data.filter((c) => c.status === "Lead").length,
          inactive: data.filter((c) => c.status === "Inactive").length,
          revenue: data.reduce((sum, c) => sum + (c.totalRevenue || 0), 0),
        });
      } catch {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Customers", value: stats.total, icon: "👥", color: "var(--color-blue)", gradient: "rgba(137,180,250,0.15)" },
    { label: "Active Clients", value: stats.active, icon: "✅", color: "var(--color-green)", gradient: "rgba(166,227,161,0.15)" },
    { label: "Leads", value: stats.leads, icon: "🎯", color: "var(--color-yellow)", gradient: "rgba(249,226,175,0.15)" },
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰", color: "var(--color-mauve)", gradient: "rgba(203,166,247,0.15)" },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div className="animate-spin" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid var(--color-surface0)", borderTopColor: "var(--color-mauve)" }} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.25rem" }}>
          Welcome back, <span className="gradient-text">{user?.name}</span> 👋
        </h1>
        <p style={{ color: "var(--color-subtext0)", fontSize: "0.9rem" }}>
          Here&apos;s what&apos;s happening with your CRM today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {statCards.map((card, i) => (
          <div key={i} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s`, background: `linear-gradient(135deg, var(--color-mantle) 60%, ${card.gradient})` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "var(--color-subtext0)", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{card.label}</p>
                <p style={{ fontSize: "2rem", fontWeight: 700, color: card.color }}>{card.value}</p>
              </div>
              <span style={{ fontSize: "1.75rem" }}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <Link href="/dashboard/customers/add" className="btn-primary">
          ➕ Add Customer
        </Link>
        <Link href="/dashboard/invoices" className="btn-secondary">
          🧾 Generate Invoice
        </Link>
        <Link href="/dashboard/customers" className="btn-secondary">
          👥 View All Customers
        </Link>
      </div>

      {/* Recent Customers Table */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Recent Customers</h2>
          <Link href="/dashboard/customers" style={{ color: "var(--color-mauve)", fontSize: "0.8rem", textDecoration: "none" }}>
            View all →
          </Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {customers.slice(0, 8).map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{
                        width: "32px", height: "32px",
                        background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.75rem", fontWeight: 700, color: "var(--color-crust)", flexShrink: 0,
                      }}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{customer.name}</div>
                        <div style={{ color: "var(--color-subtext0)", fontSize: "0.75rem" }}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--color-subtext1)" }}>{customer.company || "—"}</td>
                  <td><StatusBadge status={customer.status} /></td>
                  <td style={{ color: "var(--color-green)", fontWeight: 500 }}>${(customer.totalRevenue || 0).toLocaleString()}</td>
                  <td style={{ color: "var(--color-subtext0)", fontSize: "0.8rem" }}>{new Date(customer.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--color-subtext0)" }}>No customers yet. <Link href="/dashboard/customers/add" style={{ color: "var(--color-mauve)" }}>Add one!</Link></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
