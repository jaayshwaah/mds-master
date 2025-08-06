import { createMiddlewareClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { type Database } from '@/types/supabase';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  await supabase.auth.getSession(); // Sync the session cookies

  return response;
}
