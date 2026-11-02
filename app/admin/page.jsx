import AdminLogin from "./AdminLogin";

export const metadata = { title: "Admin Login | Happy Village Landscaping", robots: { index: false } };

export default function AdminPage() {
  return (
    <div className="admin-login">
      <div className="admin-panel">
        <h1 style={{ fontSize: "1.5rem" }}>Admin Login</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 20px", fontSize: "0.95rem" }}>
          Happy Village Landscaping content management.
        </p>
        <AdminLogin />
      </div>
    </div>
  );
}
