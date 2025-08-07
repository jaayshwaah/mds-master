'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const supabase = useSupabase();
  const [loggedIn, setLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    };

    checkSession();
  }, [supabase]);

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen bg-gray-100 border-r p-4 transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{collapsed ? 'M' : 'Menu'}</h2>
          <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            <Menu />
          </button>
        </div>

        {/* Example nav links */}
        <nav className="space-y-2">
          <Link href="/" className="block text-gray-700 hover:underline">
            {collapsed ? '🏠' : 'Home'}
          </Link>
          <Link href="/chat" className="block text-gray-700 hover:underline">
            {collapsed ? '💬' : 'Chat'}
          </Link>
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t">
        {loggedIn ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">
            {collapsed ? '🔐' : 'Login'}
          </Link>
        )}
      </div>
    </aside>
  );
}
