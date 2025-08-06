'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/components/AuthProvider';

export default function UserInfo() {
  const [userData, setUserData] = useState<any>(null);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserData(data);
      }
    };
    fetchUser();
  }, [supabase]);

  if (!userData) return <div>Loading user info...</div>;

  return (
    <div className="p-4 bg-gray-200 rounded">
      <p>Email: {userData.email}</p>
      <p>Nursing Home: {userData.nursing_home_name}</p>
    </div>
  );
}