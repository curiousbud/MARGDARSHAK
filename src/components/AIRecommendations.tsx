import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, X, Lightbulb, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Recommendation {
  id: string;
  trainId: string;
  action: string;
  reason: string;
  impact: string;
  priority: "high" | "medium" | "low";
  timeToImplement: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    trainId: "12951",
    action: "Give precedence to Train 12951 at Junction C",
    reason: "Train carries priority passengers (Rajdhani) and current delay is 8 minutes",
    impact: "Reduces total network delay by 12 minutes, improves throughput by 6%",
    priority: "high",
    timeToImplement: "2 mins",
  },
  {
    id: "rec-2",
    trainId: "22626",
    action: "Hold Train 22626 at Platform 3 for 4 minutes",
    reason: "Prevents conflict with incoming Train 18478 on shared track segment",
    impact: "Avoids potential 15-minute delay cascade across 3 trains",
    priority: "high",
    timeToImplement: "Immediate",
  },
  {
    id: "rec-3",
    trainId: "12860",
    action: "Reroute Train 12860 via alternate track B",
    reason: "Main track maintenance scheduled in 10 minutes, preemptive routing optimizes flow",
    impact: "Maintains schedule, prevents conflict with maintenance window",
    priority: "medium",
    timeToImplement: "5 mins",
  },
  {
    id: "rec-4",
    trainId: "12001",
    action: "Accelerate clearance for Train 12001 at Junction A",
    reason: "Early arrival creates opportunity to optimize platform utilization",
    impact: "Opens capacity for delayed freight train, improves overall efficiency",
    priority: "low",
    timeToImplement: "8 mins",
  },
];

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [processing, setProcessing] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30";
      case "medium":
        return "bg-[#FDB813]/20 text-[#FDB813] border-[#FDB813]/30";
      case "low":
        return "bg-[#3DBE84]/20 text-[#3DBE84] border-[#3DBE84]/30";
      default:
        return "bg-[#30475E]/20 text-[#30475E] border-[#30475E]/30";
    }
  };

  const handleApprove = (id: string) => {
    setProcessing(id);
    setTimeout(() => {
      setRecommendations((prev) => prev.filter((rec) => rec.id !== id));
      setProcessing(null);
    }, 1000);
  };

  const handleOverride = (id: string) => {
    setProcessing(id);
    setTimeout(() => {
      setRecommendations((prev) => prev.filter((rec) => rec.id !== id));
      setProcessing(null);
    }, 1000);
  };

  return (
    <Card className="bg-[#1A1D23] border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#3DBE84]/20 rounded-lg">
            <Lightbulb className="w-5 h-5 text-[#3DBE84]" />
          </div>
          <CardTitle className="text-white">AI Recommendations</CardTitle>
          <Badge className="ml-auto bg-[#3DBE84]/20 text-[#3DBE84] border-[#3DBE84]/30">
            {recommendations.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-[#0F1115] border border-white/10 rounded-lg p-4 space-y-3 hover:border-[#3DBE84]/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-[#3DBE84]">Train {rec.trainId}</span>
                    <span className="text-xs text-[#9CA3AF]">• {rec.timeToImplement}</span>
                  </div>
                  <p className="text-sm text-white">{rec.action}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-[#C4C4CC] min-w-[60px]">Reason:</span>
                      <span className="text-xs text-[#E5E7EB]">{rec.reason}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-[#C4C4CC] min-w-[60px]">Impact:</span>
                      <span className="text-xs text-[#3DBE84]">{rec.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <Button
                  size="sm"
                  className="flex-1 bg-[#3DBE84] hover:bg-[#3DBE84]/80 text-white"
                  onClick={() => handleApprove(rec.id)}
                  disabled={processing === rec.id}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#E63946]/30 text-[#E63946] hover:bg-[#E63946]/10"
                  onClick={() => handleOverride(rec.id)}
                  disabled={processing === rec.id}
                >
                  <X className="w-4 h-4 mr-1" />
                  Override
                </Button>
              </div>
            </div>
          ))}
          {recommendations.length === 0 && (
            <div className="text-center py-8 text-[#9CA3AF]">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No active recommendations</p>
              <p className="text-xs mt-1">AI is monitoring the network for optimization opportunities</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
