'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import LogoutButton from './LogoutButton';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform z-50 transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          {session && (
            <div className="mb-4">
              <LogoutButton />
            </div>
          )}
          {/* Add more links or content here later */}
        </div>
      </aside>
    </>
  );
}
