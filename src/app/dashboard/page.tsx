'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/AuthProvider';

export default function DashboardPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [profile, setProfile] = useState<{ nursing_home_name?: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('nursing_home_name')
        .eq('id', session.user.id)
        .single();

      setProfile(profileData);
    };

    fetchProfile();
  }, [supabase, router]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {profile ? (
        <p className="text-gray-600">Nursing Home: {profile.nursing_home_name}</p>
      ) : (
        <p>Loading profile...</p>
      )}
    </main>
  );
}
