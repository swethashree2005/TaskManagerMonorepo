// lib/getUserSession.ts
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/ssr'

export async function getUserSession() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  return { user: session?.user || null };
}
