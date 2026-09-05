import Department from "@/components/views/Admin/Department";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Departments | Admin",
    template: "%s | Admin",
  },
};

export default function AdminDepartmentPage() {
  return (
    <Department /> 
  )
}