import MyTicket from "@/components/views/Employee/MyTicket";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "My Tickets | Employee",
    template: "%s | Employee",
  },
};

export default function EmployeeMyTicketPage() {
  return (
    <MyTicket /> 
  )
}