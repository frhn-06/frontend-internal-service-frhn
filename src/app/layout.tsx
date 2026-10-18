import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToasterProvider } from "@/contexts/toasterContext";
import AppShell from "@/components/commons/AppShell/AppShell";
import { ToasterNotificationProvider } from "@/contexts/toasterNotification";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "HelpDesk",
  description: "Internal Service app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  console.log("ROOT LAYOUT");
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col `}>
        <AuthProvider>
          <QueryProvider>
            <ToasterNotificationProvider>
              <ToasterProvider>
                <AppShell>
                  {children}
                </AppShell>
              </ToasterProvider>
            </ToasterNotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
