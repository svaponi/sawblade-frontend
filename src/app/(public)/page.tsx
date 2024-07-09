import Link from 'next/link';
import { auth } from '@/auth/auth';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to our Platform
        </h1>
        <p className="text-muted-foreground mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          The all-in-one platform for building, deploying, and managing modern
          web apps.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
        {user ? (
          <Link href="/dashboard">
            <Button variant={'outline'}>Enter</Button>
          </Link>
        ) : (
          <Link href="/signup">
            <Button variant={'outline'}>Sign up</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
