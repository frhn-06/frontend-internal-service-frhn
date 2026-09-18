import { INotification } from "@/types/notification";
import cn from "@/utils/cn";
import setTimeMessage from "@/utils/timemessage";
import { Badge, Popover } from "@heroui/react"
import { Bell, CircleCheck, CircleCheckBig, CircleX, Clock3, Hand, LoaderCircle, MessageCircle, RotateCcw, TicketPlus } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

interface TypeProps {
  dataCount: number;
  data: INotification[];

  onRead: (id: string) => void;
}
const NotificationsUi = (props: TypeProps) => {
  const {
    dataCount,
    data,

    onRead,
  } = props;



  const [isOpen, setOpen] = useState(false)

  const handleClickNotif = (id: string) => {
    setOpen(false)
    onRead(id);
  }

  

  const renderIcon= (type: string) => {
    switch(type) {
      case "MESSAGE_RECEIVED" :
        return <MessageCircle className="w-full" />
      case "TICKET_CREATED" :
        return <TicketPlus className="w-full" />
      case "TICKET_TAKEN" :
        return <Hand className="w-full" />
      case "TICKET_WAITING" :
        return <Clock3 className="w-full" />
      case "TICKET_IN_PROGRESS" :
        return <LoaderCircle className="w-full" />
      case "TICKET_RESOLVED" :
        return <CircleCheck className="w-full" />
      case "TICKET_REOPENED" :
        return <RotateCcw className="w-full" />
      case "TICKET_CLOSED" :
        return <CircleCheckBig className="w-full" />
      case "TICKET_CANCELLED" :
        return <CircleX className="w-full" />
    }
  }


  const handleHrefTarget = (role: string) => {
    switch(role) {
      case "EMPLOYEE" :
        return "/employee/my-ticket";
      case "AGENT" :
        return "/agent/ticket";
    }
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <Popover.Trigger aria-label="notification-all" className="flex justify-center items-center">
        <Badge.Anchor>
          <Bell />
          {dataCount > 0 && (
            <Badge color="danger" size="sm">
              {dataCount}
            </Badge>
          )}
        </Badge.Anchor>
      </Popover.Trigger>


      <Popover.Content className="max-w-64">
        <Popover.Dialog className="p-2 flex flex-col gap-2">
          {data?.map((d : INotification) => (
            <Link 
              href={`${handleHrefTarget(`${d.target?.role}`)}/${d.ticketId}`} 
              className={cn("flex gap-1 p-2 rounded-xl active:bg-default-100", {
                "bg-green-100 active:bg-green-200" : !d.isRead
                }
              )} 
              key={d.id}
              onClick={() => handleClickNotif(`${d.id}`)}
            >
              <div className="w-8">
                {renderIcon(`${d.type}`)}
              </div>

              <div>
                <h1 className="text-foreground font-semibold">
                  {d.title}
                </h1>
                <p>
                  {d.message}
                </p>
                <p className="text-text-abu text-xs">
                  {setTimeMessage(`${d.createdAt}`)}
                </p>
              </div>
            </Link>
          ))}
          
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}


export default NotificationsUi