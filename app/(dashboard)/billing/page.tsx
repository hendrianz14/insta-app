import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createBillingPortalSession, createCheckoutSession } from "@/lib/payments/stripe";
import { serverEnv } from "@/lib/env.server";

async function startSubscription(formData: FormData) {
  "use server";

  const customerId = formData.get("customerId");

  const checkout = await createCheckoutSession({
    customerId: typeof customerId === "string" && customerId.length > 0 ? customerId : null,
    priceId: serverEnv.STRIPE_PRICE_ID,
    successUrl: `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1`,
    cancelUrl: `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1`,
  });

  redirect(checkout.url ?? `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing`);
}

async function loadBillingPortalUrl(customerId: string | null) {
  if (!customerId) return null;

  const session = await createBillingPortalSession(
    customerId,
    `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing`
  );

  return session.url ?? null;
}

export default async function BillingPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id, plan, status")
    .eq("organization_id", user.id)
    .single();

  const billingPortalUrl = await loadBillingPortalUrl(
    subscription?.stripe_customer_id ?? null
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>
            {subscription?.plan
              ? `You are on the ${subscription.plan} plan (${subscription.status ?? "active"}).`
              : "Start a subscription to unlock all features."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <form action={startSubscription} className="space-y-2">
            <input
              type="hidden"
              name="customerId"
              defaultValue={subscription?.stripe_customer_id ?? ""}
            />
            <Button type="submit">
              {subscription?.plan ? "Manage subscription" : "Start subscription"}
            </Button>
          </form>
          {billingPortalUrl && (
            <Button asChild variant="outline">
              <a href={billingPortalUrl}>Open billing portal</a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
