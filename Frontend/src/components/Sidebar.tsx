import React from "react";
import { Badge } from "./ui/badge";

type NavItem = {
  id: any;
  label: string;
  icon: React.ComponentType<any>;
};

interface SidebarProps {
  navigationItems: NavItem[];
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  currentView: any;
  setCurrentView: React.Dispatch<React.SetStateAction<any>>;
}

export default function Sidebar({
  navigationItems,
  sidebarOpen,
  setSidebarOpen,
  currentView,
  setCurrentView,
}: SidebarProps) {
  return (
    <div
      className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-[#1A1D23] border-r border-white/10 transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-16"
      } overflow-auto`}
      aria-hidden={!sidebarOpen}
    >
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-[#3DBE84]/20 text-[#3DBE84] border border-[#3DBE84]/30"
                  : "text-[#C4C4CC] hover:bg-[#0F1115] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              {!sidebarOpen && item.id === "conflicts" && (
                <Badge className="absolute left-8 top-2 w-4 h-4 p-0 flex items-center justify-center bg-[#E63946] text-white text-xs border-none">
                  3
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0F1115] border border-white/10 rounded-lg">
          <div className="text-xs space-y-1">
            <div className="text-[#C4C4CC]">System Load</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#30475E] rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-[#3DBE84] rounded-full" />
              </div>
              <span className="text-[#3DBE84]">78%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
