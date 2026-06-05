"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import CustomSelect from "@/components/CustomSelect";

export default function AddCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Lead",
    address: "",
    notes: "",
    totalRevenue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Name, email, and phone are required.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/customers", {
        ...form,
        totalRevenue: form.totalRevenue ? Number(form.totalRevenue) : 0,
      });
      toast.success("Customer added successfully! 🎉");
      router.push("/dashboard/customers");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <Link href="/dashboard/customers" className="btn-secondary" style={{ padding: "0.5rem 0.75rem" }}>
          ← Back
        </Link>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Add New Customer</h1>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>Fill in the details to create a new customer record.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: "700px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Full Name *</label>
              <input id="add-name" name="name" type="text" className="input-base" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <input id="add-email" name="email" type="email" className="input-base" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Phone Number *</label>
              <input id="add-phone" name="phone" type="tel" className="input-base" placeholder="+1-555-0100" value={form.phone} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Company</label>
              <input id="add-company" name="company" type="text" className="input-base" placeholder="Acme Corp" value={form.company} onChange={handleChange} />
            </div>

            <div>
              <label className="form-label">Status</label>
              <CustomSelect
                id="add-status"
                value={form.status}
                onChange={(val) => setForm({ ...form, status: val })}
                options={[
                  { value: "Lead",     label: "Lead",     icon: "🟡", color: "var(--color-yellow)",  bg: "rgba(249,226,175,0.08)",  border: "rgba(249,226,175,0.2)" },
                  { value: "Active",   label: "Active",   icon: "🟢", color: "var(--color-green)",   bg: "rgba(166,227,161,0.08)",  border: "rgba(166,227,161,0.2)" },
                  { value: "Inactive", label: "Inactive", icon: "⚫", color: "var(--color-overlay2)",bg: "rgba(166,173,200,0.05)",  border: "rgba(166,173,200,0.15)" },
                ]}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Address</label>
              <input id="add-address" name="address" type="text" className="input-base" placeholder="123 Main St, City, State ZIP" value={form.address} onChange={handleChange} />
            </div>

            <div>
              <label className="form-label">Total Revenue ($)</label>
              <input id="add-revenue" name="totalRevenue" type="number" min="0" className="input-base" placeholder="0" value={form.totalRevenue} onChange={handleChange} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Notes</label>
              <textarea id="add-notes" name="notes" className="input-base" placeholder="Additional notes about the customer..." value={form.notes} onChange={handleChange} rows={3} style={{ resize: "vertical" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
            <Link href="/dashboard/customers" className="btn-secondary">Cancel</Link>
            <button id="add-customer-submit" type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin" style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(17,17,27,0.3)", borderTopColor: "var(--color-crust)", display: "inline-block" }} />
                  Adding...
                </>
              ) : "➕ Add Customer"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
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
