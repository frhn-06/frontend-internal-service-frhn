import DetailAgent from "@/components/views/Admin/DetailAgent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Detail Agent",
    template: "%s | Agent",
  },
};

export default function AdminDetailAgentPage() {

  return (
    <DetailAgent />
  )
}