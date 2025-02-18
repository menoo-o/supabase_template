import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware';
import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  // Call the session update function
  const sessionResponse = await updateSession(request);

  // If the session response is a redirect (e.g., to /login), return it immediately
  if (sessionResponse.headers.get('location')) {
    return sessionResponse;
  }


  // Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    return sessionResponse; // Return the session response if no user is found
  }

  const { data: userRoleData, error: userRoleError } = await supabase
  .from('user_roles')
  .select('user_role') // Updated column name
  .eq('user_id', user.id)
  .maybeSingle(); // Use .maybeSingle() to handle missing rows

if (userRoleError || !userRoleData?.user_role) {
  console.error('Middleware: User role not found or invalid:', userRoleError);
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

const role = userRoleData.user_role; // Updated variable name

  if (userRoleError || !userRoleData?.user_role) {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Redirect if role is missing
  }

 

  // Redirect based on role
  if (role === 'admin' && !request.nextUrl.pathname.startsWith('/dashboard/admin')) {
    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
  } else if (role === 'client' && !request.nextUrl.pathname.startsWith('/dashboard/client')) {
    return NextResponse.redirect(new URL('/dashboard/client', request.url));
  }

  // Return the session response
  return sessionResponse;
}

// Apply middleware to protected routes
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};