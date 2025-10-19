import { NetworkMap } from "../components/NetworkMap";
import { AIRecommendations } from "../components/AIRecommendations";
import { KPICards } from "../components/KPICards";
import { ThroughputChart } from "../components/ThroughputChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-railway-card-bg border border-white/10 rounded-lg p-4 overflow-visible">
        <h3 className="text-lg text-white mb-4">Network Map Visualization</h3>
        <div className="flex gap-6 items-start">
          {/* Map: take remaining width */}
          <div className="flex-1 h-80 md:h-[600px] lg:h-[800px] min-h-[320px]">
            <NetworkMap height="60vh" />
          </div>

          {/* Recommendations: fixed width, scrollable when content overflows */}
          <div className="w-96 max-h-[60vh] overflow-auto">
            <AIRecommendations />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-white">Real-Time Section Overview</h2>
        <p className="text-sm text-railway-off-white">Live network monitoring and AI-driven insights</p>
      </div>

      <KPICards />
      <ThroughputChart />
    </div>
  );
}
