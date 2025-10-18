import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface Conflict {
  id: string;
  type: "path-crossing" | "timing" | "platform";
  trains: string[];
  location: string;
  eta: string;
  severity: "critical" | "warning" | "minor";
  resolutionOptions: string[];
}

const mockConflicts: Conflict[] = [
  {
    id: "conf-1",
    type: "path-crossing",
    trains: ["12951", "22626"],
    location: "Junction C - Track Segment 4B",
    eta: "14:42",
    severity: "critical",
    resolutionOptions: ["Hold Train 22626 for 4 mins", "Reroute Train 12951 via Track 5A", "Adjust signal timing"],
  },
  {
    id: "conf-2",
    type: "timing",
    trains: ["18478", "12860"],
    location: "Platform 2",
    eta: "15:08",
    severity: "warning",
    resolutionOptions: ["Redirect Train 18478 to Platform 3", "Delay Train 12860 by 3 mins"],
  },
  {
    id: "conf-3",
    type: "platform",
    trains: ["12001"],
    location: "Platform 1",
    eta: "14:25",
    severity: "minor",
    resolutionOptions: ["Early clearance from Platform 1", "Use Platform 4 as alternative"],
  },
];

export function ConflictDetection() {
  const [conflicts, setConflicts] = useState(mockConflicts);
  const [selectedResolution, setSelectedResolution] = useState<{ [key: string]: number }>({});

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "bg-[#E63946]/20", text: "text-[#E63946]", border: "border-[#E63946]/30" };
      case "warning":
        return { bg: "bg-[#FDB813]/20", text: "text-[#FDB813]", border: "border-[#FDB813]/30" };
      case "minor":
        return { bg: "bg-[#3DBE84]/20", text: "text-[#3DBE84]", border: "border-[#3DBE84]/30" };
      default:
        return { bg: "bg-[#30475E]/20", text: "text-[#30475E]", border: "border-[#30475E]/30" };
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "path-crossing" ? "🔀" : type === "timing" ? "⏱️" : "🚉";
  };

  const handleResolve = (conflictId: string) => {
    setConflicts((prev) => prev.filter((c) => c.id !== conflictId));
    setSelectedResolution((prev) => {
      const newState = { ...prev };
      delete newState[conflictId];
      return newState;
    });
  };

  return (
    <Card className="bg-[#1A1D23] border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#E63946]/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-[#E63946]" />
          </div>
          <CardTitle className="text-white">Conflict Detection</CardTitle>
          <Badge className="ml-auto bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30">
            {conflicts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {conflicts.map((conflict) => {
            const colors = getSeverityColor(conflict.severity);
            return (
              <div
                key={conflict.id}
                className={`bg-[#0F1115] border rounded-lg p-4 space-y-3 ${colors.border}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                        {conflict.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs">{getTypeIcon(conflict.type)}</span>
                      <span className="text-xs text-[#C4C4CC]">
                        {conflict.type.replace("-", " ").toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-white">Trains:</span>
                        {conflict.trains.map((trainId) => (
                          <Badge
                            key={trainId}
                            className="bg-[#30475E]/30 text-[#3DBE84] border-[#30475E]/30"
                          >
                            {trainId}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#C4C4CC]">
                        <MapPin className="w-3 h-3" />
                        <span>{conflict.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#C4C4CC]">
                        <Clock className="w-3 h-3" />
                        <span>ETA: {conflict.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conflict Visualization */}
                <div className="bg-[#1A1D23] rounded p-3 space-y-2">
                  <div className="text-xs text-[#C4C4CC] mb-2">Path Diagram:</div>
                  <div className="flex items-center justify-center gap-4">
                    {conflict.trains.map((train, idx) => (
                      <div key={train} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="px-2 py-1 bg-[#30475E]/30 rounded text-xs text-[#3DBE84]">
                            {train}
                          </div>
                          <div className="w-px h-6 bg-[#E63946]" />
                        </div>
                        {idx < conflict.trains.length - 1 && (
                          <AlertTriangle className="w-4 h-4 text-[#E63946]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution Options */}
                <div className="space-y-2">
                  <div className="text-xs text-[#C4C4CC]">Resolution Strategies:</div>
                  <div className="space-y-1.5">
                    {conflict.resolutionOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-2 rounded text-xs cursor-pointer transition-all ${
                          selectedResolution[conflict.id] === idx
                            ? "bg-[#3DBE84]/20 border border-[#3DBE84]/50 text-[#3DBE84]"
                            : "bg-[#1A1D23] border border-white/10 text-[#C4C4CC] hover:border-[#3DBE84]/30"
                        }`}
                        onClick={() => setSelectedResolution({ ...selectedResolution, [conflict.id]: idx })}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              selectedResolution[conflict.id] === idx
                                ? "border-[#3DBE84] bg-[#3DBE84]"
                                : "border-white/30"
                            }`}
                          />
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-[#3DBE84] hover:bg-[#3DBE84]/80 text-white"
                  onClick={() => handleResolve(conflict.id)}
                  disabled={selectedResolution[conflict.id] === undefined}
                >
                  Apply Resolution
                </Button>
              </div>
            );
          })}
          {conflicts.length === 0 && (
            <div className="text-center py-8 text-[#9CA3AF]">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No active conflicts detected</p>
              <p className="text-xs mt-1">All trains operating within safe parameters</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
