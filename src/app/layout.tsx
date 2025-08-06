// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MDS Master',
  description: 'AI assistant for MDS coordinators',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4 border-r shadow-md">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                    <Link href="/chat" className="text-blue-600 hover:underline">Chat</Link>
                    <Link href="/test" className="text-blue-600 hover:underline">Test Page</Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                    <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                  </>
                )}
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
