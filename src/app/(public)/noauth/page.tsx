import Link from 'next/link';

export default async function Page() {
  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Access Denied
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          You are not authorized to view this page. Please contact the
          <Link
            href={'mailto:admin@example.com'}
            className={'text-accent-foreground m-1'}
          >
            administrator
          </Link>
          for more information.
        </p>
      </div>
    </div>
  );
}
