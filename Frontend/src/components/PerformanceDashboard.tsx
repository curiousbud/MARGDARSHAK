import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const delayByCategory = [
  { category: "Express", avgDelay: 3.2, count: 12 },
  { category: "Superfast", avgDelay: 4.8, count: 8 },
  { category: "Mail", avgDelay: 5.5, count: 15 },
  { category: "Passenger", avgDelay: 6.2, count: 20 },
  { category: "Freight", avgDelay: 8.1, count: 10 },
];

const punctualityData = [
  { name: "On Time", value: 68, color: "#3DBE84" },
  { name: "Delayed <5 min", value: 20, color: "#FDB813" },
  { name: "Delayed >5 min", value: 12, color: "#E63946" },
];

const hourlyStats = [
  { hour: "08:00", punctuality: 95, throughput: 18 },
  { hour: "10:00", punctuality: 92, throughput: 22 },
  { hour: "12:00", punctuality: 88, throughput: 26 },
  { hour: "14:00", punctuality: 90, throughput: 24 },
  { hour: "16:00", punctuality: 85, throughput: 28 },
  { hour: "18:00", punctuality: 82, throughput: 30 },
  { hour: "20:00", punctuality: 87, throughput: 25 },
];

export function PerformanceDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#FAFAFA]">Performance Analytics</h2>
          <p className="text-sm text-[#FAFAFA]/70">Comprehensive metrics and historical trends</p>
        </div>
        <Button className="bg-[#30475E] hover:bg-[#30475E]/80 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FAFAFA]">Average Delay by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={delayByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30475E" opacity={0.3} />
                <XAxis
                  dataKey="category"
                  stroke="#FAFAFA"
                  tick={{ fill: "#FAFAFA", fontSize: 12 }}
                  tickLine={{ stroke: "#30475E" }}
                />
                <YAxis
                  stroke="#FAFAFA"
                  tick={{ fill: "#FAFAFA", fontSize: 12 }}
                  tickLine={{ stroke: "#30475E" }}
                  label={{ value: "Minutes", angle: -90, position: "insideLeft", fill: "#FAFAFA" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1D23",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#FAFAFA",
                  }}
                />
                <Bar dataKey="avgDelay" fill="#FDB813" radius={[8, 8, 0, 0]} name="Avg Delay (min)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FAFAFA]">Train Punctuality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={punctualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {punctualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1D23",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#FAFAFA",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1A1D23] border-white/10">
        <CardHeader>
          <CardTitle className="text-[#FAFAFA]">Hourly Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30475E" opacity={0.3} />
              <XAxis
                dataKey="hour"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
              />
              <YAxis
                yAxisId="left"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
                label={{ value: "Punctuality %", angle: -90, position: "insideLeft", fill: "#FAFAFA" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                tickLine={{ stroke: "#30475E" }}
                label={{ value: "Throughput", angle: 90, position: "insideRight", fill: "#FAFAFA" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1D23",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#FAFAFA",
                }}
              />
              <Legend wrapperStyle={{ color: "#FAFAFA", fontSize: "12px" }} />
              <Bar yAxisId="left" dataKey="punctuality" fill="#3DBE84" radius={[8, 8, 0, 0]} name="Punctuality %" />
              <Bar yAxisId="right" dataKey="throughput" fill="#30475E" radius={[8, 8, 0, 0]} name="Trains/Hour" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <CardTitle className="text-sm text-[#FAFAFA]/70">Best Performing Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#3DBE84]/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#3DBE84]" />
              </div>
              <div>
                <div className="text-2xl text-[#3DBE84]">08:00</div>
                <div className="text-xs text-[#FAFAFA]/70">95% punctuality</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <CardTitle className="text-sm text-[#FAFAFA]/70">Total Trains Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#3DBE84]">168</div>
            <div className="text-xs text-[#FAFAFA]/70">+12 vs yesterday</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <CardTitle className="text-sm text-[#FAFAFA]/70">Network Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#3DBE84]">87.5%</div>
            <div className="text-xs text-[#FAFAFA]/70">Above target (85%)</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
