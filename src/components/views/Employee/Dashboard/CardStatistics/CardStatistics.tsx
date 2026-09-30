import { IStatisticsEmployee } from "@/types/dashboard";
import { CircleCheck, Clock3, LoaderCircle, Ticket, TicketPlus } from "lucide-react";

interface TypeProps {
  statistics: IStatisticsEmployee;
}

const CardStatistics = (props: TypeProps) => {
  const {
    statistics
  } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-50 rounded-2xl border-2 border-text-element p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex justify-between">
          <Ticket className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-green-500">
            Total
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          {statistics.totalTickets}
        </p>

        <p className="text-sm lg:text-base font-semibold text-foreground">
          Semua ticket kamu
        </p>
      </div>



      <div className="bg-green-50 rounded-2xl border-2 border-text-element p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex justify-between">
          <TicketPlus className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-amber-500">
            Open
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          {statistics.ticketsOpen}
        </p>

        <p className="text-sm lg:text-base font-semibold text-foreground">
          Menunggu agent
        </p>
      </div>



      <div className="bg-green-50 rounded-2xl border-2 border-text-element p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex justify-between">
          <LoaderCircle className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-blue-500">
            Progress
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          {statistics.ticketsInprogress}
        </p>

        <p className="text-sm lg:text-base font-semibold text-foreground">
          Sedang ditangani
        </p>
      </div>



      <div className="bg-green-50 rounded-2xl border-2 border-text-element p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex justify-between">
          <Clock3 className="h-6 w-6 text-foreground" />

          <span className="text-xs font-medium text-white px-2 py-[3px] rounded-lg bg-orange-500">
            Waiting
          </span>
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          {statistics.ticketsInprogress}
        </p>

        <p className="text-sm lg:text-base font-semibold text-foreground">
          Menunggu respons kamu
        </p>
      </div>



      <div className="bg-green-50 rounded-2xl border-2 border-text-element p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex justify-between">
          <CircleCheck  className="h-6 w-6 text-foreground" />
        </div>

        <p className="mt-5 text-xl lg:text-2xl font-bold tracking-tight"> 
          {statistics.ticketsInprogress}
        </p>

        <p className="text-sm lg:text-base font-semibold text-foreground">
          Ticket selesai
        </p>
      </div>

    </div>
  )
}

export default CardStatistics;