// src/components/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Session, SupabaseClient, AuthError } from '@supabase/supabase-js';  // Import types from @supabase/supabase-js

interface AuthContextType {
  supabase: SupabaseClient;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const Context = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, [supabase]);

  const value: AuthContextType = {
    supabase,
    session,
    isLoading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <Context.Provider value={value}>
      {!isLoading && children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used within an AuthProvider');
  }
  return context;
};