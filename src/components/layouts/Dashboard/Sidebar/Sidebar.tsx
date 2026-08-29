"use client";

import Link from "next/link";
import cn from "@/utils/cn";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SetStateAction } from "react";

interface TypeProps {
  sidebar: Record<string, string | React.ReactNode>[];
  toggleSidebarActive: boolean;
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>
}

const Sidebar = (props: TypeProps) => {
  const {
    sidebar,
    toggleSidebarActive,
    setToggleSidebar
  } = props;

  const route = usePathname();




  return (
    <div>
      <div className={cn("hidden lg:flex bg-green-50 w-65 h-screen overflow-y-auto border-r-2 border-r-gray-400/30 flex-col transition-all duration-300", toggleSidebarActive && "w-12")}>
        <div className="min-h-20 p-1">
          <div className="h-full w-full">
            
          </div>
        </div>

        <div className={cn("hidden lg:block p-2 transition-all duration-300", toggleSidebarActive && "lg:hidden")}>
          <h1 className="text-foreground font-semibold text-xl">
            Internal Service
          </h1>
        </div>

        <div className="flex flex-col">
          {sidebar.map((nav) => (
            <div key={`${nav.id}`} className={cn(route === nav.href && "text-white")}>
              <Link href={`${nav.href}`} className={cn(
                "flex items-center gap-2 px-2 py-2", 
                route === nav.href && "bg-background-element",
                route !== nav.href && "hover:bg-background-element-flat"
              )}>
                <span className="shrink-0">
                  {nav.icon}
                </span>
                <span className={cn("transition-all duration-300 whitespace-nowrap" ,toggleSidebarActive && "-translate-x-4 opacity-0")}>
                  {nav.label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>









      <div className={cn(
        "fixed flex -translate-x-full bg-green-50 w-65 h-screen overflow-y-auto border-r-2 border-r-gray-400/30 flex-col transition-all duration-300 gap-4 z-2",
        toggleSidebarActive && "translate-x-0"
      )}>
        <div className="flex justify-between p-2">
          <div className="w-1/2">
            
          </div>
          <X 
            className="h-10 w-10 text-text-element rounded-full active:bg-black" 
            onClick={() => setToggleSidebar(false)}
          />
        </div>

        <div className="flex flex-col">
          {sidebar.map((nav) => (
            <Link 
              key={`${nav.id}`} 
              href={`${nav.href}`} 
              className={cn(
                "text-lg text-text-element px-2 py-1", 
                route.startsWith(`${nav.href}`) && "bg-background-element text-white",
                !route.startsWith(`${nav.href}`) && "active:bg-background-element active:text-white"
              )}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;