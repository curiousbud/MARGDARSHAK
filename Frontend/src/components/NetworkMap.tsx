import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Train {
  id: string;
  name: string;
  position: { x: number; y: number };
  status: "clear" | "delayed" | "congested";
  type: string;
  eta: string;
  speed: number;
}

export function NetworkMap({ size, height, showLegend = true }: { size?: string; height?: string; showLegend?: boolean }) {
  const [trains, setTrains] = useState<Train[]>([
    { id: "12001", name: "Shatabdi Exp", position: { x: 15, y: 30 }, status: "clear", type: "Express", eta: "14:23", speed: 110 },
    { id: "12951", name: "Rajdhani Exp", position: { x: 45, y: 55 }, status: "delayed", type: "Superfast", eta: "14:45", speed: 95 },
    { id: "18478", name: "Kalinga Utkal", position: { x: 70, y: 40 }, status: "clear", type: "Mail", eta: "15:10", speed: 105 },
    { id: "22626", name: "Double Decker", position: { x: 30, y: 70 }, status: "congested", type: "Express", eta: "14:55", speed: 65 },
    { id: "12860", name: "Gitanjali Exp", position: { x: 85, y: 25 }, status: "clear", type: "Superfast", eta: "15:30", speed: 115 },
  ]);

  const [hoveredTrain, setHoveredTrain] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains((prev) =>
        prev.map((train) => ({
          ...train,
          position: {
            x: (train.position.x + Math.random() * 2 - 1 + 100) % 100,
            y: (train.position.y + Math.random() * 2 - 1 + 100) % 100,
          },
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clear":
        return "var(--railway-clear)";
      case "delayed":
        return "var(--railway-delayed)";
      case "congested":
        return "var(--railway-congested)";
      default:
        return "var(--railway-clear)";
    }
  };

  const inlineStyle: React.CSSProperties | undefined = height
    ? { height }
    : undefined;

  return (
    <div
      className={`relative w-full h-full bg-[#0F1115] rounded-lg overflow-hidden border border-white/10 ${
        size ? size : "min-h-[400px]"
      }`}
      style={inlineStyle}
    >
      {/* Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--railway-steel-blue)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Railway Track Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="var(--railway-steel-blue)" strokeWidth="3" strokeDasharray="10,5" />
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="var(--railway-steel-blue)" strokeWidth="3" strokeDasharray="10,5" />
        <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="var(--railway-steel-blue)" strokeWidth="3" strokeDasharray="10,5" />
        <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="var(--railway-steel-blue)" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="var(--railway-steel-blue)" strokeWidth="2" strokeDasharray="5,3" />
      </svg>

      {/* Junction Points */}
      {[
        { x: 30, y: 30, name: "Junction A" },
        { x: 70, y: 30, name: "Junction B" },
        { x: 30, y: 50, name: "Junction C" },
        { x: 70, y: 50, name: "Junction D" },
        { x: 30, y: 70, name: "Junction E" },
        { x: 70, y: 70, name: "Junction F" },
      ].map((junction) => (
        <div
          key={junction.name}
          className="absolute w-3 h-3 bg-[var(--railway-steel-blue)] border-2 border-[var(--railway-emerald)] rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${junction.x}%`, top: `${junction.y}%` }}
        />
      ))}

      {/* Trains */}
      {trains.map((train) => (
        <motion.div
          key={train.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${train.position.x}%`, top: `${train.position.y}%` }}
          animate={{ left: `${train.position.x}%`, top: `${train.position.y}%` }}
          transition={{ duration: 2, ease: "linear" }}
          onMouseEnter={() => setHoveredTrain(train.id)}
          onMouseLeave={() => setHoveredTrain(null)}
        >
          {/* Train Icon */}
          <div
            className="w-4 h-4 rounded-full shadow-lg"
            style={{
              backgroundColor: getStatusColor(train.status),
              boxShadow: `0 0 20px ${getStatusColor(train.status)}80`,
            }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ backgroundColor: getStatusColor(train.status), opacity: 0.3 }}
            />
          </div>

          {/* Tooltip */}
          {hoveredTrain === train.id && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-6 top-0 bg-[var(--railway-card-bg)] border border-[var(--railway-emerald)]/30 rounded-lg p-3 min-w-[180px] z-50 shadow-xl"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">Train ID:</span>
                  <span className="text-xs text-white">{train.id}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">Name:</span>
                  <span className="text-xs text-white">{train.name}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">Type:</span>
                  <span className="text-xs text-white">{train.type}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">Speed:</span>
                  <span className="text-xs text-white">{train.speed} km/h</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">ETA:</span>
                  <span className="text-xs text-white">{train.eta}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--railway-emerald)]">Status:</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: getStatusColor(train.status) + "30", color: getStatusColor(train.status) }}
                  >
                    {train.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Legend */}
      {showLegend && (
        <div className="absolute bottom-4 left-4 bg-[var(--railway-card-bg)]/90 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--railway-clear)]" />
              <span className="text-xs text-[var(--railway-off-white)]">Clear</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--railway-delayed)]" />
              <span className="text-xs text-[var(--railway-off-white)]">Delayed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--railway-congested)]" />
              <span className="text-xs text-[var(--railway-off-white)]">Congested</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
