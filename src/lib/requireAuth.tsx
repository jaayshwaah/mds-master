'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push(`/login?callbackUrl=${window.location.pathname}`);
    }
  }, [session, router]);

  if (!session) {
    return null; // or show a loading spinner
  }

  return <>{children}</>;
}
