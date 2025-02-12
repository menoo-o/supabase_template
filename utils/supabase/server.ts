'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'


async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch(error:unknown) {
            console.error("Error setting cookies:", error);
            }
        },
      },
    }
  )
}


// New function for logout
async function deleteClient() {
  const cookieStore = await cookies()

  // This will delete the session cookies from the user's browser
  const cookiesToDelete = cookieStore.getAll()

  cookiesToDelete.forEach(({ name }) => {
    cookieStore.delete(name) // Delete the cookie by its name
  })
}


export {deleteClient, createClient}