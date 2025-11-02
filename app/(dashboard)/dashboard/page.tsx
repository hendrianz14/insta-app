import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardHomePage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Welcome back, {user.email}</CardTitle>
          <CardDescription>
            Track usage, manage billing, and invite collaborators from your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-dashed p-6">
              <p className="text-sm text-muted-foreground">Active members</p>
              <p className="mt-2 text-3xl font-semibold">3</p>
            </div>
            <div className="rounded-lg border border-dashed p-6">
              <p className="text-sm text-muted-foreground">Monthly revenue</p>
              <p className="mt-2 text-3xl font-semibold">$2.4k</p>
            </div>
          </div>
          <Button>Invite teammate</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
          <CardDescription>Finish setting up your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-border/60 bg-muted/40 p-4 text-sm">
            Connect your Stripe account to enable billing.
          </div>
          <div className="rounded-md border border-border/60 bg-muted/40 p-4 text-sm">
            Configure Supabase Row Level Security policies.
          </div>
          <Button variant="outline">View checklist</Button>
        </CardContent>
      </Card>
    </div>
  );
}
