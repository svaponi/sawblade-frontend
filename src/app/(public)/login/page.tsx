import Link from 'next/link';
import { LoginForm } from './form';
import DividerWithText from '@/app/components/DividerWithText';
import SignInGoogle from '@/app/components/SignInGoogle';
import SignInGithub from '@/app/components/SignInGithub';

export default function Page() {
  return (
    <div className="flex flex-col p-4 lg:w-1/3">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        {/*<p className="mt-4 text-gray-500">*/}
        {/*  Enter your email below to login to your account*/}
        {/*</p>*/}
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
      <DividerWithText className="mt-4">or</DividerWithText>
      <div className="mt-4">
        <SignInGoogle />
      </div>
      <div className="mt-4">
        <SignInGithub />
      </div>
    </div>
  );
}
