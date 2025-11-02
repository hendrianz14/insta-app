import { ReactNode } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireSession } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireSession();

  return <DashboardShell>{children}</DashboardShell>;
}
