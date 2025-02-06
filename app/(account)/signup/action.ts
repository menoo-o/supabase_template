'use server';

import { SignupFormSchema } from '@/lib/zod/signUpSchema';
import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';

export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  // Parse and validate form data
  const result = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  // Handle validation errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  // Extract validated data
  const { firstName, lastName, email, password } = result.data;


    // Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
    .from('profiles') // Replace with 'auth.users' if you're querying the auth table
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    return {
      errors: {
        email: ['This email is already registered.'],
      },
      message: 'Email already exists.',
    };
  }

  if (fetchError) {
    return { error: "Database error. Please try again later." };
  }
  
  // Sign up with Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`, // Redirect URL after OTP verification
    },
    
 }
 
);

console.log(data);

  // Handle Supabase errors
  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  // Redirect to a confirmation page
  redirect('/auth/confirm');
}