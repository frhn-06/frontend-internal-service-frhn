import { IAgentInfo } from "@/types/dashboard";
import { UserRoundCheck, Users } from "lucide-react";
import CountUp from "react-countup";

interface TypeProps {
  data: IAgentInfo;
}
const AgentInfo = (props: TypeProps) => {
  const {
    data
  } = props;

  return (
    <div className="flex-1 min-w-60 max-w-2xl flex flex-col gap-2">
      <h1 className="text-foreground font-bold text-lg lg:text-xl">
        Agent overview
      </h1>

      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex gap-2 mb-6">
          <div className="p-2 rounded-xl bg-blue-200 aspect-square w-12 flex items-center justify-center">
            <Users />
          </div>
          <div>
            <h2 className="text-foreground font-medium">
              Total agents
            </h2>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">
              <CountUp 
                end={data.totalAgents}
                duration={0.8}
              />
            </h2>
          </div>
        </div>
        <p className="text-sm text-text-abu">
          Seluruh agent terdaftar
        </p>
      </div>

      <div className="bg-white rounded-2xl border p-4 shadow transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400">
        <div className="flex gap-2 mb-6">
          <div className="p-2 rounded-xl bg-purple-200 aspect-square w-12 flex items-center justify-center">
            <UserRoundCheck />
          </div>
          <div>
            <h2 className="text-foreground font-medium">
              Active agents
            </h2>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">
              <CountUp 
                end={data.activeAgents}
                duration={0.8}
              />
            </h2>
          </div>
        </div>
        <p className="text-sm text-text-abu">
          {data.activeAgents} dari {data.totalAgents} agent aktif
        </p>
      </div>
    </div>
  )
}


export default AgentInfo;