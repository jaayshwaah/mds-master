import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { type Database } from '../../types/supabase';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient<Database>({
    req: request,
    res: response,
  });

  await supabase.auth.getSession(); // sync cookies

  return response;
}
