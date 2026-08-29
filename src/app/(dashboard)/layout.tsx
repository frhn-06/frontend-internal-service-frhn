import { Metadata } from "next";
import { auth } from "@/auth";
import { IUser } from "@/types/user";
import DashboardShell from "@/components/layouts/Dashboard/DashboardShell";

export const metadata : Metadata = {
  title: {
    default : "Admin" ,
    template: "%s | Admin"
  }
}


interface TypeProps {
    children: React.ReactNode;
}

export default async function DashboardLayout(props: TypeProps) {
  const { children } = props;

  const session = await auth();

  const user = session?.user as unknown as IUser;



  return (
    <>
      <DashboardShell user={user}>
        {children}
      </DashboardShell>
    </>
  )
}
