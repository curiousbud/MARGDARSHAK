import React from "react";
import { ConflictDetection } from "../components/ConflictDetection";

export default function ConflictDetectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white">Conflict Detection & Resolution</h2>
        <p className="text-sm text-railway-off-white">Identify and resolve train path conflicts with AI assistance</p>
      </div>

      <ConflictDetection />
    </div>
  );
}
