'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Sidebar({ collapsed, toggleSidebar }: { collapsed: boolean; toggleSidebar: () => void }) {
  const supabase = useSupabase();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserEmail(session?.user.email ?? null);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => checkSession());

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <aside
      className={`h-screen flex flex-col justify-between transition-all duration-300 bg-gray-100 border-r p-4 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top: Toggle + Nav */}
      <div>
        <button onClick={toggleSidebar} className="mb-4">
          <Menu className="h-6 w-6" />
        </button>

        {!collapsed && (
          <nav className="space-y-2">
            <Link href="/chat" className="block">Chat</Link>
            {/* Add more links here if needed */}
          </nav>
        )}
      </div>

      {/* Bottom: Profile Info */}
      {!collapsed && (
        <div className="mt-auto text-sm text-gray-600">
          {userEmail ? (
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Logged in as:</p>
              <p className="font-medium break-all">{userEmail}</p>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          )}
        </div>
      )}
    </aside>
  );
}
