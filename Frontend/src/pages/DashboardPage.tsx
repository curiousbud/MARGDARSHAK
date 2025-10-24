import { NetworkMap } from "../components/NetworkMap";
import blueprintStations from "../data/blueprintStations";
import { AIRecommendations } from "../components/AIRecommendations";

export default function DashboardPage() {
  return (
    <div className="space-y-6 h-full ">
      <div className="bg-railway-card-bg border border-white/10 rounded-lg p-4 overflow-hidden h-[89vh]">
        <h3 className="text-lg text-white mb-4">Network Map Visualization</h3>
        <div className="flex gap-6 items-stretch h-full">
          {/* Map: take remaining width */}
          <div className="flex-1 h-full min-h-[320px]">
            <NetworkMap height="100%" showLegend={true} blueprintStations={blueprintStations} />
          </div>

          {/* Recommendations: fixed width, scrollable when content overflows */}
          <div className="w-96 h-full overflow-auto">
            <AIRecommendations />
          </div>
        </div>
      </div>
      {/* Real-time overview and performance widgets moved to Performance Analytics page */}
    </div>
  );
}
