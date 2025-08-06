'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/AuthProvider';

export const dynamic = 'force-dynamic'; // ✅ disables prerendering

export default function HomePage() {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      }
    };

    getSession();
  }, [supabase, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MDS Master</h1>
      <p className="text-lg text-gray-600">You're logged in and ready to go.</p>
    </main>
  );
}
