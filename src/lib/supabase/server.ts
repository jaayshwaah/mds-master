'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { type Database } from '@/types/supabase';

export async function createServerClientInstance() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set(name, value, options);
      },
      remove(name, options) {
        cookieStore.delete(name, options);
      },
    }
  );
}
