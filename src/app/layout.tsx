// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MDS Master',
  description: 'AI assistant for MDS Coordinators',
};

import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen">
            <Sidebar
              collapsed={!isSidebarOpen}
              toggleSidebar={() => setSidebarOpen((prev) => !prev)}
            />
            <main className="flex-1 overflow-auto bg-white dark:bg-black">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
