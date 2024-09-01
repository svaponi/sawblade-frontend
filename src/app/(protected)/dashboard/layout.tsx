import { LogOutIcon, SawbladeIcon } from '@/components/icons';
import Link from 'next/link';
import { auth } from '@/auth/auth';
import { UserMenu } from '@/components/UserMenu';
import NavLinks from '@/components/NavLinks';
import { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { redirect } from 'next/navigation';
import { User } from 'next-auth';
import { getPathname } from '@/lib/path';

const navLinks = [
  { title: 'Home', href: '/dashboard', roles: ['admin', null] },
  { title: 'Users', href: '/dashboard/users', roles: ['admin'] },
  { title: 'APIs', href: '/dashboard/apis', roles: ['admin'] },
  { title: 'Clients', href: '/dashboard/clients', roles: ['admin'] },
  {
    title: 'Client Audiences',
    href: '/dashboard/client-audiences',
    roles: ['admin'],
  },
  {
    title: 'Photos',
    href: '/dashboard/photos-infinite-scroll',
    roles: ['admin', null],
  },
  {
    title: 'Photos Basic',
    href: '/dashboard/photos',
    roles: ['admin'],
  },
  { title: 'Invoices', href: '/dashboard/invoices', roles: ['admin'] },
  { title: 'Products', href: '/dashboard/products', roles: ['admin'] },
];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return redirect('/noauth');
  }
  const pathname = getPathname();
  const allowedPaths = navLinks
    .filter((link) => link.roles.includes(user.role ?? null))
    .map((link) => link.href);
  if (!allowedPaths.some((path) => pathname.startsWith(path))) {
    return redirect('/noauth');
  }
  const sidebarWidth = '20rem';
  const headerHeight = '4rem';
  return (
    <>
      <div className="flex h-screen flex-col lg:hidden">
        <header
          className={`fixed left-0 top-0 z-10 w-full border-b`}
          style={{ height: headerHeight, backdropFilter: 'blur(16px)' }}
        >
          <Header user={user} />
        </header>
        <div className="min-w-0 flex-1">
          <main className={`p-4`} style={{ marginTop: headerHeight }}>
            Your device is too small.
          </main>
        </div>
        <div className="border-t p-4">
          <Link href={'/'}>
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all">
              <LogOutIcon className="h-4 w-4" />
              Exit dashboard
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden h-screen lg:flex">
        <header
          className={`fixed left-0 top-0 z-10 w-full border-b`}
          style={{ height: headerHeight, backdropFilter: 'blur(16px)' }}
        >
          <Header user={user} />
        </header>
        <aside
          className={`fixed left-0 top-0 h-full flex-shrink-0 border-r`}
          style={{ width: sidebarWidth, paddingTop: headerHeight }}
        >
          <Sidebar user={user} />
        </aside>

        <div className="min-w-0 flex-1">
          <main
            className={`p-4`}
            style={{ marginLeft: sidebarWidth, marginTop: headerHeight }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

async function Header({ user }: { user: User }) {
  return (
    <header className="flex h-full items-center px-4 md:gap-4">
      <div className="flex h-14 items-center px-4">
        <Link className="flex items-center gap-2" href="/">
          <SawbladeIcon className="h-6 w-6" />
          <span className="font-semibold">Sawblade</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/*<form>*/}
        {/*  <div className="relative">*/}
        {/*    <Input*/}
        {/*      className="bg-muted md:w-[200px]"*/}
        {/*      placeholder="Search orders..."*/}
        {/*      type="search"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</form>*/}
        <ThemeToggle />
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

async function Sidebar({ user }: { user: User }) {
  const links = navLinks.filter((link) =>
    link.roles.includes(user.role ?? null),
  );
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1 overflow-auto py-2">
        <NavLinks navLinks={links} />
      </div>
      <div className="border-t p-4">
        <Link href={'/'}>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all">
            <LogOutIcon className="h-4 w-4" />
            Exit dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
