"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import listColumns from "./listColumns";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Chip } from "@heroui/react";
import useTicket from "./useMyTicket";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { listPriorityTickets, listStatusTickets } from "@/configs/tableConfig";
import AddMyTicket from "./AddMyTicket";

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

  const renderCell = useCallback((
    data: Record<string, unknown>, 
    column: {
      label: string;
      id: string;
    }) => {

    const value = data[column.id as keyof typeof data];

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
            <ButtonSolid
              as="link"
              href={`/employee/my-ticket/${data.id}`}
              size="sm" 
              className="bg-blue-500 hover:bg-blue-400"
            >
              Detail
            </ButtonSolid>
        
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchTickets])

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

          {isRefetchingTickets && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </div>

  
  )
}

export default MyTicket;