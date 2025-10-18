import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Train } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0F1115] via-[#1C1F25] to-[#30475E] p-4">
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
              <div className="absolute inset-0 bg-[#3DBE84] blur-2xl opacity-30 animate-pulse" />
              <div className="relative p-4 bg-gradient-to-br from-[#30475E] to-[#3DBE84] rounded-2xl shadow-xl">
                <Train className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="space-y-2">
            <h1 className="text-white tracking-wider">MARGDARSHAK</h1>
            <p className="text-[#3DBE84]">AI-Driven Precision for Railway Efficiency</p>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#3DBE84] to-transparent" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#C4C4CC]">
                Controller ID
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="SC-001"
                className="bg-[#0F1115] border-white/10 text-white placeholder:text-white/40 focus:border-[#3DBE84]/50"
                defaultValue="SC-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#C4C4CC]">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-[#0F1115] border-white/10 text-white placeholder:text-white/40 focus:border-[#3DBE84]/50"
                defaultValue="password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zone" className="text-[#C4C4CC]">
                Control Zone
              </Label>
              <select
                id="zone"
                className="w-full px-3 py-2 bg-[#0F1115] border border-white/10 text-white rounded-md focus:outline-none focus:border-[#3DBE84]/50 transition-colors"
                defaultValue="zone-a"
              >
                <option value="zone-a" className="bg-[#1A1D23]">Zone A - Central Section</option>
                <option value="zone-b" className="bg-[#1A1D23]">Zone B - Eastern Section</option>
                <option value="zone-c" className="bg-[#1A1D23]">Zone C - Western Section</option>
                <option value="zone-d" className="bg-[#1A1D23]">Zone D - Southern Section</option>
              </select>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#30475E] to-[#3DBE84] hover:from-[#3DBE84] hover:to-[#30475E] text-white shadow-lg shadow-[#3DBE84]/20 transition-all"
            onClick={onLogin}
          >
            Access Control Dashboard
          </Button>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>System Status:</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3DBE84] rounded-full animate-pulse" />
                <span className="text-[#3DBE84]">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Data Sync:</span>
              <span className="text-[#3DBE84]">Real-time</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Last Update:</span>
              <span className="text-[#C4C4CC]">18 Oct 2025, 14:23</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-xs text-[#9CA3AF]/60">
        <p>Indian Railways • Advanced Traffic Management System</p>
        <p className="mt-1">Secure Access Only • Version 1.0.0</p>
      </div>
    </div>
  );
}
