// lib/getUserSession.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function getUserSession() {
  // ✅ Await the cookies() call
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // ✅ Now cookieStore is resolved, so .get() works
          return cookieStore.get(name)?.value;
        },
        set() {
          // No-op (Next.js cookies are read-only here)
        },
        remove() {
          // No-op
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { user: session?.user || null };
}
