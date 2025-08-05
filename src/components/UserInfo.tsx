'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';

export default function UserInfo() {
  const { session, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [session, pathname, router]);

  if (!session) {
    return null; // Avoid showing flicker while redirecting
  }

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2 className="text-lg font-semibold">Logged in as:</h2>
      <p>{user?.email}</p>
    </div>
  );
}
