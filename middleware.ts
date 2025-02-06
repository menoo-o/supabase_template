import { updateSession } from '@/utils/supabase/middleware'
import { deleteClient } from './utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if the request is for the logout route
  const url = new URL(request.url)

  if (url.pathname === '/logout') {
    // If the user is trying to log out, call deleteClient to remove the session cookies
    await deleteClient()

    // Redirect the user to the login page or any other page after logout
    return NextResponse.redirect(new URL('/account/signup', request.url))
  }

  // Otherwise, continue updating the session
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}