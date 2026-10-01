"use client"

import openingSay from "@/utils/openingsay";
import useDashboard from "./useDashboard";
import CardStatistics from "./CardStatistics";
import RecentTickets from "./RecentTickets";
import WaitingTickets from "./WaitingTickets";
import socket from "@/libs/socket";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();
  
    useEffect(() => {
      const connectSocket = () => {
        socket.on("notification:new", () => {
          queryClient.invalidateQueries({
            queryKey: ["Dashboard-Employee"]
          })
        })
      }
  
      connectSocket();
    },[queryClient])

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


          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentTickets data={dataDashboard.recentTickets} />
            </div>

            
            <WaitingTickets data={dataDashboard.waitingTickets} />
          </div>

        </div>
      )}
    </div>
    
  )
}


export default Dashboard;