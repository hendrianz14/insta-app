import Stripe from "stripe";

import { serverEnv } from "@/lib/env.server";

export const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function createCheckoutSession(options: {
  customerId?: string | null;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: options.customerId ?? undefined,
    line_items: [{ price: options.priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
  });
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function upsertCustomer(params: {
  email: string;
  metadata?: Record<string, string>;
  customerId?: string | null;
}) {
  if (params.customerId) {
    return stripe.customers.update(params.customerId, {
      email: params.email,
      metadata: params.metadata,
    });
  }

  return stripe.customers.create({
    email: params.email,
    metadata: params.metadata,
  });
}
