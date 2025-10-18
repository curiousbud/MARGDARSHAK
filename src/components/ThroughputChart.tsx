import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity } from "lucide-react";

const throughputData = [
  { time: "10:00", trains: 18, capacity: 30, delay: 3.2 },
  { time: "11:00", trains: 22, capacity: 30, delay: 4.5 },
  { time: "12:00", trains: 26, capacity: 30, delay: 5.1 },
  { time: "13:00", trains: 24, capacity: 30, delay: 4.8 },
  { time: "14:00", trains: 24, capacity: 30, delay: 4.2 },
  { time: "15:00", trains: 28, capacity: 30, delay: 3.9 },
  { time: "16:00", trains: 25, capacity: 30, delay: 3.5 },
];

const utilizationData = [
  { time: "10:00", utilization: 60 },
  { time: "11:00", utilization: 73 },
  { time: "12:00", utilization: 87 },
  { time: "13:00", utilization: 80 },
  { time: "14:00", utilization: 78 },
  { time: "15:00", utilization: 93 },
  { time: "16:00", utilization: 83 },
];

export function ThroughputChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="bg-[#1A1D23] border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#3DBE84]/20 rounded-lg">
              <Activity className="w-5 h-5 text-[#3DBE84]" />
            </div>
            <CardTitle className="text-white">Throughput & Capacity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30475E" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
              />
              <YAxis
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1D23",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#FAFAFA",
                }}
              />
              <Legend
                wrapperStyle={{ color: "#FAFAFA", fontSize: "12px" }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="trains"
                stroke="#3DBE84"
                strokeWidth={2}
                dot={{ fill: "#3DBE84", r: 4 }}
                name="Trains/Hour"
              />
              <Line
                type="monotone"
                dataKey="capacity"
                stroke="#30475E"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#30475E", r: 4 }}
                name="Max Capacity"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1D23] border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FDB813]/20 rounded-lg">
              <Activity className="w-5 h-5 text-[#FDB813]" />
            </div>
            <CardTitle className="text-white">Section Utilization</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={utilizationData}>
              <defs>
                <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FDB813" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FDB813" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30475E" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
              />
              <YAxis
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1D23",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#FAFAFA",
                }}
              />
              <Area
                type="monotone"
                dataKey="utilization"
                stroke="#FDB813"
                strokeWidth={2}
                fill="url(#utilizationGradient)"
                name="Utilization %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
