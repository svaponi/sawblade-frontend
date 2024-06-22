'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const paths = ['/login', '/signup'];
export default function LoginButton() {
  const pathname = usePathname();
  if (paths.includes(pathname)) return null;
  return (
    <Link
      // className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
      className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
      href={'/login'}
    >
      Login
    </Link>
  );
}
