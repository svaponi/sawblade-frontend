import Link from 'next/link';
import { MenuIcon, SawbladeIcon } from '@/components/icons';
import { auth } from '@/auth/auth';
import { UserMenu } from '@/components/UserMenu';
import LoginButton from '@/app/(public)/login';
import { ThemeToggle } from '@/components/theme-toggle';

const publicLinks = [{ href: '/about', title: 'About' }];

const protectedLinks = [{ href: '/dashboard', title: 'Dashboard' }];
export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const links = user ? protectedLinks : publicLinks;
  const comp = user ? <UserMenu user={user} /> : <LoginButton />;
  return (
    <div className="border-b">
      <div className="container mx-auto flex max-w-7xl items-center justify-end p-4 md:justify-between md:px-6">
        <nav className="hidden items-center space-x-4 text-sm md:flex">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <SawbladeIcon className="h-6 w-6" />
            <span className="">Sawblade</span>
          </Link>
          {links.map((link) => (
            <Link className="" href={link.href} key={link.title}>
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">
          <ThemeToggle />
          {comp}
        </div>
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          {comp}
          <button className="inline-flex rounded-md md:hidden" type="button">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
