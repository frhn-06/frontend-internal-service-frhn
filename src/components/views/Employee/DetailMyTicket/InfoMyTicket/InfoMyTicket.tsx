"use client";

import { selectStatusTicket } from "@/configs/inputFormConfig";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { Badge, Card, Chip, Label, ListBox, Select} from "@heroui/react";
import useInfoMyTicket from "./useInfoMyTicket";
import { INotifMessagesByTicket } from "@/types/notification";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/libs/socket";

interface TypeProps {
  data: ITicket;
}


const InfoMyTicket = (props: TypeProps) => {
  const {
    data,
  } = props;

  const {
    isPendingChangeStatusReProgress,

    isPendingChangeStatusClose,

    isPendingChangeStatusCancel,

    onReProgress,
    onClose,
    onCancel,

    dataCountNotifMessagesByTicket,
  } = useInfoMyTicket(`${data?.id}`);


  const handleChangeStatus = (key:string) => {
    switch(key) {
      case "RE_PROGRESS" :
        onReProgress();
        break;
      case "CLOSED" :
        onClose();
        break;
      case "CANCELLED" :
        onCancel();
        break;
    }
  }

  const isPending = isPendingChangeStatusCancel || isPendingChangeStatusClose || isPendingChangeStatusReProgress

  const notifMessages = dataCountNotifMessagesByTicket?.find((notif: INotifMessagesByTicket) => notif.ticketId === Number(data.id));



  const params = useParams();
  const id = params.id;
  const queryClient = useQueryClient();
              
  useEffect(() => {
    if(!data?.id) return;

    const conncetSocket = () => {
      socket.on("ticket-status:change", () => {
        queryClient.invalidateQueries({
          queryKey: ["DetailTicketEmployee", id]
        })
      });

      socket.on("message:new", () => {
        queryClient.invalidateQueries({
          queryKey: ["count-notification-messages-by-ticket-employee-in-detail"]
        })
      })
          
      if(socket.connected) {
        socket.emit(`ticket:join`, data.id);
        console.log("socket join to ticket:", data.id)
      }
    }
          
    conncetSocket();
          
    return () => {
      socket.off("ticket-status:change");
      socket.off("message:new");
    }
  },[data?.id, id, queryClient])


  return (
    <div className="flex flex-col gap-8">

      {/* ticket Header */}
      <Card className="w-full shadow-xl">
        <Card.Content className="p-2">
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div>
              <h1 className="font-bold text-foreground text-xl">
                {data?.title}
              </h1>
              <p className="text-foreground">
                {data?.number}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Chip
                  size="lg"
                  className="bg-background-element text-white"
                >
                  {data?.status}
                </Chip>

                <Select 
                  className="w-[256px]" 
                  placeholder="Select one"
                  value={data.status}
                  isDisabled={isPending}
                  onChange={(value) => {
                    if(value) handleChangeStatus(`${value}`)}
                  }
                  disabledKeys={selectStatusTicket.filter((status) => {
                    return status.type !== "employee"
                  }).map(status => status.id)}
                >
                  <Label>
                    {isPending ? "Loading..." : "Change Status"}
                  </Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {selectStatusTicket.map((status) => (
                        <ListBox.Item key={status.id} id={status.id} textValue={status.label}>
                          {status.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>             
              </div>

              <Badge.Anchor className="w-fit">
                <Link 
                  href={`/employee/my-ticket/${data.id}/message`}
                  className="bg-background-element hover:bg-background-element-hover px-4 py-1 rounded-2xl text-white"
                >
                  Message
                </Link>
                {notifMessages && (
                  <Badge color="danger" size="sm">
                    {notifMessages?._count._all}
                  </Badge>
                )}
              </Badge.Anchor>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* ticket Info */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="shadow-xl flex-3 h-fit">
          <Card.Header className="p-2">
            <h1 className="text-foreground text-xl font-semibold">
              Ticket Information
            </h1>
          </Card.Header>
          <Card.Content className="p-2">
            <div className="flex flex-col gap-2 justify-between">
              <div>
                <h1 className="text-text-abu font-semibold">
                  Description
                </h1>
                <p>
                  {data?.description}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Department
                </h1>
                <p>
                  {data?.department?.name}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Category
                </h1>
                <p>
                  {data?.category?.name}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Ticket Status */}
        <Card className="shadow-xl flex-2 h-fit">
          <Card.Header className="p-2">
            <h1 className="text-foreground text-xl font-semibold">
              Ticket Status
            </h1>
          </Card.Header>
          <Card.Content className="p-2">
            <div className="flex flex-col gap-2 justify-between">
              <div>
                <Chip
                  size="lg"
                  color="success"
                >
                  {data?.status}
                </Chip>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Agent
                </h1>
                <p>
                  {data?.agent?.name ?? "-"}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Priority
                </h1>
                <p>
                  {data?.priority}
                </p>
              </div>

              <div>
                <h1 className="text-text-abu font-semibold">
                  Created
                </h1>
                <p>
                  {Convert.dateToLocal(`${data?.createdAt}`)}
                </p>
              </div>
            
              {data?.assignedAt && (
                <div>
                  <h1 className="text-text-abu font-semibold">
                    Assigned
                  </h1>
                  <p>
                    {Convert.dateToLocal(`${data?.assignedAt}`)}
                  </p>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default InfoMyTicket;

