import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Database, Wifi, Shield, Bell, Activity, Server } from "lucide-react";

export function SettingsPanel() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl text-[#FAFAFA]">System Integration & Settings</h2>
        <p className="text-sm text-[#FAFAFA]/70">Configure data sources and system parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#3DBE84]/20 rounded-lg">
                <Database className="w-5 h-5 text-[#3DBE84]" />
              </div>
              <CardTitle className="text-[#FAFAFA]">Data Sources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Signalling System", status: "connected", lastSync: "2 mins ago" },
              { name: "Train Management System", status: "connected", lastSync: "1 min ago" },
              { name: "Timetable Database", status: "connected", lastSync: "5 mins ago" },
              { name: "Rolling Stock Status", status: "warning", lastSync: "15 mins ago" },
              { name: "Weather Data Feed", status: "connected", lastSync: "3 mins ago" },
            ].map((source, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#0F1115] border border-white/10 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      source.status === "connected" ? "bg-[#3DBE84]" : "bg-[#FDB813]"
                    } animate-pulse`}
                  />
                  <div>
                    <div className="text-sm text-[#FAFAFA]">{source.name}</div>
                    <div className="text-xs text-[#FAFAFA]/50">Last sync: {source.lastSync}</div>
                  </div>
                </div>
                <Badge
                  className={
                    source.status === "connected"
                      ? "bg-[#3DBE84]/20 text-[#3DBE84] border-[#3DBE84]/30"
                      : "bg-[#FDB813]/20 text-[#FDB813] border-[#FDB813]/30"
                  }
                >
                  {source.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-[#30475E] hover:bg-[#30475E]/80 text-white">
              <Wifi className="w-4 h-4 mr-2" />
              Test Connections
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#30475E]/20 rounded-lg">
                <Activity className="w-5 h-5 text-[#30475E]" />
              </div>
              <CardTitle className="text-[#FAFAFA]">System Parameters</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">AI Optimization Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["Conservative", "Balanced", "Aggressive"].map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={level === "Balanced" ? "default" : "outline"}
                    className={
                      level === "Balanced"
                        ? "bg-[#3DBE84] hover:bg-[#3DBE84]/80 text-white"
                        : "border-white/10"
                    }
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Conflict Detection Sensitivity</label>
              <Input
                type="number"
                defaultValue="75"
                className="bg-[#0F1115] border-white/10"
                suffix="%"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Simulation Lookahead</label>
              <Input
                type="number"
                defaultValue="60"
                className="bg-[#0F1115] border-white/10"
                suffix="mins"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-white/10 rounded-lg">
              <div>
                <div className="text-sm text-[#FAFAFA]">Auto-apply AI recommendations</div>
                <div className="text-xs text-[#FAFAFA]/50">Requires operator confirmation</div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-white/10 rounded-lg">
              <div>
                <div className="text-sm text-[#FAFAFA]">Real-time conflict resolution</div>
                <div className="text-xs text-[#FAFAFA]/50">Automatic conflict mitigation</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FDB813]/20 rounded-lg">
                <Bell className="w-5 h-5 text-[#FDB813]" />
              </div>
              <CardTitle className="text-[#FAFAFA]">Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Critical conflicts", enabled: true },
              { name: "AI recommendations", enabled: true },
              { name: "Delay alerts (>5 min)", enabled: true },
              { name: "System status updates", enabled: false },
              { name: "Performance reports", enabled: true },
            ].map((setting, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#0F1115] border border-white/10 rounded-lg"
              >
                <span className="text-sm text-[#FAFAFA]">{setting.name}</span>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#1A1D23] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#E63946]/20 rounded-lg">
                <Shield className="w-5 h-5 text-[#E63946]" />
              </div>
              <CardTitle className="text-[#FAFAFA]">Access Control</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Current User</label>
              <div className="p-3 bg-[#0F1115] border border-white/10 rounded-lg">
                <div className="text-sm text-[#FAFAFA]">Section Controller - Zone A</div>
                <div className="text-xs text-[#FAFAFA]/50">Admin privileges • ID: SC-001</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#FAFAFA]/70">Control Authority</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-[#3DBE84]/10 border border-[#3DBE84]/30 rounded text-xs text-center text-[#3DBE84]">
                  Section Control
                </div>
                <div className="p-2 bg-[#3DBE84]/10 border border-[#3DBE84]/30 rounded text-xs text-center text-[#3DBE84]">
                  Signal Override
                </div>
                <div className="p-2 bg-[#3DBE84]/10 border border-[#3DBE84]/30 rounded text-xs text-center text-[#3DBE84]">
                  AI Management
                </div>
                <div className="p-2 bg-[#30475E]/10 border border-white/10 rounded text-xs text-center text-[#FAFAFA]/50">
                  Network Admin
                </div>
              </div>
            </div>

            <Button className="w-full border-white/10" variant="outline">
              <Server className="w-4 h-4 mr-2" />
              View Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
