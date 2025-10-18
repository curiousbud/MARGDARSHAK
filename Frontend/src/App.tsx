import { useState, useEffect } from "react";
import { LoginPage } from "./pages/LoginPage";
import { NetworkMap } from "./components/NetworkMap";
import { KPICards } from "./components/KPICards";
import { AIRecommendations } from "./components/AIRecommendations";
import { ConflictDetection } from "./components/ConflictDetection";
import { ThroughputChart } from "./components/ThroughputChart";
import { SimulationPanel } from "./components/SimulationPanel";
import { PerformanceDashboard } from "./pages/PerformanceDashboard";
import { SettingsPanel } from "./components/SettingsPanel";
import {
  LayoutDashboard,
  AlertTriangle,
  FlaskConical,
  BarChart3,
  Map,
  Settings,
  Search,
  Bell,
  User,
  Train,
  Menu,
  X,
  LogOut,
  UserCircle,
  Shield,
} from "lucide-react";
import NetworkMapPage from "./pages/NetworkMapPage";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import Sidebar from "./components/Sidebar";

type View = "dashboard" | "conflicts" | "simulation" | "performance" | "settings" | "networkmap";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const navigationItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "networkmap" as View, label: "Network Map", icon: Map },
    { id: "conflicts" as View, label: "Conflict Resolution", icon: AlertTriangle },
    { id: "simulation" as View, label: "What-If Simulation", icon: FlaskConical },
    { id: "performance" as View, label: "Performance Analytics", icon: BarChart3 },
    { id: "settings" as View, label: "Integration Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-railway-dark-bg dark">
      {/* Top Bar */}
  <div className="fixed top-0 left-0 right-0 h-16 bg-railway-card-bg border-b border-white/10 z-50">
        <div className="h-full px-4 flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="lg:hidden bg-railway-dark-bg border border-white/10 rounded-lg p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5 text-[#C4C4CC]" /> : <Menu className="w-5 h-5 text-[#C4C4CC]" />}
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="brand-badge p-2">
                <Train className="w-6 h-6 text-[var(--railway-logo-color)]" />
              </div>
              <div className="block">
                <h1 className="text-lg text-white">MARGDARSHAK</h1>
                <p className="text-xs text-railway-emerald">Section Controller Dashboard</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search */}
              <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-railway-off-white-50" />
              <Input
                placeholder="Search train ID or section..."
                className="pl-10 bg-railway-dark-bg border-white/10"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-railway-dark-bg border border-white/10 rounded-lg">
              <div className="w-2 h-2 bg-[var(--railway-emerald)] rounded-full animate-pulse" />
              <span className="text-xs text-railway-off-white">Live Sync</span>
            </div>

            <div className="hidden sm:block text-right">
              <div className="text-sm text-white">
                {currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
              <div className="text-xs text-[#9CA3AF]">
                {currentTime.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative bg-railway-dark-bg border border-white/10 rounded-lg h-10 w-10 flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-railway-off-white-60" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[var(--railway-danger)] text-white text-xs border-none rounded-full">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1115] border border-white/10 rounded-lg hover:border-[#3DBE84]/50 transition-all cursor-pointer">
                  <User className="w-4 h-4 text-[#3DBE84]" />
                  <div className="hidden sm:block text-xs">
                    <div className="text-white">SC-001</div>
                    <div className="text-[#9CA3AF]">Zone A</div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1A1D23] border-white/10">
                <DropdownMenuLabel className="text-white">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#3DBE84]" />
                    <div>
                      <div className="text-sm">Section Controller</div>
                      <div className="text-xs text-[#9CA3AF]">SC-001 • Zone A</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-[#C4C4CC] focus:bg-[#0F1115] focus:text-white cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#C4C4CC] focus:bg-[#0F1115] focus:text-white cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Access Control
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-[#E63946] focus:bg-[#E63946]/10 focus:text-[#E63946] cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="pt-16 flex">
        <Sidebar
          navigationItems={navigationItems}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
  {/* Main Content */}
  <div className="flex-1 p-4 md:p-6 overflow-y-auto min-h-[calc(100vh-4rem)]">
          {currentView === "dashboard" && (
            <div className="space-y-6">
              {/* Network Map */}
              <div className="bg-[#1A1D23] border border-white/10 rounded-lg p-4 overflow-visible">
                <h3 className="text-lg text-white mb-4">Network Map Visualization</h3>
                <div className="h-80 md:h-[600px] lg:h-[800px] min-h-[320px]">
                  <NetworkMap height="60vh" />
                </div>
              </div>
              <div className="space-y-6">
                <AIRecommendations />
              </div>
              <div>
                <h2 className="text-2xl text-white">Real-Time Section Overview</h2>
                <p className="text-sm text-[#C4C4CC]">Live network monitoring and AI-driven insights</p>
              </div>
              <KPICards />
              <ThroughputChart />
            </div>
          )}

          {currentView === "networkmap" && (
            <div className="space-y-6">
              <NetworkMapPage />
            </div>
          )}

          {currentView === "conflicts" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-white">Conflict Detection & Resolution</h2>
                <p className="text-sm text-[#C4C4CC]">
                  Identify and resolve train path conflicts with AI assistance
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConflictDetection />
                <div className="space-y-6">
                  <AIRecommendations />
                  <div className="bg-[#1A1D23] border border-white/10 rounded-lg p-4">
                    <h3 className="text-lg text-white mb-4">Network Status</h3>
                    <div className="h-[300px]">
                      <NetworkMap height="300px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "simulation" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-white">What-If Simulation</h2>
                <p className="text-sm text-[#C4C4CC]">
                  Test scenarios and optimize decisions before implementation
                </p>
              </div>
              <SimulationPanel />
            </div>
          )}

          {currentView === "performance" && (
            <div className="space-y-6">
              <PerformanceDashboard />
            </div>
          )}

          {currentView === "settings" && (
            <div className="space-y-6">
              <SettingsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
