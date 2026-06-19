"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Calendar,
  Bell,
  Keyboard,
  Users,
  Contact,
  UsersRound,
  KeyRound,
  Building2,
  Palette,
  Type,
  PieChart,
  Megaphone,
  Workflow,
  Wrench,
  Bot,
  Mail,
  Zap,
  FileText,
  MousePointerClick,
  BookOpen,
  Blocks,
  Phone,
  Rss,
  Route,
  ChevronRight,
  Menu,
  X,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const TOP_ITEM: NavItem = {
  title: "Dashboard",
  href: "/dashboard",
  icon: <LayoutDashboard className="w-4 h-4" />,
};

const GROUPS: NavGroup[] = [
  {
    title: "Me",
    items: [
      { title: "My Profile", href: "/me/profile", icon: <User className="w-4 h-4" /> },
      { title: "Calendar", href: "/me/calendar", icon: <Calendar className="w-4 h-4" /> },
      { title: "Notifications", href: "/me/notifications", icon: <Bell className="w-4 h-4" /> },
      { title: "Shortcuts", href: "/me/shortcuts", icon: <Keyboard className="w-4 h-4" /> },
    ],
  },
  {
    title: "Organization",
    items: [
      { title: "Users", href: "/org/users", icon: <Users className="w-4 h-4" /> },
      { title: "Profiles", href: "/org/profiles", icon: <Contact className="w-4 h-4" /> },
      { title: "Groups", href: "/org/groups", icon: <UsersRound className="w-4 h-4" /> },
      { title: "Single Sign-On", href: "/org/sso", icon: <KeyRound className="w-4 h-4" /> },
      { title: "Company Details", href: "/org/company", icon: <Building2 className="w-4 h-4" /> },
      { title: "Themes", href: "/org/themes", icon: <Palette className="w-4 h-4" /> },
    ],
  },
  {
    title: "App Settings",
    items: [
      { title: "Fields", href: "/settings/fields", icon: <Type className="w-4 h-4" /> },
      { title: "Segments", href: "/settings/segments", icon: <PieChart className="w-4 h-4" /> },
      { title: "Advertising", href: "/settings/advertising", icon: <Megaphone className="w-4 h-4" /> },
      { title: "Workflows", href: "/settings/workflows", icon: <Workflow className="w-4 h-4" /> },
      { title: "Setup", href: "/settings", icon: <Wrench className="w-4 h-4" /> },
    ],
  },
  {
    title: "AI",
    items: [
      { title: "Agent Studio", href: "/agent", icon: <Bot className="w-4 h-4" /> },
      { title: "Email Campaigns", href: "/agent/email-campaigns", icon: <Mail className="w-4 h-4" /> },
    ],
  },
  {
    title: "Experiences",
    items: [
      { title: "Automatic", href: "/experiences/automatic", icon: <Zap className="w-4 h-4" /> },
      { title: "Forms", href: "/experiences/forms", icon: <FileText className="w-4 h-4" /> },
      { title: "Buttons", href: "/experiences/buttons", icon: <MousePointerClick className="w-4 h-4" /> },
      { title: "Manual", href: "/experiences/manual", icon: <BookOpen className="w-4 h-4" /> },
      { title: "Blocks", href: "/experiences/blocks", icon: <Blocks className="w-4 h-4" /> },
    ],
  },
  {
    title: "Conversations",
    items: [
      { title: "Calls", href: "/calls", icon: <Phone className="w-4 h-4" /> },
      { title: "Streams", href: "/calls/streams", icon: <Rss className="w-4 h-4" /> },
      { title: "Routing", href: "/calls/routing", icon: <Route className="w-4 h-4" /> },
    ],
  },
];

function NavLink({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const className = cn(
    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
    active
      ? "bg-indigo-50 text-indigo-600 font-medium"
      : "text-foreground/80 hover:bg-sidebar-accent hover:text-foreground"
  );

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      <span className={cn(active ? "text-indigo-600" : "text-muted-foreground")}>{item.icon}</span>
      {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-foreground">CatchVisitors</span>
            </div>
          )}
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronRight className={cn("w-4 h-4 transition-transform", !collapsed && "rotate-180")} />
          </button>
          <button
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:bg-sidebar-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <div>
            <NavLink
              item={TOP_ITEM}
              active={isActive(TOP_ITEM.href)}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          </div>

          {GROUPS.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <div className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {group.title}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.title}
                    item={item}
                    active={isActive(item.href)}
                    collapsed={collapsed}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          {!collapsed && (
            <p className="px-2.5 text-xs text-muted-foreground">© 2026 CatchVisitors</p>
          )}
        </div>
      </div>
    </>
  );
}
