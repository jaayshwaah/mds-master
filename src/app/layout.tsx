// src/components/Layout.tsx

'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Automatically close sidebar on mobile view or login page
    if (pathname === '/login') setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-white dark:bg-black">
        {children}
      </main>
    </div>
  );
}
