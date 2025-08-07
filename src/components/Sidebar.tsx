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
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    };
    checkSession();
  }, [supabase]);

  return (
    <aside
      className={`flex flex-col justify-between h-screen bg-gray-100 border-r transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {collapsed ? '🤖' : 'MDS Bot'}
          </h2>
          <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle Sidebar">
            <Menu size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="block text-gray-800 hover:underline">
            {collapsed ? '🏠' : 'Home'}
          </Link>
          <Link href="/chat" className="block text-gray-800 hover:underline">
            {collapsed ? '💬' : 'Chat'}
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t">
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
