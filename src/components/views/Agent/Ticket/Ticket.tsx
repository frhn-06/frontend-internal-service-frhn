"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Badge, Chip } from "@heroui/react";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { listPriorityTickets, listStatusTickets } from "@/configs/tableConfig";
import listColumns from "./listColumn";
import useTicket from "./useTicket";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import TakeTicket from "./TakeTicket";
import { INotifMessagesByTicket } from "@/types/notification";
import Link from "next/link";

const Ticket = () => {
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
    isSuccessCountNotifMessagesByTicket,

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


  const renderCell = useCallback((
    data: Record<string, unknown>, 
    column: {
      label: string;
      id: string;
    }
  ) => {
      const value = data[column.id as keyof typeof data];

      const notifMessage = dataCountNotifMessagesByTicket?.find(
        (d: INotifMessagesByTicket) =>
          d.ticketId === Number(data.id)
      );

      console.log(user.id)
      
      switch(column.id) {
        case "employeeId" :
          return (data as unknown as ITicket).employee?.name;
        case "agentId" :
          return (data as unknown as ITicket).agent?.name ?? "-";
        case "createdAt" :
          return Convert.dateToLocal(`${data?.createdAt}`)
        case "status" :
          return <Chip>
            {data?.status as string}
          </Chip>
        case "actions" :
          return (
            <div className="flex gap-2">
              {user?.id && (
                !(data as unknown as ITicket).agent ? (
                  <TakeTicket 
                    data={data}
                    refetch={refetchTickets}
                    Button={(
                      <ButtonSolid size="sm">
                        Take
                      </ButtonSolid>
                    )}
                  />
                ) : (data as unknown as ITicket).agent?.id != Number(user?.id) ? (
                  <ButtonSolid size="sm" isDisabled>
                    Taked
                  </ButtonSolid>
                ) : (data as unknown as ITicket).agent?.id == Number(user?.id) && (
                  <Badge.Anchor>
                    <Link 
                      href={`/agent/ticket/${data.id}`}
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
                )
              )}
            </div>
          )
        default :
          return value as React.ReactNode
    }
  }, [refetchTickets, user?.id, isSuccessCountNotifMessagesByTicket])

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
            columns={listColumns}

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

          {isRefetchingTickets && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </div>

  
  )
}

export default Ticket;