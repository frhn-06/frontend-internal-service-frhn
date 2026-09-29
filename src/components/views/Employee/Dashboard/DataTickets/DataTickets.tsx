import { ITicket } from "@/types/ticket"
import Convert from "@/utils/convert.";
import { Chip } from "@heroui/react";
import { Clock } from "lucide-react";
import Link from "next/link";

interface TypeProps {
  recentTickets: ITicket[];
  waitingTickets: ITicket[];
}

const DataTickets = (props: TypeProps) => {
  const {
    recentTickets,
    waitingTickets
  } = props;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-2xl border-2 border-text-element min-h-20 p-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg lg:text-xl font-bold text-foreground">
            Recent tickets
          </h1>

          <Link 
            href={'/employee/my-ticket'} 
            className="text-sm px-3 py-1 rounded-xl bg-background-element text-white hover:bg-background-element-hover active:bg-background-element"
          >
            View All
          </Link>
        </div>


        <div className="flex flex-col gap-3 overflow-x-auto">
          {recentTickets?.map((ticket:ITicket) => (
            <div key={ticket.id} className="grid grid-cols-4 gap-4">
              <p className="text-foreground font-semibold">
                {ticket.number}
              </p>
              <p className="text-foreground">
                {ticket.title}
              </p>
              <p className="text-foreground">
                {Convert.dateToLocal(`${ticket.createdAt}`)}
              </p>
              <div>
                <Chip variant="primary" color="accent" className="z-0">
                  {ticket.status}
                </Chip>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl  border-2 border-text-element min-h-20 p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg lg:text-xl font-bold text-foreground">
            Waiting for you
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          {waitingTickets?.map((ticket: ITicket) => (
            <div key={ticket.id} className="flex justify-between">
              <div  className="flex gap-2">
                <Clock />
                <div>
                  <p className="text-foreground font-semibold">
                    {ticket.number}
                  </p>
                  <p className="text-foreground mb-1">
                    {ticket.title}
                  </p>
                  <p className="text-foreground font-medium">
                    Agent: <span  className="text-foreground px-2 py-1 rounded-xl bg-gray-200 w-fit font-medium">{ticket.agent?.name}</span>
                  </p>
                </div>
              </div>

              <div>
                <Link 
                  href={`/employee/my-ticket/${ticket.id}`}
                  className="text-white text-sm px-2 py-1 rounded-xl bg-background-element hover:bg-background-element-hover active:bg-background-element"
                >
                  Waiting 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataTickets