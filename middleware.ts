import { createClient } from './utils/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Step 1: Create Supabase client
  const supabase = await createClient();

  // Step 2: Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    console.error('Middleware: User not authenticated:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Step 3: Check if the user is an admin
  const { data: adminData, error: adminError } = await supabase
    .from('admin_info')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (adminError) {
    console.error('Middleware: Error checking admin status:', adminError);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is an admin, allow access to /dashboard/admin
  if (adminData) {
    if (!request.nextUrl.pathname.startsWith('/dashboard/admin')) {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    return NextResponse.next(); // Allow access to admin routes
  }

  // Step 4: Check if the user is a client
  const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (clientError) {
    console.error('Middleware: Error fetching client info:', clientError);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is a client, restrict access to /dashboard/admin
  if (clientData) {
    if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
      return NextResponse.redirect(new URL('/dashboard/user', request.url)); // Redirect clients away from admin pages
    }
    if (!request.nextUrl.pathname.startsWith('/dashboard/user')) {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }
    return NextResponse.next(); // Allow access to client routes
  }

  // Default redirect if the role is not recognized
  return NextResponse.redirect(new URL('/login', request.url));
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*'], // Protect all dashboard routes
};