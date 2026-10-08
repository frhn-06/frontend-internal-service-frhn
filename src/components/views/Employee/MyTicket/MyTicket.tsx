"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import listColumns from "./listColumns";
import { Badge, Chip } from "@heroui/react";
import useTicket from "./useMyTicket";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { listPriorityTickets, listStatusTickets } from "@/configs/tableConfig";
import AddMyTicket from "./AddMyTicket";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import { INotifMessagesByTicket } from "@/types/notification";
import Link from "next/link";
import socket from "@/libs/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const MyTicket = () => {
  const {
    page,
    limit,
    status,
    priority,

    setUrl,

    dataTickets,
    isLoadingTickets,
    isRefetchingTickets,
    refetchTickets,
    isErrorTickets,
    errorTickets,

    dataCountNotifMessagesByTicket,

    handlePage,
    handleLimit,
    handleSearch,
    handleClearSearch,
    handleStatus,
    handlePriority
  } = useTicket();

  useEffect(() => {
    setUrl();
  }, []);

  const session = useSession();
  const user = session?.data?.user as IUser;

  const params = useParams();
  const id = params.id;

  const queryClient = useQueryClient();

  useEffect(() => {
    const connectSocket = () => {
      socket.on("all-messages:new", () => {
        queryClient.invalidateQueries({
          queryKey: ["count-notification-messages-by-ticket-employee"]
        })
      })
      socket.on("notification:new", () => {
        queryClient.invalidateQueries({
          queryKey: ["MyTicketsEmployee"]
        })
      })
    }

    connectSocket();

    return () => {
      socket.off("all-messages:new");
    }
  },[queryClient, id])

  const renderCell = useCallback((
    data: Record<string, unknown>, 
    column: {
      label: string;
      id: string;
    }) => {

    const value = data[column.id as keyof typeof data];

    const notifMessage = dataCountNotifMessagesByTicket?.find(
      (d: INotifMessagesByTicket) =>
        d.ticketId === Number(data.id)
    );
    
    console.log(user?.id)

    switch(column.id) {
      case "departmentId" :
        return (data as unknown as ITicket).department?.name;
      case "createdAt" :
        return Convert.dateToLocal(`${data?.createdAt}`)
      case "status" :
        return <Chip>
          {data?.status as string}
        </Chip>
      case "actions" :
        return (
          <div className="flex gap-2">
            <Badge.Anchor>
              <Link 
                href={`/employee/my-ticket/${data.id}`}
                className="bg-blue-500 hover:bg-blue-400 px-4 py-1 rounded-2xl text-white"
              >
                Detail
              </Link>
            
              {notifMessage && (
                <Badge color="danger" size="sm">
                  {notifMessage._count._all}
                </Badge>
              )} 
            </Badge.Anchor>
        
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchTickets, user?.id, dataCountNotifMessagesByTicket])

  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorTickets ? (
        <div>
          {errorTickets?.message}
        </div>
      ) : (
        <div className="relative min-h-10">
          <TableUi 
            renderCell={renderCell}
            data={dataTickets?.data}
            totalData={dataTickets?.pagination?.total}
            columns={listColumns}

            isKeterangan

            textEmpty="daftar ticket kosong"

            isCreate
            contentCreate={(
              <AddMyTicket refetch={refetchTickets} />
            )}

            isSearch
            textSearch="Cari Ticket"
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}

            isLimit
            handleLimit={handleLimit}
            currentLimit={`${limit}`}

            isStatus
            onChangeStatus={handleStatus}
            currentStatus={`${status || "all"}`}
            listStatus={listStatusTickets}

            isPriority
            onChangePriority={handlePriority}
            currentPriority={`${priority}` || "all"}
            listPriority={listPriorityTickets}

            isPagination
            currentPage={Number(page)}
            handlePagination={handlePage}
            totalPage={dataTickets?.pagination?.totalPage}
          /> 

          {isLoadingTickets && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </div>

  
  )
}

export default MyTicket;