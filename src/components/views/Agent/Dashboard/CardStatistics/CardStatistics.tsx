import { IStatisticsAgent } from "@/types/dashboard";
import { BriefcaseBusiness, CircleCheck, Clock3, Inbox, RotateCcw, Tickets } from "lucide-react";
import CountUp from "react-countup";

interface TypeProps {
  statistics: IStatisticsAgent;
}

const CardStatistics = (props: TypeProps) => {
  const {
    statistics
  } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <Tickets className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-green-500">
            Total
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.totalTickets}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Semua ticket aktif di department
        </p>
      </div>



      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <Inbox className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-amber-500">
            Open
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.ticketsOpen}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Belum diambil agent
        </p>
      </div>



      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <BriefcaseBusiness className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-blue-500">
            My tickets
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.myTickets}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Ticket aktif kamu
        </p>
      </div>



      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <Clock3 className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-orange-500">
            Waiting
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.ticketsWaiting}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Menunggu respons employee
        </p>
      </div>



      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <RotateCcw  className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-violet-500">
            Re progress
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.ticketsReprogress}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Perlu ditangani lagi
        </p>
      </div>



      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-[#c9ffcc] hover:border-green-400">
        <div className="flex justify-between">
          <CircleCheck  className="h-6 w-6 text-foreground" />
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          <CountUp
            end={statistics.ticketsResolved}
            duration={0.8}
          />
        </p>

        <p className="text-sm font-semibold text-text-element">
          Ticket selesai
        </p>
      </div>

    </div>
  )
}

export default CardStatistics;