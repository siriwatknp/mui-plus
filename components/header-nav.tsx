"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function HeaderNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/theme-preview", label: "Theme" },
    { href: "/ai", label: "AI Elements" },
    { href: "/authentication", label: "Authentication" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const getFirstSegment = (path: string) => {
    return path.split("/")[1] || "";
  };

  const currentSegment = getFirstSegment(pathname);

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const itemSegment = getFirstSegment(item.href);
        const isActive = currentSegment === itemSegment;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors relative group ${
              isActive ? "bg-muted text-foreground" : "hover:bg-muted/50"
            }`}
          >
            {item.label}
            {item.href === "/ai" && (
              <Badge
                variant="outline"
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs h-4 px-1.5 group-hover:animate-pulse group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-yellow-500 group-hover:via-green-500 group-hover:via-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
              >
                AI SDK v5
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
