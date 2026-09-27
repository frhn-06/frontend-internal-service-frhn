import { INotification } from "@/types/notification";
import cn from "@/utils/cn";
import setTimeMessage from "@/utils/timemessage";
import { Badge, Button, Dropdown, Label, Popover } from "@heroui/react"
import { Bell, CircleCheck, CircleCheckBig, CircleX, Clock3, EllipsisVertical, Hand, LoaderCircle, MessageCircle, RotateCcw, TicketPlus, Trash } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import useNotificationsUi from "./useNotificationsUi";

interface TypeProps {
  dataCount: number;
  data: INotification[];

  onRead: (id: string) => void;

  refetch: () => void;

  refetchCount: () => void;
}
const NotificationsUi = (props: TypeProps) => {
  const {
    dataCount,
    data,

    onRead,

    refetch,

    refetchCount
  } = props;


  const {
    onDeleteNotification,
    isSuccessDeleteNotification,
    isPendingDeleteNotification,

    onClearNotifications,
    isSuccessClearNotifications,
    isPendingClearNotifications,

    onMarkAllNotifications,
    isSuccessMarkAllNotifications,
    isPendingMarkAllNotifications
  } = useNotificationsUi();


  useEffect(() => {
    if(isSuccessDeleteNotification || isSuccessMarkAllNotifications || isSuccessClearNotifications) {
      if(isSuccessClearNotifications || isSuccessDeleteNotification) {
        refetchCount();
      }
      refetch();
    }
  }, [isSuccessDeleteNotification, isSuccessClearNotifications, isSuccessMarkAllNotifications])


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


      <Popover.Content className="w-full max-w-84 overflow-y-hidden ">
        <Popover.Dialog>
          <div className="max-h-120 flex flex-col gap-2 overflow-y-scroll">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground text-xl">
                Notifications
              </h3>
              <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                  <EllipsisVertical />                  
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                      id="new-file" 
                      textValue="Tandai Semua"
                      onClick={onMarkAllNotifications}
                      isDisabled={isPendingMarkAllNotifications}
                    >
                      <Label>
                        {isPendingMarkAllNotifications ? "loading..." : "Tandai semua"}
                      </Label>
                    </Dropdown.Item>
                    <Dropdown.Item 
                      id="delete-file" 
                      textValue="Clear Notification" 
                      variant="danger"
                      onClick={onClearNotifications}
                      isDisabled={isPendingClearNotifications}
                    >
                      <Label>
                        {isPendingClearNotifications ? "loading..." : "Clear Notifications"}
                      </Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {data?.map((d : INotification) => (
              <div key={d.id} className="flex gap-2">
                <Link 
                  href={`${handleHrefTarget(`${d.target?.role}`)}/${d.ticketId}`} 
                  className={cn("flex flex-1 gap-1 p-2 rounded-xl active:bg-default-100", {
                    "bg-green-100 active:bg-green-200" : !d.isRead
                    }
                  )} 
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

                <Trash 
                  className="p-1 w-6 h-6 rounded-full hover:cursor-pointer active:bg-gray-200" 
                  onClick={() => {
                    if(isPendingDeleteNotification) return;
                    onDeleteNotification(`${d.id}`)
                  }}
                />

              </div>
            ))}
            
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}


export default NotificationsUi