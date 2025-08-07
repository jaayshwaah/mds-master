'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const supabase = useSupabase();
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<{ nursing_home_name: string | null; role: string | null } | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);

      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('nursing_home_name, role')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setProfile(data);
        }
      }
    };

    checkSession();
  }, [supabase]);

  return (
    <aside className={`flex flex-col h-screen border-r bg-gray-100 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h2 className="text-xl font-bold">MDS Master</h2>}
        <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          <Menu />
        </button>
      </div>

      {!collapsed && (
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <Link href="/chat" className="text-blue-600 hover:underline">
                Chat
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <div className="mt-auto p-4 border-t">
        {!collapsed && loggedIn && profile && (
          <div className="mb-2 text-sm text-gray-700">
            <div className="font-medium">{profile.nursing_home_name}</div>
            <div className="text-xs text-gray-500">{profile.role}</div>
          </div>
        )}
        {!collapsed && (loggedIn ? <LogoutButton /> : <Link href="/login" className="text-blue-600 hover:underline">Login</Link>)}
      </div>
    </aside>
  );
}
