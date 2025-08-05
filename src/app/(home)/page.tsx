// src/app/(home)/page.tsx
'use client';

import { useSupabase } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">MDS Master</h1>
        <p className="mb-4">AI assistant for MDS coordinators in nursing homes.</p>
        <a href="/login" className="p-2 bg-blue-600 text-white rounded">
          Login
        </a>
      </div>
    </div>
  );
}