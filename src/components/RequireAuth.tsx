'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/auth');
  }, [session, router]);

  if (!session) return <div>Loading...</div>;

  return <>{children}</>;
}