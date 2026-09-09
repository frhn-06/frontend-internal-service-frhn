import Message from "@/components/views/Employee/Message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Message | Employe",
    template: "%s | Employe",
  },
};

export default function EmployeeMessagePage() {
  return (
    <Message />
  )
}