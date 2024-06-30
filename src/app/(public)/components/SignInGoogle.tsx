'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { loginWithGoogle } from '@/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { Spinner } from '@/components/ui/spinner';
import { PropsWithChildren } from 'react';

interface Props {
  text?: string;
}

export default function SignInGoogle({ text }: Props) {
  const [_, action] = useFormState(loginWithGoogle, undefined);
  return (
    <form action={action}>
      <SignInButton>{text ?? 'Sign-in with Google'}</SignInButton>
    </form>
  );
}

function SignInButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} type="submit" className="w-full">
      {pending ? (
        <Spinner size={'small'} style={{ marginRight: '0.5rem' }} />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
          style={{ marginRight: '0.5rem' }}
        />
      )}
      {children}
    </Button>
  );
}
