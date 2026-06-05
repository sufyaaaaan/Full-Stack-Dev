"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import CustomSelect from "@/components/CustomSelect";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    status: "Lead", address: "", notes: "", totalRevenue: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
        const c = res.data.data;
        setForm({
          name: c.name || "", email: c.email || "", phone: c.phone || "",
          company: c.company || "", status: c.status || "Lead",
          address: c.address || "", notes: c.notes || "",
          totalRevenue: c.totalRevenue?.toString() || "0",
        });
      } catch {
        toast.error("Customer not found.");
        router.push("/dashboard/customers");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Name, email, and phone are required.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/customers/${id}`, {
        ...form,
        totalRevenue: form.totalRevenue ? Number(form.totalRevenue) : 0,
      });
      toast.success("Customer updated successfully! ✅");
      router.push("/dashboard/customers");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <Link href="/dashboard/customers" className="btn-secondary" style={{ padding: "0.5rem 0.75rem" }}>
          ← Back
        </Link>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Edit Customer</h1>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>Update customer information below.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: "700px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Full Name *</label>
              <input id="edit-name" name="name" type="text" className="input-base" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input id="edit-email" name="email" type="email" className="input-base" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input id="edit-phone" name="phone" type="tel" className="input-base" value={form.phone} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Company</label>
              <input id="edit-company" name="company" type="text" className="input-base" value={form.company} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Status</label>
              <CustomSelect
                id="edit-status"
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
              <input id="edit-address" name="address" type="text" className="input-base" value={form.address} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Total Revenue ($)</label>
              <input id="edit-revenue" name="totalRevenue" type="number" min="0" className="input-base" value={form.totalRevenue} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Notes</label>
              <textarea id="edit-notes" name="notes" className="input-base" value={form.notes} onChange={handleChange} rows={3} style={{ resize: "vertical" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
            <Link href="/dashboard/customers" className="btn-secondary">Cancel</Link>
            <button id="edit-customer-submit" type="submit" className="btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <span className="animate-spin" style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(17,17,27,0.3)", borderTopColor: "var(--color-crust)", display: "inline-block" }} />
                  Saving...
                </>
              ) : "💾 Save Changes"}
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
