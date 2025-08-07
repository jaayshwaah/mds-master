import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('[AUTH ERROR]', userError);
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
    console.error('[DB ERROR] Failed to save user message:', insertUserError);
    return NextResponse.json({ error: 'Failed to save user message' }, { status: 500 });
  }

  // Simulated AI response (replace later with OpenAI/n8n integration)
  const aiResponse = `You said: "${message}". I'm your AI assistant!`;

  // Save assistant message
  const { error: insertAiError } = await supabase.from('messages').insert({
    user_id: user.id,
    content: aiResponse,
    role: 'assistant',
  });

  if (insertAiError) {
    console.error('[DB ERROR] Failed to save AI response:', insertAiError);
    return NextResponse.json({ error: 'Failed to save AI response' }, { status: 500 });
  }

  return NextResponse.json({ reply: aiResponse });
}
