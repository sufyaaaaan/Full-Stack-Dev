import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NexusCRM — Customer Relationship Management",
  description:
    "A modern CRM system built with MERN + Next.js for managing customer data, invoices, and business operations.",
  keywords: "CRM, customer management, invoices, business, MERN, Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#1e1e2e",
                color: "#cdd6f4",
                border: "1px solid #313244",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#a6e3a1", secondary: "#1e1e2e" },
              },
              error: {
                iconTheme: { primary: "#f38ba8", secondary: "#1e1e2e" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
