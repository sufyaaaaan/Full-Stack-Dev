"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import CustomSelect from "@/components/CustomSelect";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Active" | "Lead" | "Inactive";
  address: string;
  notes: string;
  totalRevenue: number;
  createdAt: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "Active" ? "badge-active" : status === "Lead" ? "badge-lead" : "badge-inactive";
  const dot = status === "Active" ? "🟢" : status === "Lead" ? "🟡" : "⚫";
  return <span className={`badge ${cls}`}>{dot} {status}</span>;
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Customer | null>(null);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.data);
    } catch {
      toast.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company || "").toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [customers, search, statusFilter]);

  const handleDelete = async (customer: Customer) => {
    setDeleting(customer._id);
    try {
      await api.delete(`/customers/${customer._id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== customer._id));
      toast.success(`${customer.name} deleted successfully.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Customers</h1>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>
            {filtered.length} of {customers.length} customers
          </p>
        </div>
        <Link href="/dashboard/customers/add" className="btn-primary" id="add-customer-btn">
          ➕ Add Customer
        </Link>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-subtext0)", pointerEvents: "none" }}>🔍</span>
          <input
            id="search-customers"
            type="text"
            className="input-base"
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.25rem" }}
          />
        </div>
        <CustomSelect
          id="filter-status"
          value={statusFilter}
          onChange={setStatusFilter}
          variant="default"
          options={[
            { value: "All",      label: "All Status",  icon: "🔘" },
            { value: "Active",   label: "Active",      icon: "🟢", color: "var(--color-green)",   bg: "rgba(166,227,161,0.08)",  border: "rgba(166,227,161,0.2)" },
            { value: "Lead",     label: "Lead",        icon: "🟡", color: "var(--color-yellow)",  bg: "rgba(249,226,175,0.08)",  border: "rgba(249,226,175,0.2)" },
            { value: "Inactive", label: "Inactive",    icon: "⚫", color: "var(--color-overlay2)",bg: "rgba(166,173,200,0.05)",  border: "rgba(166,173,200,0.15)" },
          ]}
        />
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, index) => (
                <tr key={customer._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.03}s` }}>
                  <td style={{ color: "var(--color-subtext0)", fontSize: "0.8rem" }}>{index + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{
                        width: "36px", height: "36px", flexShrink: 0,
                        background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.875rem", fontWeight: 700, color: "var(--color-crust)",
                      }}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{customer.name}</div>
                        <div style={{ color: "var(--color-subtext0)", fontSize: "0.75rem" }}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--color-subtext1)" }}>{customer.phone}</td>
                  <td style={{ color: "var(--color-subtext1)" }}>{customer.company || "—"}</td>
                  <td><StatusBadge status={customer.status} /></td>
                  <td style={{ color: "var(--color-green)", fontWeight: 500 }}>${(customer.totalRevenue || 0).toLocaleString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => router.push(`/dashboard/customers/${customer._id}`)}
                        className="btn-secondary"
                        style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setConfirmDelete(customer)}
                        className="btn-danger"
                        style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
                        disabled={deleting === customer._id}
                        title="Delete"
                      >
                        {deleting === customer._id ? "..." : "🗑️"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "var(--color-subtext0)" }}>
                    {search || statusFilter !== "All" ? "No customers match your filters." : "No customers yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-box" style={{ maxWidth: "400px" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              🗑️ Delete Customer?
            </h2>
            <p style={{ color: "var(--color-subtext0)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              Are you sure you want to delete <strong style={{ color: "var(--color-text)" }}>{confirmDelete.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button
                className="btn-danger"
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleting === confirmDelete._id}
              >
                {deleting === confirmDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
