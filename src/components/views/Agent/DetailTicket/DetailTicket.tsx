"use client"

import { Breadcrumbs, Skeleton } from "@heroui/react";
import useDetailMyTicket from "../../Employee/DetailMyTicket/useDetailMyTicket";
import InfoTicket from "./InfoTicket";
import Link from "next/link";

const DetailTicket = () => {
  const {
    dataDetailTicket,
    isLoadingDetailTicket,
    refetchDetailTicket,
    isErrorDetailTicket,
    errorDetailTicket,
  } = useDetailMyTicket();

  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorDetailTicket ? (
        <div>
          <p>
            {errorDetailTicket?.message}
          </p>
        </div>
      ) : isLoadingDetailTicket ? (
        <div className="p-4">
          <Skeleton className="h-6 mb-6 w-46 rounded-2xl" />
  
          <div className="flex flex-col gap-8">
            <Skeleton className="h-24 rounded-2xl w-full" />
  
            <div className="flex flex-col lg:flex-row gap-8">
              <Skeleton className="h-46 rounded-2xl flex-3" />
  
              <Skeleton className="h-46 rounded-2xl flex-2" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <Breadcrumbs className="mb-6">
            <Breadcrumbs.Item>
              <Link href="/agent/ticket">
                Tickets
              </Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              {dataDetailTicket?.number}
            </Breadcrumbs.Item>
          </Breadcrumbs>
                
          
          <InfoTicket data={dataDetailTicket} refetch={refetchDetailTicket} />
        </div>
  
      )}
    </div>
  )
}

export default DetailTicket;