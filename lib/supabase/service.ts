import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "@/lib/env.server";
import type { Database } from "@/lib/supabase/types";

export function createSupabaseServiceClient() {
  return createClient<Database>(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY
  );
}
