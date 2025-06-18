import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// Apply middleware only to protected paths
export const config = {
  matcher: ['/dashboard/:path*'], // applies to /dashboard and all subroutes
};