'use client';

import { useState } from 'react';
import AuthProvider from '@/components/AuthProvider';import Sidebar from '@/components/Sidebar';
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
