'use server';

import { SignupFormSchema } from '@/lib/zod/signUpSchema';
import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
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
  });

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