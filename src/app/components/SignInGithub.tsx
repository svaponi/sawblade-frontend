'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';
import { loginWithGithub } from '@/app/(public)/login/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function SignInGithub() {
  const [_, action] = useFormState(loginWithGithub, undefined);
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
        <Spinner size={'small'} style={{ marginRight: '0.5rem' }} />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height="24"
          width="24"
          style={{ filter: 'invert(1)', marginRight: '0.5rem' }}
        />
      )}
      Login with Github
    </Button>
  );
}
