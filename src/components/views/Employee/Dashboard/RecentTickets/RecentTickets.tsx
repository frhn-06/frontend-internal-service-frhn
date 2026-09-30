import { ITicket } from "@/types/ticket";
import Convert from "@/utils/convert.";
import { Chip } from "@heroui/react";
import Link from "next/link";

interface TypeProps {
  data: ITicket[]
}

const RecentTickets = (props: TypeProps) => {
  const {
    data
  } = props;

  return (
    <div className="rounded-2xl border-2 border-text-element min-h-20 p-4 shadow-lg">
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


      <div className="flex flex-col gap-4 overflow-x-auto">
        {data?.map((ticket:ITicket) => (
          <div key={ticket.id} className="grid grid-cols-4 gap-4 border-b border-gray-400">
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
  )
}

export default RecentTickets;