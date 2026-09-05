import Category from "@/components/views/Admin/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Categories | Admin",
    template: "%s | Admin",
  },
};

export default function AdminCategoryPage() {
  return (
    <Category /> 
  )
}