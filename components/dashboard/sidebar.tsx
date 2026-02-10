"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Phone,
  MessageSquare,
  Settings,
  Bot,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FileText,
  BarChart3,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    title: "Calls",
    href: "/calls",
    icon: <Phone className="w-4 h-4" />,
  },
  {
    title: "Agent",
    href: "/agent",
    icon: <Bot className="w-4 h-4" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-gray-900" strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-normal text-white"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                CatchVisitors
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex text-white hover:bg-gray-800"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ) : (
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => {
                      // Toggle submenu logic here if needed
                    }}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {!collapsed && (
            <div className="text-xs text-gray-400">
              <p>© 2024 CatchVisitors</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
