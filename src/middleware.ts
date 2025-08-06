import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: Request) {
  return updateSession(request);
}
