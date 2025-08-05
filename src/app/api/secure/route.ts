import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Await cookies() to resolve async dynamic API warning
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

    // Get session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      console.error('Session error:', error?.message || 'No session found');
      console.error('Cookies:', cookieStore.getAll());
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user profile for personalization (optional for now)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('nursing_home_name')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError.message);
    }

    // Return user-specific data
    const { user } = session;
    return NextResponse.json({
      message: 'Authenticated route accessed successfully',
      user: {
        id: user.id,
        email: user.email,
        nursing_home_name: profile?.nursing_home_name || '',
      },
    });
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}