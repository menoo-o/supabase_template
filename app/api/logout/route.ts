import { NextResponse, NextRequest } from 'next/server'
import { deleteClient } from '../../../utils/supabase/server'


export async function GET(request: NextRequest) {
    // Call deleteClient to remove the session cookies
    await deleteClient()
  
    // Redirect the user to the login page after logout
    return NextResponse.redirect(new URL('/', request.url))
  }