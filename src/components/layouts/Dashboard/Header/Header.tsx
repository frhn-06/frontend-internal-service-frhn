"use client"
import { usePathname } from "next/navigation"
import ToggleSidebarDekstop from "@/components/ui/ToggleSidebarDekstop";
import { IUser } from "@/types/user";
import { MessageCircle, SquareMenu } from "lucide-react";
import headerDashboardConfig from "@/configs/headerDashboardConfig";
import { SetStateAction, useEffect } from "react";
import useHeader from "./useHeader";
import NotificationsUi from "@/components/ui/NotificationsUi";
import { Badge } from "@heroui/react";


interface TypeProps {
  user: IUser;
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>;
  toggleSidebarActive: boolean
}

const Header = (props: TypeProps) => {
  const {
    user,
    setToggleSidebar,
    toggleSidebarActive
  } = props;

  const {
    dataNotifications,
    refetchDataNotifications,

    dataCountNotifications,
    refetchCountNotifications,

    dataCountNotifMessages,
    refetchCountNotifMessages,

    onReadNotification,
    isSuccessReadNotification
  } = useHeader();
  
  const route = usePathname();

  const header = headerDashboardConfig[route as keyof typeof headerDashboardConfig];

  useEffect(() => {
    if(isSuccessReadNotification) {
      refetchDataNotifications();
      refetchCountNotifications();
    }
  },[isSuccessReadNotification])
  

  return (
    <div className="border-b-2 border-b-gray-400/30 relative">
      <ToggleSidebarDekstop 
        onClick={() => setToggleSidebar(!toggleSidebarActive)} 
        sidebarActive={toggleSidebarActive}
        className="z-10"
      />

      <div className="p-2 lg:px-8 lg:py-2 flex items-center min-h-20 justify-between gap-2">

        <div className="flex gap-2 items-center">
          <SquareMenu 
            className="lg:hidden w-10 h-10 text-text-element" 
            onClick={() => setToggleSidebar(!toggleSidebarActive)}
          />
          <div>
            <h1 className="text-xl lg:text-2xl text-foreground font-bold">
              {header?.title ?? "Internal Service"}
            </h1>
            <p className="text-sm lg:text-base text-text-abu font-medium">
              {header?.description ?? "Internal service application"}
            </p>
          </div>
        </div>

        <div className="text-sm lg:text-base flex gap-2 items-center">
          <h1 className="font-bold text-foreground">
            {user.role}
          </h1>
          
          <NotificationsUi 
            dataCount={dataCountNotifications} 
            data={dataNotifications} 
            onRead={onReadNotification}  
          />

          <Badge.Anchor>
            <MessageCircle />
            {dataCountNotifMessages > 0 && (
              <Badge color="danger" size="sm">
                {dataCountNotifMessages}
              </Badge>
            )}
          </Badge.Anchor>
        </div>
      </div>
    </div>
  )
}

export default Header