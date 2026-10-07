import Profile from "@/components/views/Employee/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Profile | Employee",
    template: "%s | Employee",
  },
};

export default function EmployeeProfilePage() {
  return (
    <Profile />
  )
}