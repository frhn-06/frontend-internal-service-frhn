import Message from "@/components/views/Agent/Message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Message | Agent",
    template: "%s | Agent",
  },
};

export default function AgentMessagePage() {
  return (
    <Message />
  )
}