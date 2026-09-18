"use client"
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
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