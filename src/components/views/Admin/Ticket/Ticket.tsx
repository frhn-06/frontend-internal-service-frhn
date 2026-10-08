"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import { Chip } from "@heroui/react";
import { ITicket } from "@/types/ticket";
import { listPriorityTickets, listStatusTickets } from "@/configs/tableConfig";
import useTicket from "./useTicket";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/libs/socket";
import listColumns from "./listColumns";

const Ticket = () => {
  const {
    page,
    limit,
    status,
    priority,

    setUrl,

    dataTickets,
    isLoadingTickets,
    refetchTickets,
    isErrorTickets,
    errorTickets,

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
          queryKey: ["count-notification-messages-by-ticket"]
        })
      })
      socket.on("notification:new", () => {
        queryClient.invalidateQueries({
          queryKey: ["TicketsAgent"]
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
    }
  ) => {
      const value = data[column.id as keyof typeof data];
    
      switch(column.id) {
        case "employeeId" :
          return (data as unknown as ITicket).employee?.name;
        case "agentId" :
          return (data as unknown as ITicket).agent?.name ?? "-";
        case "priority" :
          return <Chip>
            {data?.priority as string}
          </Chip>
        case "status" :
          return <Chip>
            {data?.status as string}
          </Chip>
        default :
          return value as React.ReactNode
    }
  }, [refetchTickets, user?.id])

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

export default Ticket;