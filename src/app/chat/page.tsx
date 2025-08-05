'use client';

import { useState, useEffect, useRef } from 'react';
import { useSupabase } from '@/components/AuthProvider';
import Link from 'next/link';

export default function ChatPage() {
  const { session, signOut } = useSupabase();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<{ nursing_home_name?: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/secure');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
        } else {
          console.error('Failed to fetch profile:', await res.json());
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
    fetchProfile();
  }, []);

  // Redirect to login if not authenticated
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg">
          Please <Link href="/login" className="text-blue-600 hover:underline">log in</Link> to access MDS Master.
        </p>
      </div>
    );
  }

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Call chat API
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.error || 'Error: No response' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error connecting to chat service' }]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">MDS Master</h2>
        <button
          onClick={signOut}
          className="mt-auto bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b">
          <p className="text-lg">
            Welcome, {session.user.email}{' '}
            {profile?.nursing_home_name ? `from ${profile.nursing_home_name}` : ''}
          </p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 p-3 rounded-lg max-w-[70%] ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-200 text-gray-900 mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about MDS assessments..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}