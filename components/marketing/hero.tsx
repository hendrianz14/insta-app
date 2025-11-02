import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 py-24 text-center">
      <Badge variant="secondary" className="px-4">
        Built with Next.js 14, Supabase, and Stripe
      </Badge>
      <div className="space-y-4">
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
          Launch modern subscription products in minutes.
        </h1>
        <p className="text-balance text-lg text-muted-foreground sm:text-xl">
          Ship secure authentication, dashboards, and billing flows with a production-ready
          Supabase + Stripe starter kit.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard">Open the dashboard</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#features">View features</Link>
        </Button>
      </div>
    </section>
  );
}
