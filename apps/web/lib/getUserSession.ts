// lib/getUserSession.ts
import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr";


export async function getUserSession() {
  const supabase = createServerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  return { user: session?.user || null };
}
