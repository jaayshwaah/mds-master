'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [supabase, router]);

  if (loading) return null;

  return <>{children}</>;
}
