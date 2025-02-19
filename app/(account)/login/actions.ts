'use server';

import { LoginFormSchema } from '@/lib/zod/loginFormSchema';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  // Parse and validate form data
  const result = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Handle validation errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  // Extract validated data
  const { email, password } = result.data;

  // Sign in with Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Handle Supabase errors
  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  // Redirect to the dashboard on success
  revalidatePath('/')
  redirect('/')
}