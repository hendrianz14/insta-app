import { ShieldCheck, CreditCard, Sparkles, Rocket } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    name: "Authentication",
    description: "Supabase Auth with server helpers, RLS policies, and client hooks ready to go.",
    icon: ShieldCheck,
  },
  {
    name: "Billing",
    description: "Stripe subscription checkout, billing portal, and webhook handlers included.",
    icon: CreditCard,
  },
  {
    name: "UI kit",
    description: "shadcn/ui components styled with Tailwind CSS for rapid iteration.",
    icon: Sparkles,
  },
  {
    name: "Deploy fast",
    description: "Optimized defaults for Vercel, Supabase migrations, and automated testing.",
    icon: Rocket,
  },
];

export function Features() {
  return (
    <section id="features" className="container space-y-8 pb-24">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">Everything you need to launch</h2>
        <p className="text-muted-foreground">
          Opinionated defaults for marketing pages, dashboards, and API routes.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.name} className="h-full">
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary" />
              <CardTitle>{feature.name}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Developer experience focused defaults help you stay productive from day one.
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
