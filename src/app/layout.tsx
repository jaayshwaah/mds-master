// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import ProvidersWrapper from '@/components/RootClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MDS Master',
  description: 'AI assistant for MDS Coordinators',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}

// src/components/RootClient.tsx

'use client';

import { useState } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
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
  );
}
