import cn from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'

interface TypeProps {
  nameApp: string;
}
const Navbar = (props: TypeProps) => {

  const {
    nameApp
  } = props;

  const [isScrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const patokan = window.scrollY;
      if(patokan > 20) {
        setScrollActive(true);
      } else {
        setScrollActive(false);
      }
    })

    return () => {
      window.removeEventListener("scroll", () => {})
    }
  },[])
  
  return (
    <div>
      <div className="w-full min-h-18 max-h-24 py-4 px-4 bg-blue-50/50">
        <div className={cn("w-full h-full max-w-6xl mx-auto justify-between", {"flex" : !isScrollActive, "hidden" : isScrollActive})}>
          <div className="flex gap-4">
            <div className="w-16 p-1">
              <Image src={'/images/logo/logo-app-2.png'} alt="logo-app" width={480} height={480} className="w-full" />
            </div>

            <div className="h-full flex flex-col justify-center">
              <h1 className="font-bold text-xl text-text-element">
                {nameApp}
              </h1>
              <p className="text-text-abu">
                internal service
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Link href={'/auth/login'} className="px-4 py-1 rounded-lg bg-background-element text-white hover:bg-background-element-hover active:bg-background-element">
              Login
            </Link>
          </div>
        </div>
      </div>


      <div className={cn("fixed min-h-18 max-h-24 w-full py-2 px-2 bg-background-element top-0 transition-all duration-200", {"opacity-0 -translate-y-full" : !isScrollActive, "opacity-100 translate-y-0" : isScrollActive})}>
        <div className="w-full h-full max-w-7xl mx-auto flex justify-between">
          <div className="flex gap-4">
            <div className="w-16 p-1">
              <Image src={'/images/logo/logo-app-2.png'} alt="logo-app" width={480} height={480} className="w-full" />
            </div>

            <div className="h-full flex flex-col justify-center">
              <h1 className="font-bold text-xl text-white">
                {nameApp}
              </h1>
              <p className="text-gray-200">
                Internal service
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Link href={'/auth/login'} className="px-4 py-1 rounded-lg font-medium bg-white text-text-element hover:bg-gray-200 active:bg-white">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;