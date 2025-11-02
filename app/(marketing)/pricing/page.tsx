import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "Everything you need to validate your idea.",
    features: ["Up to 3 projects", "Community support", "Email magic links"],
    cta: "Get started",
    href: "/dashboard",
  },
  {
    name: "Growth",
    price: "$29",
    description: "Unlock advanced collaboration features.",
    features: ["Unlimited projects", "Team access controls", "Usage analytics"],
    cta: "Upgrade",
    href: "/dashboard/billing",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description: "Enterprise security, support, and SLAs.",
    features: ["SAML SSO", "Audit logging", "Dedicated success manager"],
    cta: "Contact sales",
    href: "mailto:sales@example.com",
  },
];

export default function PricingPage() {
  return (
    <div className="container space-y-10 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold">Flexible pricing that grows with you</h1>
        <p className="text-muted-foreground">
          Choose a plan tailored to your team. Upgrade or downgrade at any time.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.highlighted ? "border-primary shadow-lg" : undefined}
          >
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-semibold">{tier.price}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
