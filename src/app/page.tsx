// src/app/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

export default async function HomePage() {
  const cookieStore = await cookies(); // <- await here

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome {user?.email || 'Guest'}!</h1>
      <p>This is your homepage.</p>
    </main>
  );
}
