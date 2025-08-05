'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthProvider';

export default function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const { session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
    router.push('/login');
  };

  if (!session) return null;

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
    >
      Log out
    </button>
  );
}
