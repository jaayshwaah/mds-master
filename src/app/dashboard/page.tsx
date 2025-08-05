// src/app/dashboard/page.tsx
'use client';

import { useSupabase } from '@/components/AuthProvider';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { session, signOut } = useSupabase();

  useEffect(() => {
    if (!session) {
      // Redirect to login if no session
      window.location.href = '/login';
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
        <p>Welcome, {session.user.email}</p>
        <button onClick={signOut} className="mt-4 p-2 bg-red-600 text-white rounded">
          Logout
        </button>
      </div>
    </div>
  );
}