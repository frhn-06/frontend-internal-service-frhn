import Agent from "@/components/views/Admin/Agent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Agents | Admin",
    template: "%s | Admin",
  },
};

export default function AdminAgentPage() {
  return (
    <Agent /> 
  )
}