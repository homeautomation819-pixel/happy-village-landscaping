import { redirect } from "next/navigation";
import { isAuthed } from "../../../lib/auth";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Admin Dashboard | Happy Village Landscaping", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isAuthed())) redirect("/admin");
  return <AdminDashboard />;
}
