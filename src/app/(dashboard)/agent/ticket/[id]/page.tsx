import DetailTicket from "@/components/views/Agent/DetailTicket";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Detail Ticket",
    template: "%s | Ticket",
  },
};

export default function AgentDetailTicketPage() {
  return (
    <DetailTicket /> 
  )
}