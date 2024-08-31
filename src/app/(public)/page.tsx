import { auth } from '@/auth/auth';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="mt-20">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Welcome to Sawblade
      </h1>
      <p className="mx-auto mt-4 max-w-[600px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        The Ultimate German Swiss Knife
      </p>
      {/*<div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">*/}
      {/*  {user ? (*/}
      {/*    <Link href="/dashboard">*/}
      {/*      <Button variant={'outline'}>Enter</Button>*/}
      {/*    </Link>*/}
      {/*  ) : (*/}
      {/*    <Link href="/signup">*/}
      {/*      <Button variant={'outline'}>Sign up</Button>*/}
      {/*    </Link>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}
