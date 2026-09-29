"use client"

import openingSay from "@/utils/openingsay";
import useDashboard from "./useDashboard";
import { Clock, MoveRight, Ticket } from "lucide-react";
import CardStatistics from "./CardStatistics";
import Link from "next/link";
import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { Chip } from "@heroui/react";
import DataTickets from "./DataTickets";

const Dashboard = () => {
  const {
    dataDashboard,
    isLoadingDashboard,
    isSuccessDashboard,
    isErrorDashboard,
    errorDashboard,

    dataUser,
    isLoadingUser,
    isSuccessUser,
    isErrorUser,
    errorUser
  } = useDashboard();


  const isLoadingFetch = isLoadingUser || isLoadingDashboard;
  const isSuccessFetch = isSuccessUser || isSuccessDashboard;


  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorDashboard ? (
        <div>
          {errorDashboard?.message}
        </div>
      ) : isErrorUser ? (
        <div>
          {errorUser?.message}
        </div>
      ) : isLoadingFetch ? (
        <div className="flex justify-center items-center">
          <p>
            memuat...
          </p>
        </div>
      ) : isSuccessFetch && (
        <div className="min-h-60">
          <div className="mb-8">
            <h1 className="text-2xl text-foreground font-semibold">
              {openingSay()}, {dataUser.name}              
            </h1>
            <p className="text-foreground">
              Here&apos;s an overview of your support tickets.
            </p>
          </div>

          <CardStatistics 
            statistics={dataDashboard.statistics} 
          />

          <DataTickets
            recentTickets={dataDashboard.recentTickets}
            waitingTickets={dataDashboard.waitingTickets}
          />
          
        </div>
      )}
    </div>
    
  )
}


export default Dashboard;