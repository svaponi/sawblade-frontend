'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

type NavLink = {
  title: string;
  href: string;
  badge?: number;
};

type Props = {
  navLinks: NavLink[];
};

export default function NavLinks({ navLinks }: Props) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {navLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? 'bg-gray-100 text-gray-900 hover:text-gray-900'
              : '',
            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
          )}
          href={link.href}
          key={link.title}
        >
          <span>{link.title}</span>
          {link.badge ? <Badge className="ml-auto">{link.badge}</Badge> : null}
        </Link>
      ))}
    </nav>
  );
}
