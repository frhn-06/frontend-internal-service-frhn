import Dashboard from "@/components/views/Employee/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Employee",
    template: "%s | Employee",
  },
};

export default function EmployeeDashboardPage() {
  return (
    <Dashboard />
  )
}