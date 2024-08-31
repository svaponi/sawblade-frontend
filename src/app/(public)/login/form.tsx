'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/actions/authcredentials';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { InputCSRF } from '@/components/InputCSRF';

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action}>
      <InputCSRF />
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="jdoe@example.com" />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email}</p>
        )}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" name="password" />
          {state?.errors?.password && (
            <p className="text-sm text-destructive">{state.errors.password}</p>
          )}
        </div>
        <div className="m-2 text-center">
          {state?.message && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}
        </div>
        <LoginButton />
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="w-full">
      {pending ? 'Submitting...' : 'Login'}
    </Button>
  );
}
