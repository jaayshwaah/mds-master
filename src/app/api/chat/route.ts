import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await req.json();

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
  }

  // Save user's message
  const { error: insertUserError } = await supabase.from('messages').insert({
    user_id: user.id,
    content: message,
    role: 'user',
  });

  if (insertUserError) {
    return NextResponse.json({ error: 'Failed to save user message' }, { status: 500 });
  }

  // Simulated AI response (replace this later with real logic)
  const aiResponse = `You said: "${message}". I'm your AI assistant!`;

  // Save AI response
  const { error: insertAiError } = await supabase.from('messages').insert({
    user_id: user.id,
    content: aiResponse,
    role: 'assistant',
  });

  if (insertAiError) {
    return NextResponse.json({ error: 'Failed to save AI response' }, { status: 500 });
  }

  return NextResponse.json({ reply: aiResponse });
}
