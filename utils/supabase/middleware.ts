import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {

  let supabaseResponse = NextResponse.next({ request, })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {
      cookies: {
        
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          // Update request cookies (name and value only)
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
        
          // Create a new response object
          supabaseResponse = NextResponse.next({ request });
        
          // Update response cookies with options
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        }
      },
    }
  )
  
  const { data: { user }, } = await supabase.auth.getUser()
  
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}