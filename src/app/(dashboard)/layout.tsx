import { auth } from "@/auth";
import { IUser } from "@/types/user";
import DashboardShell from "@/components/layouts/Dashboard/DashboardShell";


interface TypeProps {
    children: React.ReactNode;
}

export default async function DashboardLayout(props: TypeProps) {
  const { children } = props;

  const session = await auth();

  const user = session?.user as unknown as IUser;

console.log("DASHBOARD LAYOUT");

  return (
    <>
      <DashboardShell user={user}>
        {children}
      </DashboardShell>
    </>
  )
}
