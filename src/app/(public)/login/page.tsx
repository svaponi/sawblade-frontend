import Link from 'next/link';
import { LoginForm } from './form';
import DividerWithText from '@/components/DividerWithText';
import SignInGoogle from '@/components/SignInGoogle';
import SignInGithub from '@/components/SignInGithub';

export default function Page() {
  return (
    <div className="min-w-[300px] sm:w-1/2 lg:w-1/3">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
      </div>
      <div className="my-6">
        <LoginForm />
      </div>
      <div className="my-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
      <DividerWithText className="my-4">or</DividerWithText>
      <div className="my-4">
        <SignInGoogle text={'Login with Google'} />
      </div>
      <div className="my-4">
        <SignInGithub text={'Login with GitHub'} />
      </div>
    </div>
  );
}
