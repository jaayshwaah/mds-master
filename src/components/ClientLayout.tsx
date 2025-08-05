'use client';

import { useState } from 'react';
import LogoutButton from './LogoutButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg z-40 transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <LogoutButton onLogout={() => setMenuOpen(false)} />
      </div>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded shadow-md"
      >
        ☰
      </button>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          menuOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
