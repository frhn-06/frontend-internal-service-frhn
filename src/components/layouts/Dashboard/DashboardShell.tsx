"use client"
import { IUser } from "@/types/user"
import Header from "./Header"
import Sidebar from "./Sidebar"
import listSidebar from "@/configs/listSidebar";
import { useState } from "react";
import cn from "@/utils/cn";

interface TypeProps {
  user: IUser;
  children: React.ReactNode
}

const DashboardShell = (props: TypeProps) => {
  const {
    user,
    children
  } = props;

  const [toggleSidebarActive, settoggleSidebarActive] = useState(false);
  
  return (
    <div className="h-screen w-full max-w-[1600px] mx-auto flex ">
      <div 
        className={cn(
          "absolute lg:hidden top-0 w-full bottom-0 bg-black/50 -translate-x-full z-1", toggleSidebarActive && "translate-x-0"
        )}
        onClick={() => settoggleSidebarActive(false)}
      />

      <Sidebar 
        sidebar={
          user.role === "ADMIN" ? listSidebar.admin :
          user.role === "AGENT" ? listSidebar.agent :
          listSidebar.employee
        }
        toggleSidebarActive={toggleSidebarActive}
        setToggleSidebar={settoggleSidebarActive}
      />

      <div className="flex-1 min-h-screen overflow-hidden flex flex-col">
        <Header 
          user={user} 
          setToggleSidebar={settoggleSidebarActive}
          toggleSidebarActive={toggleSidebarActive}
        />

        <div className="overflow-auto h-svh">
          <div className="px-2 py-6 lg:px-6 lg:py-12 min-h-screen">
            {children}
          </div>

          <div className="w-full p-4 bg-gray-200 min-h-12">
            <p className="text-foreground text-sm">
              &copy; 2026 | Internal Service - farhan
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}


export default DashboardShell;