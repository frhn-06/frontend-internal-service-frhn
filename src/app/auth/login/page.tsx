import { Metadata } from "next";
import AuthLayout from "../layout";
import Login from "@/components/views/Auth/Login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}