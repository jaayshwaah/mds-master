// src/app/api/chat/route.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function POST(req: Request) {
  const supabase = createServerComponentClient<Database>({ cookies });
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

  // For now, simulate a response (later we'll connect n8n or OpenAI)
  const aiResponse = `You said: "${message}". I'm your AI assistant!`;

  return NextResponse.json({ reply: aiResponse });
}
