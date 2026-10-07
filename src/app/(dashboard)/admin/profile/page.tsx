import Profile from "@/components/views/Admin/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Profile | Admin",
    template: "%s | Admin",
  },
};

export default function AdminProfilePage() {
  return (
    <Profile />
  )
}