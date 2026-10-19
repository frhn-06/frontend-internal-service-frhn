import cn from "@/utils/cn";
import { BellRing, MessageCircle } from "lucide-react";

interface TypeProps {
  type: string;
  description: string;
  active?: boolean;
  title: string; 
}
const NotificationToaster = (props: TypeProps) => {
  const {
    type = "notification",
    title,
    description = "ada notifikasi terbaru masuk",
    active
  } = props
  

  return (
    <div className={cn("fixed top-0 right-1/2 translate-x-1/2 w-full max-w-sm  z-50 min-h-24 p-2 transition-all duration-200", {
      "-translate-y-full" : !active,
      "translate-y-0" : active
    })}>
      <div className="w-full h-full bg-white shadow-lg border border-gray-300 rounded-2xl p-2 flex gap-4 items-center">
        <div className="p-2 rounded-xl bg-background-element-flat">
          {type === "notification" ? (
            <BellRing className="text-text-element" />
          ) : (
            <MessageCircle className="text-text-element" />
          )}
        </div>
        <div>
          <p className="text-sm lg:text-base font-medium text-text-abu line-clamp-1">
            {title}
          </p>
          <p className="text-sm lg:text-base font-medium text-foreground line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationToaster;