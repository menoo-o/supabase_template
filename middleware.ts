import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Check if the request is for the logout route
  const url = new URL(request.url)

  if (url.pathname === '/logout') {
    return NextResponse.redirect(new URL('/api/logout', request.url));
  }

  return await updateSession(request) // Call the session update function


}

export const config = {
  matcher: [
    "/dashboard/:path*", // ✅ Runs only on /admin and subpaths
  ],
};