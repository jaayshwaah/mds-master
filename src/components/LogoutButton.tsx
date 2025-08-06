'use client';

import { useRouter } from 'next/navigation';
import { useSupabase } from './AuthProvider';

export default function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const supabase = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline"
    >
      Log Out
    </button>
  );
}
