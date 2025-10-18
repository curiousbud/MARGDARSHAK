import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Train, Clock, AlertTriangle, Activity } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

function KPICard({ title, value, change, icon, color }: KPICardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className="bg-[#1A1D23] border-white/10 hover:border-[#3DBE84]/50 transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-[#C4C4CC]">{title}</CardTitle>
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl" style={{ color }}>{value}</div>
            <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-[#3DBE84]' : 'text-[#E63946]'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(change)}%
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF]">vs previous hour</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <KPICard
        title="Trains per Hour"
        value="24"
        change={8.2}
        icon={<Train className="w-4 h-4" style={{ color: '#3DBE84' }} />}
        color="#3DBE84"
      />
      <KPICard
        title="Average Delay"
        value="4.2 min"
        change={-12.5}
        icon={<Clock className="w-4 h-4" style={{ color: '#FDB813' }} />}
        color="#FDB813"
      />
      <KPICard
        title="Section Utilization"
        value="78%"
        change={5.3}
        icon={<Activity className="w-4 h-4" style={{ color: '#30475E' }} />}
        color="#30475E"
      />
      <KPICard
        title="Active Conflicts"
        value="3"
        change={-33.3}
        icon={<AlertTriangle className="w-4 h-4" style={{ color: '#E63946' }} />}
        color="#E63946"
      />
      <KPICard
        title="On-Time Performance"
        value="92%"
        change={3.5}
        icon={<TrendingUp className="w-4 h-4" style={{ color: '#3DBE84' }} />}
        color="#3DBE84"
      />
      <KPICard
        title="Platform Occupancy"
        value="65%"
        change={-2.1}
        icon={<Train className="w-4 h-4" style={{ color: '#30475E' }} />}
        color="#30475E"
      />
    </div>
  );
}
