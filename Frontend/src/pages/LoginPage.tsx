import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Train } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[var(--railway-dark-bg)] via-[var(--railway-charcoal)] to-[var(--railway-steel-blue)] p-4">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3DBE84" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>
      </div>

      <Card className="w-full max-w-md bg-[#1A1D23]/95 border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-6 text-center pt-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
                  <div className="absolute inset-0 bg-[var(--railway-emerald)] blur-2xl opacity-30 animate-pulse" />
                  <div className="relative p-4 bg-railway-gradient rounded-2xl shadow-xl">
                    <Train className="w-12 h-12 text-[var(--railway-off-white)]" />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="space-y-2">
            <h1 className="text-white tracking-wider">MARGDARSHAK</h1>
            <p className="text-[var(--railway-emerald)]">AI-Driven Precision for Railway Efficiency</p>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--railway-emerald)] to-transparent" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-railway-off-white">
                Controller ID
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="SC-001"
                className="bg-railway-dark-bg border-white/10 text-[var(--railway-off-white)] placeholder:text-[var(--railway-off-white-50)] focus:border-[var(--railway-emerald)]/50"
                defaultValue="SC-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-railway-off-white">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-railway-dark-bg border-white/10 text-[var(--railway-off-white)] placeholder:text-[var(--railway-off-white-50)] focus:border-[var(--railway-emerald)]/50"
                defaultValue="password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zone" className="text-railway-off-white">
                Control Zone
              </Label>
              <select
                id="zone"
                className="w-full px-3 py-2 bg-railway-dark-bg border border-white/10 text-[var(--railway-off-white)] rounded-md focus:outline-none focus:border-[var(--railway-emerald)]/50 transition-colors"
                defaultValue="zone-a"
              >
                <option value="zone-a" className="bg-railway-card-bg">Zone A - Central Section</option>
                <option value="zone-b" className="bg-railway-card-bg">Zone B - Eastern Section</option>
                <option value="zone-c" className="bg-railway-card-bg">Zone C - Western Section</option>
                <option value="zone-d" className="bg-railway-card-bg">Zone D - Southern Section</option>
              </select>
            </div>
          </div>

          <Button
            className="w-full bg-railway-gradient hover:bg-railway-gradient text-[var(--railway-off-white)] shadow-lg shadow-[var(--railway-emerald)]/20 transition-all"
            onClick={onLogin}
          >
            Access Control Dashboard
          </Button>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>System Status:</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--railway-emerald)] rounded-full animate-pulse" />
                <span className="text-[var(--railway-emerald)]">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Data Sync:</span>
              <span className="text-[var(--railway-emerald)]">Real-time</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Last Update:</span>
              <span className="text-railway-off-white">18 Oct 2025, 14:23</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-xs text-[var(--muted-foreground)]/60">
        <p>Indian Railways • Advanced Traffic Management System</p>
        <p className="mt-1">Secure Access Only • Version 1.0.0</p>
      </div>
    </div>
  );
}
