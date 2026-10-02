"use client"
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: false,
    }
  }
});


interface TypeProps {
  children: React.ReactNode
}
export default function QueryProvider(props: TypeProps) {
  const {
    children
  } = props;

  console.log("QUERY PROVIDER RENDER");

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}