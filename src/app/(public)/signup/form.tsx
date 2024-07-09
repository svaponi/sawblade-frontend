'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/actions/authcredentials';
import { useFormState, useFormStatus } from 'react-dom';
import { InputCSRF } from '@/components/InputCSRF';

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <InputCSRF />
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>
        {state?.errors?.name && (
          <p className="text-destructive text-sm">{state.errors.name}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="jdoe@example.com" />
        </div>
        {state?.errors?.email && (
          <p className="text-destructive text-sm">{state.errors.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div className="text-destructive text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        {state?.message && (
          <p className="text-destructive text-sm">{state.message}</p>
        )}
        <SignupButton />
      </div>
    </form>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-4 w-full">
      {pending ? 'Submitting...' : 'Sign up'}
    </Button>
  );
}
