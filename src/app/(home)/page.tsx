'use client';

import { useAuth } from '@/components/AuthProvider';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full w-full px-6 pt-24 md:pt-28">
      <h1 className="text-3xl font-semibold mb-2">
        Welcome to your Dashboard
      </h1>
      <p className="text-gray-600 text-lg">
        Logged in as: <span className="font-medium">{user?.email}</span>
      </p>
    </div>
  );
}
