'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';

export default function Sidebar() {
  const supabase = useSupabase();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    };

    checkSession();
  }, [supabase]);

  return (
    <aside className="w-64 p-4 border-r h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      {loggedIn && <LogoutButton />}
    </aside>
  );
}
