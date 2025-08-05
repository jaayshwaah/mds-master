'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.pathname));
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
