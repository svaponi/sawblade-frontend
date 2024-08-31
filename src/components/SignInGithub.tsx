'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import Image from 'next/image';
import { loginWithGithub } from '@/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { PropsWithChildren } from 'react';
import { useTheme } from 'next-themes';

interface Props {
  text?: string;
}

export default function SignInGithub({ text }: Props) {
  const [_, action] = useFormState(loginWithGithub, undefined);
  return (
    <form action={action}>
      <SignInButton>{text ?? 'Sign-in with Github'}</SignInButton>
    </form>
  );
}

function SignInButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  const { resolvedTheme } = useTheme();
  return (
    <Button aria-disabled={pending} type="submit" className="w-full">
      {pending ? (
        <Spinner
          size={'small'}
          className="dark:invert"
          style={{ marginRight: '0.5rem' }}
        />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height="24"
          width="24"
          className="invert dark:invert-0"
          style={{ marginRight: '0.5rem' }}
        />
      )}
      {children}
    </Button>
  );
}
