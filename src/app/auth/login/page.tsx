import { Metadata } from "next";
import Login from "@/components/views/Auth/Login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Login />
  )
}