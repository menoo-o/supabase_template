'use client';


import { useActionState } from 'react';
import { login } from './actions';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, {
    errors: {},
    message: '',
  });

  return (
    <>

      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          {state.errors?.email && (
            <p className="text-red-500">{state.errors.email.join(', ')}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          {state.errors?.password && (
            <p className="text-red-500">{state.errors.password.join(', ')}</p>
          )}
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Logging In...' : 'Login'}
        </button>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </form>

      <br />
      <p>dont have a account? <Link href='/signup'>Signup</Link> </p>
    </>
  );
}