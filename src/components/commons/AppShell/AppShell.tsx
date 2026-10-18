"use client";

import NotificationToaster from "@/components/ui/Toaster/NotificationToaster";
import SmallToaster from "@/components/ui/Toaster/SmallToaster/SmallToaster";
import { useToaster } from "@/contexts/toasterContext";
import { useToasterNotification } from "@/contexts/toasterNotification";
import { useEffect } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {

  const {toaster, setToaster} = useToaster();

  const {toasterNotification, setToasterNotification} = useToasterNotification();


  useEffect(() => {
    if(!toaster?.type) return;

    const timeOut = setTimeout(() => {
      setToaster({
        type: "",
        message: ""
      })
    },1400);

    return () => clearTimeout(timeOut);

  }, [toaster])


  useEffect(() => {
    if(!toasterNotification?.type) return;

    const timeOut = setTimeout(() => {
      setToasterNotification({
        type: "",
        message: ""
      })
    }, 1400)

    return () => clearTimeout(timeOut)
  }, [toasterNotification])

  return (
    <div className="relative">
      {children}

      {toaster?.type && typeof toaster?.type === "string" && (
        <SmallToaster type={toaster.type} message={toaster.message} />
      )}

      <NotificationToaster 
        type={toasterNotification?.type || ""} 
        message={toasterNotification?.message || ""}
        active={Boolean(toasterNotification?.type)}
      />
    </div>
  )
}

export default AppShell;