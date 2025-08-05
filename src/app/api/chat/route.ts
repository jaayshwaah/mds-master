import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Await cookies() to handle async dynamic API
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options }));
          },
        },
      }
    );

    // Verify session
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      console.error('Session error:', error?.message || 'No session found');
      console.error('Cookies:', cookieStore.getAll());
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get message
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Placeholder response (replace with n8n later)
    return NextResponse.json({
      response: `Received: "${message}". This is a placeholder response from MDS Master. n8n integration pending.`,
    });
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}