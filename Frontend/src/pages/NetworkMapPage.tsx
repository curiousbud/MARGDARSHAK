import React from "react";
import { NetworkMap } from "../components/NetworkMap";

export default function NetworkMapPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="bg-[#1A1D23] border border-white/10 rounded-lg p-4">
        <h1 className="text-2xl text-white mb-2">Network Map</h1>
        <p className="text-sm text-[#C4C4CC]">Full-screen interactive map view</p>
        <div className="mt-4 h-[70vh] min-h-[480px]">
          <NetworkMap height="100%" />
        </div>
      </div>
    </div>
  );
}
