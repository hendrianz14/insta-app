import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { serverEnv } from "@/lib/env.server";

async function sendMagicLink(formData: FormData) {
  "use server";

  const email = formData.get("email");

  if (typeof email !== "string" || email.length === 0) {
    return;
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${serverEnv.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  });

  if (!error) {
    redirect("/login?status=sent");
  }
}

export default function LoginPage() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Sign in</CardTitle>
          <CardDescription>We&apos;ll send you a magic link to access your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={sendMagicLink}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <Button className="w-full" type="submit">
              Send magic link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
