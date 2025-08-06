import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { type Database } from '@/types/supabase';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient<Database>(
    request,
    response,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set(name, value, options);
        },
        remove(name, options) {
          response.cookies.delete(name, options);
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Optional: redirect unauthenticated users
  // if (!user) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return response;
}
