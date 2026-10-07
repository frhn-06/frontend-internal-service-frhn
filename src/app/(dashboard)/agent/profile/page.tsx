import Profile from "@/components/views/Agent/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Profile | Agent",
    template: "%s | Agent",
  },
};

export default function AgentProfilePage() {
  return (
    <Profile /> 
  )
}