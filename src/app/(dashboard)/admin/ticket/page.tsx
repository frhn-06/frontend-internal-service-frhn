import Ticket from "@/components/views/Admin/Ticket";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Ticket | Admin",
    template: "%s | Admin",
  },
};

export default function AdminTicketPage() {
  return (
    <Ticket />
  )
}