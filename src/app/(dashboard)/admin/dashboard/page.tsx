import Dashboard from "@/components/views/Admin/Dashboard";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Admin",
    template: "%s | Admin",
  },
};


export default function AdminDashboardPage() {
  return (
    <Dashboard />
  )
} 