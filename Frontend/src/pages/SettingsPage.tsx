import { SettingsPanel } from "../components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white">Integration Settings</h2>
        <p className="text-sm text-railway-off-white">Configure integrations and system preferences</p>
      </div>
      <SettingsPanel />
    </div>
  );
}
