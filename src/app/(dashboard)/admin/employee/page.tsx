import Employee from "@/components/views/Admin/Employee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Employees | Admin",
    template: "%s | Admin",
  },
};

export default function AdminEmployeePage() {
  return (
    <Employee /> 
  )
}