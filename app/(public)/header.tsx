import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';
import { auth } from '@/auth/auth';
import { UserMenu } from '@/app/components/UserMenu';
import LoginButton from '@/app/(public)/login';

const publicLinks = [
  { href: '/', title: 'Home' },
  { href: '#', title: 'About' },
  { href: '#', title: 'Services' },
  { href: '#', title: 'Contact' },
];

const protectedLinks = [
  { href: '/', title: 'Home' },
  { href: '/dashboard', title: 'Dashboard' },
];
export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const links = user ? protectedLinks : publicLinks;
  const comp = user ? <UserMenu user={user} /> : <LoginButton />;
  return (
    <div className="border-b border-gray-100">
      <div className="container mx-auto flex max-w-7xl items-center justify-end p-4 md:justify-between md:px-6">
        <nav className="hidden items-center space-x-4 text-sm md:flex">
          {links.map((link) => (
            <Link className="text-gray-900" href={link.href} key={link.title}>
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">{comp}</div>
        <div className="flex items-center space-x-4 md:hidden">
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
