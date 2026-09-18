"use client";

import SmallToaster from "@/components/ui/Toaster/SmallToaster/SmallToaster";
import { useToaster } from "@/contexts/toasterContext";
import { useEffect } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {

  const {toaster, setToaster} = useToaster();


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

  return (
    <div className="relative">
      {children}

      {toaster?.type && typeof toaster?.type === "string" && (
        <SmallToaster type={toaster.type} message={toaster.message} />
      )}
    </div>
  )
}

export default AppShell;