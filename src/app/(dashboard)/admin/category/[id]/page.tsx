import DetailCategory from "@/components/views/Admin/DetailCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Detail Category",
    template: "%s | Category",
  },
};

export default function AdminDetailCategoryPage() {

  return (
    <DetailCategory />
  )
}