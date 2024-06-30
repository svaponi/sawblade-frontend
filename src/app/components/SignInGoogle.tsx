'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { loginWithGoogle } from '@/app/(public)/login/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Spinner } from '@/components/ui/spinner';

export default function SignInGoogle() {
  const [_, action] = useFormState(loginWithGoogle, undefined);
  return (
    <form action={action}>
      <SignInButton />
    </form>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} type="submit" className="w-full">
      {pending ? (
        <Spinner size={"small"} style={{ marginRight: '0.5rem' }} />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
          style={{ marginRight: '0.5rem' }}
        />
      )}
      Login with Google
    </Button>
  );
}
