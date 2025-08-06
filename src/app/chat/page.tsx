'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/AuthProvider';

export default function ChatPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
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
      <h1 className="text-2xl font-bold mb-2">Chat</h1>
      {profile && (
        <p className="text-sm text-gray-600 mb-4">
          Nursing Home: {profile.nursing_home_name}
        </p>
      )}
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessages([...messages, { role: 'user', content: input }]);
          setInput('');
        }}
      >
        <input
          type="text"
          className="border p-2 rounded w-full mb-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </main>
  );
}
