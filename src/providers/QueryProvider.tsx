"use client"
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";

const queryClient = new QueryClient();


interface TypeProps {
  children: React.ReactNode
}
export default function QueryProvider(props: TypeProps) {
  const {
    children
  } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}