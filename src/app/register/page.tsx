'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Registration error:', error.message);
      setMessage(`❌ ${error.message}`);
    } else {
      console.log('Registration successful:', data);
      setMessage('✅ Registration successful! Check your email to confirm.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 border rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 border rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Register
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
