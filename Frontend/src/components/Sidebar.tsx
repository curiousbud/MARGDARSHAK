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
      className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-railway-card-bg border-r border-white/10 transition-transform duration-300 z-[9999] ${
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-16"
      } overflow-auto`}
      aria-hidden={!sidebarOpen}
      role="navigation"
      aria-label="Main navigation"
    >
      

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                // close sidebar on mobile after navigation
                setTimeout(() => setSidebarOpen(false), 120);
              }}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all nav-item ${
                isActive
                  ? 'sidebar-active text-railway-emerald bg-railway-emerald-10'
                  : 'text-railway-off-white hover:bg-railway-dark-bg hover:text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="nav-icon" />
              {sidebarOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}

              {!sidebarOpen && item.id === "conflicts" && (
                <Badge className="absolute left-10 top-2 w-4 h-4 p-0 flex items-center justify-center bg-[var(--railway-danger)] text-white text-xs border-none rounded-full">
                  3
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-railway-dark-bg border border-white/10 rounded-lg">
          <div className="text-xs space-y-1">
            <div className="text-railway-off-white">System Load</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[var(--railway-steel-blue)] rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-[var(--railway-emerald)] rounded-full" />
              </div>
              <span className="text-[var(--railway-emerald)]">78%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
