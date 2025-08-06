import { NextResponse } from 'next/server';
import { createServerClientInstance } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Secure content', user });
}
