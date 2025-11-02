import { NextResponse } from "next/server";

import { createCheckoutSession, upsertCustomer } from "@/lib/payments/stripe";
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

  const customer = await upsertCustomer({
    email: user.email ?? "",
    customerId: subscription?.stripe_customer_id ?? null,
    metadata: { supabase_uid: user.id },
  });

  const checkout = await createCheckoutSession({
    customerId: customer.id,
    priceId: serverEnv.STRIPE_PRICE_ID,
    successUrl: `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1`,
    cancelUrl: `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
