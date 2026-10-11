import { IDepartmentsChart } from "@/types/dashboard";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface TypeProps {
  data: IDepartmentsChart[]
}
const Recharts = (props: TypeProps) => {
  const {
    data
  } = props;

  return (
    <div 
      className="lg:p-4 bg-white w-full shrink-0 max-w-2xl rounded-2xl shadow border transition-all hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-1 hover:bg-green-50 hover:border-green-400"
    >
      <BarChart
        style={{ width: '100%', maxWidth: 600, maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={data}
        margin={{ top: 30, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid 
          stroke="#94a3b8" 
          strokeDasharray="5 5" 
          strokeOpacity={0.5} 
        />
        <XAxis 
          dataKey="name" 
          stroke="#16a34a"
          tick={{
            fill: "#16a34a",
            fontSize: 12
          }}
          angle={-25}
        />
        <YAxis 
          stroke="#16a34a" 
          strokeWidth={2} 
          label={{
            value: "Count tickets",
            position: "insideLeft",
            angle: -90,
            fontSize: 12,
            fill: "#16a34a"
          }}
        />

        <Tooltip 
          defaultIndex={2} 
        />
        <Bar
          dataKey="count"
          fill="#0ea5e9"
          fillOpacity={0.85}
          stroke="#0369a1"
          strokeWidth={2}
          radius={4}
          barSize={30}
          isAnimationActive
          animationDuration={1000}
          animationEasing={"ease-in"}
        />
      </BarChart>
    </div>
  )
}

export default Recharts;