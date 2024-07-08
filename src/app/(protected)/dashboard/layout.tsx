import { LogOutIcon, SawbladeIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { auth } from '@/auth/auth';
import { UserMenu } from '@/app/components/UserMenu';
import NavLinks from '@/app/(protected)/dashboard/components/NavLinks';
import { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { redirect } from 'next/navigation';
import { User } from 'next-auth';
import { getPathname } from '@/lib/path';

const navLinks = [
  { title: 'Home', href: '/dashboard' },
  { title: 'Users', href: '/dashboard/users', role: 'admin' },
  { title: 'Photos', href: '/dashboard/photos' },
  { title: 'Photos V2', href: '/dashboard/photos-infinite-scroll' },
  { title: 'Invoices', href: '/dashboard/invoices', role: 'admin' },
  { title: 'Products', href: '/dashboard/products' },
];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return redirect('/noauth');
  }
  const isAdmin = user.role === 'admin';
  if (!isAdmin) {
    const pathname = getPathname();
    const adminPaths = navLinks
      .filter((link) => link.role === 'admin')
      .map((link) => link.href);
    if (adminPaths.some((path) => pathname.startsWith(path))) {
      return redirect('/noauth');
    }
  }
  const sidebarWidth = '20rem';
  const headerHeight = '4rem';
  return (
    <div className="flex h-screen">
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
  );
}

async function Header({ user }: { user: User }) {
  return (
    <header className="flex h-full items-center px-4 md:gap-4">
      <div className="flex h-14 items-center px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <SawbladeIcon className="h-6 w-6" />
          <span className="">Sawblade</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <form>
          <div className="relative">
            <Input
              className="bg-gray-100/60 md:w-[200px]"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </form>
        <ThemeToggle />
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

async function Sidebar({ user }: { user: User }) {
  const links = navLinks.filter(
    (link) => link.role === undefined || link.role === user?.role,
  );
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1 overflow-auto py-2">
        <NavLinks navLinks={links} />
      </div>
      <div className="border-t p-4">
        <Link href={'/'}>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900">
            <LogOutIcon className="h-4 w-4" />
            Exit dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
