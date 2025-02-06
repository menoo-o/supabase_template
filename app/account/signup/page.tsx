'use client';
import { useActionState } from 'react';
import { signup } from './action';

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, {
    errors: {},
    message: '',
  });

  return (
    <>
      <form action={formAction}>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
          {state.errors?.firstName && (
            <p className="text-red-500">{state.errors.firstName.join(', ')}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />
          {state.errors?.lastName && (
            <p className="text-red-500">{state.errors.lastName.join(', ')}</p>
          )}
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
          {state.errors?.confirmPassword && (
            <p className="text-red-500">{state.errors.confirmPassword.join(', ')}</p>
          )}
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </button>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </form>
    </>
  );
}