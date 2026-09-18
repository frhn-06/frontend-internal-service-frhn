"use client"


import { SessionProvider } from "next-auth/react";


interface TypeProps {
  children: React.ReactNode
}
export default function AuthProvider(props: TypeProps) {
  const {
    children
  } = props;

  console.log("AUTH PROVIDER RENDER");

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}