'use client';

import RequireAuth from '@/components/RequireAuth';
import UserInfo from '@/components/UserInfo';

export default function TestPage() {
  return (
    <RequireAuth>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Protected Test Page</h1>
        <UserInfo />
      </div>
    </RequireAuth>
  );
}
