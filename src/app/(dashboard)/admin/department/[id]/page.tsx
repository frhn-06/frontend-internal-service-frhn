import DetailDepartment from "@/components/views/Admin/DetailDepartment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Detail Department",
    template: "%s | Department",
  },
};

export default function AdminDetailDepartmentPage() {

  return (
    <DetailDepartment />
  )
}