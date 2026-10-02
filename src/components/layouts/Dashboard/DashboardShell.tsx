"use client"
import { IUser } from "@/types/user"
import Header from "./Header"
import Sidebar from "./Sidebar"
import listSidebar from "@/configs/listSidebar";
import { useEffect, useState } from "react";
import cn from "@/utils/cn";
import { CustomSession } from "@/libs/axios";
import { getSession } from "next-auth/react";
import socket from "@/libs/socket";
import useDashboard from "./useDashboard";
import { useQueryClient } from "@tanstack/react-query";

interface TypeProps {
  user: IUser;
  children: React.ReactNode
}

const DashboardShell = (props: TypeProps) => {
  const {
    user,
    children
  } = props;

  const {
    dataNotifications,
    refetchDataNotifications,
  
    dataCountNotifications,
    refetchCountNotifications,

    onReadNotification,
    isSuccessReadNotification
  } = useDashboard();

  const [toggleSidebarActive, settoggleSidebarActive] = useState(false);

  const queryClient = useQueryClient();
  
  useEffect(() => {
    const connectSocket = async () => {
      const session : CustomSession | null = await getSession();
      if(!session || !session.accessToken) return;

      socket.auth = {
        token: session.accessToken
      }

      socket.on("connect", () => console.log("socket connect on:", socket.id));

      socket.on("notification:new", () => {
        queryClient.invalidateQueries({
          queryKey: ["list-notifications"]
        })
        queryClient.invalidateQueries({
          queryKey: ["count-notifications"]
        })
      });

      socket.connect();
    }
    
    connectSocket();

    return () => {
      socket.off("connect");
      socket.off("notification:new");
      socket.disconnect();
    }
  }, [queryClient])



  
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
          user?.role === "ADMIN" ? listSidebar.admin :
          user?.role === "AGENT" ? listSidebar.agent :
          listSidebar.employee
        }
        toggleSidebarActive={toggleSidebarActive}
        setToggleSidebar={settoggleSidebarActive}
      />

      <div className="flex-1 min-h-screen flex flex-col">
        <Header 
          user={user} 
          setToggleSidebar={settoggleSidebarActive}
          toggleSidebarActive={toggleSidebarActive}

          notifications={dataNotifications}
          refetchNotifications={refetchDataNotifications}

          countNotifications={dataCountNotifications}
          refetchCountNotifications={refetchCountNotifications}

          onReadNotification={onReadNotification}
          isSuccessReadNotification={isSuccessReadNotification}
        />

        <div className="overflow-hidden flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}


export default DashboardShell;