// src/app/api/secure/route.ts

import { NextResponse } from 'next/server';
import { createServerClientInstance } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createServerClientInstance();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: `Welcome, ${user.email}` });
}
