import React from "react";
import { SimulationPanel } from "../components/SimulationPanel";

export default function SimulationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white">What-If Simulation</h2>
        <p className="text-sm text-railway-off-white">Test scenarios and optimize decisions before implementation</p>
      </div>
      <SimulationPanel />
    </div>
  );
}
