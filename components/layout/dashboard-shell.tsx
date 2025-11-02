"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/dashboard" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Settings", href: "/dashboard/settings" },
];

export function DashboardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              IA
            </span>
            <span>Insta App</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/">Back to marketing</Link>
            </Button>
            <Button variant="default">New project</Button>
          </div>
        </div>
        <Separator className="bg-border/60" />
        <div className="container flex items-center gap-2 overflow-x-auto py-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                pathname?.startsWith(item.href)
                  ? "bg-primary/10 text-primary"
                  : undefined
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </header>
      <main className={cn("container flex-1 py-10", className)}>{children}</main>
    </div>
  );
}
