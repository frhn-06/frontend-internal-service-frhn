import DetailMyTicket from "@/components/views/Employee/DetailMyTicket";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Detail My Ticket",
    template: "%s | My Ticket",
  },
};

export default function EmployeeDetailMyTicketPage() {
  return (
    <DetailMyTicket /> 
  )
}