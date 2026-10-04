import { ITicket } from "@/types/ticket";
import { Clock } from "lucide-react";
import Link from "next/link";

interface TypeProps {
  data: ITicket[]
}

const ReProgressTickets = (props: TypeProps) => {
  const {
    data
  } = props;

  return (
    <div className="bg-white rounded-2xl border min-h-20 p-4 lg:p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg lg:text-xl font-bold text-foreground">
          Needs Follow-up
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {data?.length < 1 ? (
          <div className="h-full flex justify-center items-center">
            <p className="text-text-abu text-lg">
              Tickets is not found
            </p>
          </div>
        ) : 
        data?.map((ticket: ITicket) => (
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
                href={`/agent/ticket/${ticket.id}`}
                className="text-white text-sm px-2 py-1 rounded-xl bg-background-element hover:bg-background-element-hover active:bg-background-element"
              >
                Follow up 
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReProgressTickets;