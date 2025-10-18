import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Play, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const baselineData = [
  { time: 0, trains: 24, delay: 4.2 },
  { time: 10, trains: 25, delay: 4.5 },
  { time: 20, trains: 26, delay: 5.1 },
  { time: 30, trains: 27, delay: 5.8 },
  { time: 40, trains: 26, delay: 5.5 },
  { time: 50, trains: 25, delay: 5.2 },
  { time: 60, trains: 24, delay: 4.8 },
];

const optimizedData = [
  { time: 0, trains: 24, delay: 4.2 },
  { time: 10, trains: 26, delay: 4.0 },
  { time: 20, trains: 28, delay: 3.8 },
  { time: 30, trains: 29, delay: 3.5 },
  { time: 40, trains: 28, delay: 3.3 },
  { time: 50, trains: 27, delay: 3.1 },
  { time: 60, trains: 26, delay: 2.9 },
];

export function SimulationPanel() {
  const [timeWindow, setTimeWindow] = useState([30]);
  const [scenario, setScenario] = useState("baseline");
  const [incidentType, setIncidentType] = useState("none");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    setTimeWindow([30]);
    setScenario("baseline");
    setIncidentType("none");
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[#1A1D23] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Simulation Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#C4C4CC]">Time Window (minutes)</label>
              <span className="text-sm text-[#3DBE84]">{timeWindow[0]} mins</span>
            </div>
            <Slider
              value={timeWindow}
              onValueChange={setTimeWindow}
              min={15}
              max={60}
              step={5}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Scenario Type</label>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger className="bg-[#0F1115] border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseline">Baseline (Current)</SelectItem>
                  <SelectItem value="optimized">AI Optimized</SelectItem>
                  <SelectItem value="peak">Peak Hour</SelectItem>
                  <SelectItem value="maintenance">Maintenance Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Inject Incident</label>
              <Select value={incidentType} onValueChange={setIncidentType}>
                <SelectTrigger className="bg-[#0F1115] border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="track-block">Track Block</SelectItem>
                  <SelectItem value="signal-failure">Signal Failure</SelectItem>
                  <SelectItem value="weather-delay">Weather Delay</SelectItem>
                  <SelectItem value="emergency-stop">Emergency Stop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {incidentType !== "none" && (
            <div className="flex items-center gap-2 p-3 bg-[#FDB813]/10 border border-[#FDB813]/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-[#FDB813]" />
              <span className="text-xs text-[#FDB813]">
                Incident "{incidentType}" will be injected at {Math.floor(timeWindow[0] / 2)} minutes
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#3DBE84] hover:bg-[#3DBE84]/80 text-white"
              onClick={handleRunSimulation}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run Simulation"}
            </Button>
            <Button variant="outline" className="border-white/10" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1D23] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#FAFAFA]">Simulation Results</CardTitle>
            <Button size="sm" variant="outline" className="border-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#0F1115] border border-white/10 rounded-lg p-3 space-y-1">
              <div className="text-xs text-[#FAFAFA]/70">Avg Throughput</div>
              <div className="text-xl text-[#3DBE84]">
                {scenario === "optimized" ? "27.5" : "25.3"}
              </div>
              <div className="text-xs text-[#FAFAFA]/50">trains/hour</div>
            </div>
            <div className="bg-[#0F1115] border border-white/10 rounded-lg p-3 space-y-1">
              <div className="text-xs text-[#FAFAFA]/70">Avg Delay</div>
              <div className="text-xl text-[#FDB813]">
                {scenario === "optimized" ? "3.4" : "5.1"}
              </div>
              <div className="text-xs text-[#FAFAFA]/50">minutes</div>
            </div>
            <div className="bg-[#0F1115] border border-white/10 rounded-lg p-3 space-y-1">
              <div className="text-xs text-[#FAFAFA]/70">Conflicts</div>
              <div className="text-xl text-[#E63946]">
                {scenario === "optimized" ? "1" : "4"}
              </div>
              <div className="text-xs text-[#FAFAFA]/50">detected</div>
            </div>
            <div className="bg-[#0F1115] border border-white/10 rounded-lg p-3 space-y-1">
              <div className="text-xs text-[#FAFAFA]/70">Efficiency</div>
              <div className="text-xl text-[#3DBE84]">
                {scenario === "optimized" ? "94%" : "84%"}
              </div>
              <div className="text-xs text-[#FAFAFA]/50">overall</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#30475E" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                label={{ value: "Time (minutes)", position: "insideBottom", offset: -5, fill: "#FAFAFA" }}
              />
              <YAxis
                yAxisId="left"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                label={{ value: "Trains/Hour", angle: -90, position: "insideLeft", fill: "#FAFAFA" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#FAFAFA"
                tick={{ fill: "#FAFAFA", fontSize: 12 }}
                label={{ value: "Delay (min)", angle: 90, position: "insideRight", fill: "#FAFAFA" }}
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
              <Line
                yAxisId="left"
                type="monotone"
                data={baselineData}
                dataKey="trains"
                stroke="#30475E"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#30475E", r: 3 }}
                name="Baseline Throughput"
              />
              <Line
                yAxisId="left"
                type="monotone"
                data={optimizedData}
                dataKey="trains"
                stroke="#3DBE84"
                strokeWidth={2}
                dot={{ fill: "#3DBE84", r: 4 }}
                name="Optimized Throughput"
              />
              <Line
                yAxisId="right"
                type="monotone"
                data={baselineData}
                dataKey="delay"
                stroke="#FDB813"
                strokeWidth={2}
                dot={{ fill: "#FDB813", r: 3 }}
                name="Delay"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-between p-3 bg-[#3DBE84]/10 border border-[#3DBE84]/30 rounded-lg">
            <div className="space-y-1">
              <div className="text-sm text-[#FAFAFA]">Optimization Impact</div>
              <div className="text-xs text-[#FAFAFA]/70">
                AI-optimized scenario shows 8.7% throughput increase and 33% delay reduction
              </div>
            </div>
            <Badge className="bg-[#3DBE84]/20 text-[#3DBE84] border-[#3DBE84]/30">+8.7%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
