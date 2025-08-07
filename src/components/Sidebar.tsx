'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default function Sidebar() {
  const supabase = useSupabase();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };

    checkSession();
  }, [supabase]);

  return (
    <aside className="w-64 h-screen flex flex-col justify-between border-r bg-gray-100 text-sm">
      {/* Top section */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">MDS Chat</h2>
        {/* You can add navigation links here */}
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t text-gray-600">
        {userEmail ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Signed in as:</span>
            <span className="text-sm truncate">{userEmail}</span>
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        )}
      </div>
    </aside>
  );
}
