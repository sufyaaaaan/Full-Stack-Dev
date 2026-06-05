"use client";
import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import CustomSelect from "@/components/CustomSelect";

interface Customer {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  customerSnapshot: { name: string; email: string; company: string; phone: string; address: string };
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const emptyItem = (): InvoiceItem => ({ description: "", quantity: 1, unitPrice: 0 });

const STATUS_STYLES: Record<string, { badge: string; color: string; bg: string; border: string }> = {
  Draft:   { badge: "badge", color: "var(--color-overlay2)", bg: "rgba(166,173,200,0.1)",   border: "rgba(166,173,200,0.2)" },
  Sent:    { badge: "badge", color: "var(--color-blue)",    bg: "rgba(137,180,250,0.12)", border: "rgba(137,180,250,0.25)" },
  Paid:    { badge: "badge", color: "var(--color-green)",   bg: "rgba(166,227,161,0.15)", border: "rgba(166,227,161,0.3)" },
  Overdue: { badge: "badge", color: "var(--color-red)",     bg: "rgba(243,139,168,0.15)", border: "rgba(243,139,168,0.3)" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Draft;
  const icons: Record<string, string> = { Draft: "📝", Sent: "📤", Paid: "✅", Overdue: "⚠️" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.625rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {icons[status] || "📝"} {status}
    </span>
  );
};

export default function InvoicesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("Draft");
  const [items, setItems] = useState<InvoiceItem[]>([emptyItem()]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [custRes, invRes] = await Promise.all([
          api.get("/customers"),
          api.get("/invoices"),
        ]);
        setCustomers(custRes.data.data);
        setInvoices(invRes.data.data);
      } catch {
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const taxAmt = subtotal * (tax / 100);
  const discountAmt = subtotal * (discount / 100);
  const total = subtotal + taxAmt - discountAmt;

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const handleCreate = async () => {
    if (!selectedCustomer) { toast.error("Please select a customer."); return; }
    if (items.some((i) => !i.description)) { toast.error("All items need a description."); return; }
    setCreating(true);
    try {
      const res = await api.post("/invoices", {
        customerId: selectedCustomer,
        items,
        tax,
        discount,
        notes,
        status: invoiceStatus,
      });
      const newInvoice = res.data.data;
      setInvoices((prev) => [newInvoice, ...prev]);
      toast.success(`Invoice ${newInvoice.invoiceNumber} created! 🎉`);
      setShowForm(false);
      setItems([emptyItem()]);
      setSelectedCustomer("");
      setInvoiceStatus("Draft");
      setTax(0);
      setDiscount(0);
      setNotes("");
      setPreviewInvoice(newInvoice);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create invoice.");
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (invoiceId: string, newStatus: string) => {
    setUpdatingStatus(invoiceId);
    try {
      await api.put(`/invoices/${invoiceId}/status`, { status: newStatus });
      setInvoices((prev) =>
        prev.map((inv) => inv._id === invoiceId ? { ...inv, status: newStatus } : inv)
      );
      if (previewInvoice?._id === invoiceId) {
        setPreviewInvoice((prev) => prev ? { ...prev, status: newStatus } : prev);
      }
      toast.success(`Status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDownloadPDF = async (inv: Invoice) => {
    toast.loading("Generating PDF...", { id: "pdf" });
    try {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const date = new Date(inv.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      // Header
      doc.setFillColor(203, 166, 247);
      doc.rect(0, 0, 210, 40, "F");
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17, 17, 27);
      doc.text("NexusCRM", 15, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Customer Relationship Management", 15, 26);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 155, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(inv.invoiceNumber, 155, 26);

      // Customer Info
      doc.setTextColor(30, 30, 46);
      doc.setFillColor(24, 24, 37);
      doc.rect(0, 40, 210, 2, "F");
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 130);
      doc.text("BILL TO", 15, 55);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 30, 46);
      doc.setFontSize(12);
      doc.text(inv.customerSnapshot.name, 15, 63);
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 100);
      doc.text(inv.customerSnapshot.email, 15, 70);
      if (inv.customerSnapshot.company) doc.text(inv.customerSnapshot.company, 15, 76);
      if (inv.customerSnapshot.phone) doc.text(inv.customerSnapshot.phone, 15, 82);
      if (inv.customerSnapshot.address) doc.text(inv.customerSnapshot.address, 15, 88);

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 130);
      doc.text("DATE", 140, 55);
      doc.setTextColor(30, 30, 46);
      doc.setFontSize(10);
      doc.text(date, 140, 63);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 130);
      doc.text("STATUS", 140, 73);
      doc.setTextColor(30, 30, 46);
      doc.setFontSize(10);
      doc.text(inv.status, 140, 81);

      // Table header
      let y = 105;
      doc.setFillColor(17, 17, 27);
      doc.rect(10, y - 6, 190, 10, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(203, 166, 247);
      doc.text("DESCRIPTION", 15, y);
      doc.text("QTY", 115, y);
      doc.text("UNIT PRICE", 135, y);
      doc.text("TOTAL", 170, y);
      y += 8;

      // Items
      doc.setFont("helvetica", "normal");
      inv.items.forEach((item, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 30 : 24, idx % 2 === 0 ? 30 : 24, idx % 2 === 0 ? 46 : 37);
        doc.rect(10, y - 5, 190, 9, "F");
        doc.setTextColor(200, 200, 220);
        doc.setFontSize(9);
        doc.text(item.description, 15, y);
        doc.text(item.quantity.toString(), 118, y);
        doc.text(`$${item.unitPrice.toFixed(2)}`, 138, y);
        doc.text(`$${item.total.toFixed(2)}`, 172, y);
        y += 9;
      });

      // Totals
      y += 8;
      doc.setFillColor(24, 24, 37);
      doc.rect(120, y - 5, 80, 9, "F");
      doc.setTextColor(150, 150, 180);
      doc.setFontSize(9);
      doc.text("Subtotal", 125, y);
      doc.text(`$${inv.subtotal.toFixed(2)}`, 172, y);
      y += 9;
      if (inv.tax) {
        doc.rect(120, y - 5, 80, 9, "F");
        doc.text(`Tax (${inv.tax}%)`, 125, y);
        doc.text(`$${(inv.subtotal * inv.tax / 100).toFixed(2)}`, 172, y);
        y += 9;
      }
      if (inv.discount) {
        doc.rect(120, y - 5, 80, 9, "F");
        doc.text(`Discount (${inv.discount}%)`, 125, y);
        doc.text(`-$${(inv.subtotal * inv.discount / 100).toFixed(2)}`, 172, y);
        y += 9;
      }
      doc.setFillColor(203, 166, 247);
      doc.rect(120, y - 5, 80, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17, 17, 27);
      doc.setFontSize(11);
      doc.text("TOTAL", 125, y + 1);
      doc.text(`$${inv.totalAmount.toFixed(2)}`, 172, y + 1);

      // Footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 150);
      doc.text("Thank you for your business! Generated by NexusCRM", 105, 285, { align: "center" });

      doc.save(`${inv.invoiceNumber}.pdf`);
      toast.success("PDF downloaded!", { id: "pdf" });
    } catch {
      toast.error("PDF generation failed.", { id: "pdf" });
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
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Invoices</h1>
          <p style={{ color: "var(--color-subtext0)", fontSize: "0.875rem" }}>{invoices.length} invoice{invoices.length !== 1 ? "s" : ""} generated</p>
        </div>
        <button id="create-invoice-btn" className="btn-primary" onClick={() => setShowForm(true)}>
          🧾 Generate Invoice
        </button>
      </div>

      {/* Invoice List */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id}>
                  <td style={{ fontWeight: 600, color: "var(--color-mauve)" }}>{inv.invoiceNumber}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{inv.customerSnapshot?.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-subtext0)" }}>{inv.customerSnapshot?.company}</div>
                  </td>
                  <td style={{ color: "var(--color-subtext1)" }}>{inv.items?.length} item(s)</td>
                  <td style={{ color: "var(--color-green)", fontWeight: 600 }}>${inv.totalAmount?.toFixed(2)}</td>
                  <td>
                    <CustomSelect
                      value={inv.status}
                      disabled={updatingStatus === inv._id}
                      onChange={(val) => handleStatusChange(inv._id, val)}
                      variant="pill"
                      options={[
                        { value: "Draft",   label: "Draft",   icon: "📝", color: "var(--color-overlay2)", bg: "rgba(166,173,200,0.1)",  border: "rgba(166,173,200,0.2)" },
                        { value: "Sent",    label: "Sent",    icon: "📤", color: "var(--color-blue)",    bg: "rgba(137,180,250,0.12)", border: "rgba(137,180,250,0.25)" },
                        { value: "Paid",    label: "Paid",    icon: "✅",   color: "var(--color-green)",   bg: "rgba(166,227,161,0.15)", border: "rgba(166,227,161,0.3)" },
                        { value: "Overdue", label: "Overdue", icon: "⚠️", color: "var(--color-red)",     bg: "rgba(243,139,168,0.15)", border: "rgba(243,139,168,0.3)" },
                      ]}
                    />
                  </td>
                  <td style={{ color: "var(--color-subtext0)", fontSize: "0.8rem" }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button onClick={() => setPreviewInvoice(inv)} className="btn-secondary" style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }} title="Preview">👁️</button>
                      <button onClick={() => handleDownloadPDF(inv)} className="btn-primary" style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }} title="Download PDF">⬇️ PDF</button>
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "var(--color-subtext0)" }}>No invoices yet. Generate your first one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" style={{ maxWidth: "680px" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem" }}>🧾 Generate New Invoice</h2>

            {/* Customer Select */}
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Select Customer *</label>
              <CustomSelect
                id="invoice-customer"
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                placeholder="-- Choose a customer --"
                options={customers.map((c) => ({
                  value: c._id,
                  label: c.name + (c.company ? ` (${c.company})` : ""),
                  icon: "👤",
                }))}
              />
            </div>

            {/* Line Items */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Line Items *</label>
                <button onClick={addItem} className="btn-secondary" style={{ padding: "0.25rem 0.625rem", fontSize: "0.75rem" }}>+ Add Item</button>
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 36px", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <input className="input-base" placeholder="Description" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} style={{ fontSize: "0.8125rem" }} />
                  <input className="input-base" type="number" placeholder="Qty" min="1" value={item.quantity} onChange={(e) => updateItem(i, "quantity", Number(e.target.value))} style={{ fontSize: "0.8125rem" }} />
                  <input className="input-base" type="number" placeholder="Price" min="0" step="0.01" value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))} style={{ fontSize: "0.8125rem" }} />
                  <button onClick={() => removeItem(i)} style={{ background: "rgba(243,139,168,0.15)", border: "1px solid rgba(243,139,168,0.3)", color: "var(--color-red)", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }} disabled={items.length === 1}>✕</button>
                </div>
              ))}
            </div>

            {/* Tax, Discount & Status */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label className="form-label">Tax (%)</label>
                <input id="invoice-tax" className="input-base" type="number" min="0" max="100" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
              </div>
              <div>
                <label className="form-label">Discount (%)</label>
                <input id="invoice-discount" className="input-base" type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
              </div>
              <div>
                <label className="form-label">Invoice Status</label>
                <CustomSelect
                  id="invoice-status"
                  value={invoiceStatus}
                  onChange={setInvoiceStatus}
                  options={[
                    { value: "Draft",   label: "Draft",   icon: "📝", color: "var(--color-overlay2)", bg: "rgba(166,173,200,0.1)",  border: "rgba(166,173,200,0.2)" },
                    { value: "Sent",    label: "Sent",    icon: "📤", color: "var(--color-blue)",    bg: "rgba(137,180,250,0.12)", border: "rgba(137,180,250,0.25)" },
                    { value: "Paid",    label: "Paid",    icon: "✅",   color: "var(--color-green)",   bg: "rgba(166,227,161,0.15)", border: "rgba(166,227,161,0.3)" },
                    { value: "Overdue", label: "Overdue", icon: "⚠️", color: "var(--color-red)",     bg: "rgba(243,139,168,0.15)", border: "rgba(243,139,168,0.3)" },
                  ]}
                />
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Notes</label>
              <textarea id="invoice-notes" className="input-base" placeholder="Additional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ resize: "vertical" }} />
            </div>

            {/* Summary */}
            <div style={{ background: "var(--color-crust)", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-subtext0)", fontSize: "0.875rem" }}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              {tax > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-subtext0)", fontSize: "0.875rem" }}><span>Tax ({tax}%)</span><span>+${taxAmt.toFixed(2)}</span></div>}
              {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-subtext0)", fontSize: "0.875rem" }}><span>Discount ({discount}%)</span><span>-${discountAmt.toFixed(2)}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-mauve)", borderTop: "1px solid var(--color-surface0)", paddingTop: "0.5rem", marginTop: "0.25rem" }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button id="invoice-create-btn" className="btn-primary" onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "🧾 Create Invoice"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {previewInvoice && (
        <div className="modal-overlay" onClick={() => setPreviewInvoice(null)}>
          <div className="modal-box" style={{ maxWidth: "640px" }} onClick={(e) => e.stopPropagation()}>
            <div ref={printRef}>
              {/* Invoice Header */}
              <div style={{ background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--color-crust)" }}>⚡ NexusCRM</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(17,17,27,0.7)" }}>Customer Relationship Management</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-crust)" }}>INVOICE</div>
                  <div style={{ fontSize: "0.875rem", color: "rgba(17,17,27,0.8)" }}>{previewInvoice.invoiceNumber}</div>
                </div>
              </div>

              {/* Customer + Date */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ background: "var(--color-crust)", borderRadius: "0.625rem", padding: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-subtext0)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>BILL TO</div>
                  <div style={{ fontWeight: 600 }}>{previewInvoice.customerSnapshot?.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-subtext0)" }}>{previewInvoice.customerSnapshot?.email}</div>
                  {previewInvoice.customerSnapshot?.company && <div style={{ fontSize: "0.8rem", color: "var(--color-subtext0)" }}>{previewInvoice.customerSnapshot.company}</div>}
                  {previewInvoice.customerSnapshot?.phone && <div style={{ fontSize: "0.8rem", color: "var(--color-subtext0)" }}>{previewInvoice.customerSnapshot.phone}</div>}
                  {previewInvoice.customerSnapshot?.address && <div style={{ fontSize: "0.8rem", color: "var(--color-subtext0)", marginTop: "0.25rem" }}>{previewInvoice.customerSnapshot.address}</div>}
                </div>
                <div style={{ background: "var(--color-crust)", borderRadius: "0.625rem", padding: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-subtext0)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>INVOICE DETAILS</div>
                  <div style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>Date: <strong>{new Date(previewInvoice.createdAt).toLocaleDateString()}</strong></div>
                  <div style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>Status: <StatusBadge status={previewInvoice.status} /></div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ marginBottom: "1.25rem" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "var(--color-crust)" }}>
                      <th style={{ padding: "0.625rem 0.75rem", textAlign: "left", color: "var(--color-subtext0)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em" }}>DESCRIPTION</th>
                      <th style={{ padding: "0.625rem 0.75rem", textAlign: "center", color: "var(--color-subtext0)", fontWeight: 600, fontSize: "0.75rem" }}>QTY</th>
                      <th style={{ padding: "0.625rem 0.75rem", textAlign: "right", color: "var(--color-subtext0)", fontWeight: 600, fontSize: "0.75rem" }}>UNIT PRICE</th>
                      <th style={{ padding: "0.625rem 0.75rem", textAlign: "right", color: "var(--color-subtext0)", fontWeight: 600, fontSize: "0.75rem" }}>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewInvoice.items.map((item, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--color-surface0)" }}>
                        <td style={{ padding: "0.625rem 0.75rem" }}>{item.description}</td>
                        <td style={{ padding: "0.625rem 0.75rem", textAlign: "center", color: "var(--color-subtext1)" }}>{item.quantity}</td>
                        <td style={{ padding: "0.625rem 0.75rem", textAlign: "right", color: "var(--color-subtext1)" }}>${item.unitPrice.toFixed(2)}</td>
                        <td style={{ padding: "0.625rem 0.75rem", textAlign: "right", fontWeight: 500 }}>${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
                <div style={{ minWidth: "220px", background: "var(--color-crust)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--color-subtext0)" }}><span>Subtotal</span><span>${previewInvoice.subtotal.toFixed(2)}</span></div>
                  {previewInvoice.tax > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--color-subtext0)" }}><span>Tax ({previewInvoice.tax}%)</span><span>+${(previewInvoice.subtotal * previewInvoice.tax / 100).toFixed(2)}</span></div>}
                  {previewInvoice.discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--color-subtext0)" }}><span>Discount ({previewInvoice.discount}%)</span><span>-${(previewInvoice.subtotal * previewInvoice.discount / 100).toFixed(2)}</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-mauve)", borderTop: "1px solid var(--color-surface0)", paddingTop: "0.5rem", marginTop: "0.25rem" }}><span>TOTAL</span><span>${previewInvoice.totalAmount.toFixed(2)}</span></div>
                </div>
              </div>

              <div style={{ textAlign: "center", color: "var(--color-subtext0)", fontSize: "0.8rem", borderTop: "1px solid var(--color-surface0)", paddingTop: "0.75rem" }}>
                Thank you for your business! 🙏 Generated by NexusCRM
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.25rem" }}>
              <button className="btn-secondary" onClick={() => setPreviewInvoice(null)}>Close</button>
              <button id="download-pdf-btn" className="btn-primary" onClick={() => handleDownloadPDF(previewInvoice)}>⬇️ Download PDF</button>
            </div>
          </div>
        </div>
      )}

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
