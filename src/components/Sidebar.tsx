'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const supabase = useSupabase();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser(); // re-check user on login/logout
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <aside
      className={`h-screen flex flex-col justify-between border-r bg-gray-100 text-sm transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top section */}
      <div className="p-4">
        <button
          className="mb-4 text-gray-600 hover:text-black"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
        {!collapsed && (
          <h2 className="text-xl font-bold">MDS Chat</h2>
        )}
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t text-gray-600">
        {userEmail ? (
          !collapsed && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Signed in as:</span>
              <span className="text-sm truncate">{userEmail}</span>
              <LogoutButton />
            </div>
          )
        ) : (
          !collapsed && (
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          )
        )}
      </div>
    </aside>
  );
}
