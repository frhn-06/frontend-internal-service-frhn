import { Metadata } from "next";
import AuthLayout from "../layout";
import Register from "@/components/views/Auth/Register/Register";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  )
}