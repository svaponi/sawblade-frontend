import { LogOutIcon, SawbladeIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { auth } from '@/auth/auth';
import { UserMenu } from '@/app/components/UserMenu';
import NavLinks from '@/app/(protected)/dashboard/components/NavLinks';
import { PropsWithChildren } from 'react';
import { getUsersCount } from '@/app/(protected)/dashboard/users/actions';
import { getPhotoCount } from '@/app/(protected)/dashboard/photos/actions';

const navLinks = [
  { title: 'Home', href: '/dashboard' },
  { title: 'Users', href: '/dashboard/users' },
  { title: 'Products', href: '/dashboard/products' },
  { title: 'Photos', href: '/dashboard/photos' },
];

export default async function Layout({ children }: PropsWithChildren) {
  const sidebarWidth = '20rem';
  const headerHeight = '4rem';
  return (
    <div className="flex h-screen">
      <header
        className={`bg-primary fixed left-0 top-0 z-10 w-full border-b`}
        style={{ height: headerHeight, backdropFilter: 'blur(16px)' }}
      >
        <Header />
      </header>
      <aside
        className={`fixed left-0 top-0 h-full flex-shrink-0 border-r`}
        style={{ width: sidebarWidth, marginTop: headerHeight }}
      >
        <Sidebar />
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

async function Header() {
  const session = await auth();
  const user = session?.user;
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
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

async function Sidebar() {
  const [userCount, photoCount] = await Promise.all([
    getUsersCount(),
    getPhotoCount(),
  ]);
  const links = navLinks.map((link) => {
    if (link.title === 'Users') {
      return { ...link, badge: userCount };
    } else if (link.title === 'Photos') {
      return { ...link, badge: photoCount };
    } else {
      return link;
    }
  });
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
