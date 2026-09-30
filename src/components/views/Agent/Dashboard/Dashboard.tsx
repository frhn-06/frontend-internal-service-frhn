"use client"

import openingSay from "@/utils/openingsay";
import useDashboard from "./useDashboard";
import CardStatistics from "./CardStatistics";
import WaitingTickets from "./WaitingTickets";
import ReProgressTickets from "./ReProgressTickets";
import RecentTickets from "./RecentTickets";

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
              Here&apos;s an overview of your department&apos;s support tickets.
            </p>
          </div>

          <CardStatistics 
            statistics={dataDashboard.statistics} 
          />


          <div>
            <div className="grid gap-5 lg:grid-cols-2">
              <WaitingTickets data={dataDashboard.waitingTickets} />

              <ReProgressTickets data={dataDashboard.reProgressTickets} />
            </div>

            <div className="w-full max-w-3xl mt-8">
              <RecentTickets data={dataDashboard.recentTickets} />
            </div>
          </div>
          
        </div>
      )}
    </div>
    
  )
}


export default Dashboard;