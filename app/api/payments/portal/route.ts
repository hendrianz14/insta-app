import { NextResponse } from "next/server";

import { createBillingPortalSession } from "@/lib/payments/stripe";
import { serverEnv } from "@/lib/env.server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("organization_id", user.id)
    .maybeSingle();

  if (!subscription?.stripe_customer_id) {
    return NextResponse.json({ error: "No Stripe customer" }, { status: 404 });
  }

  const portal = await createBillingPortalSession(
    subscription.stripe_customer_id,
    `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing`
  );

  return NextResponse.json({ url: portal.url });
}
