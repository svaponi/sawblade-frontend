'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

type NavLink = {
  title: string;
  href: string;
  badge?: number;
  role?: string;
};

type Props = {
  navLinks: NavLink[];
};

export default function NavLinks({ navLinks }: Props) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 px-4 py-2">
      {navLinks.map((link) => (
        <Link href={link.href} key={link.title}>
          <Button variant={pathname === link.href ? 'default' : 'ghost'}>
            <span>{link.title}</span>
            {link.badge ? (
              <Badge className="ml-auto">{link.badge}</Badge>
            ) : null}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
