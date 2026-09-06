import Ticket from "@/components/views/Agent/Ticket";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tickets | Agent",
    template: "%s | Agent",
  },
};

export default function AgentTicketPage() {
  return (
    <Ticket /> 
  )
}