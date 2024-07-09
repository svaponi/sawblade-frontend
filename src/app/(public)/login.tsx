'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const paths = ['/login', '/signup'];
export default function LoginButton() {
  const pathname = usePathname();
  if (paths.includes(pathname)) return null;
  return (
    <Link
      className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors"
      href={'/login'}
    >
      Login
    </Link>
  );
}
