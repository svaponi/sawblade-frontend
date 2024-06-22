import { NextResponse } from 'next/server';
import { auth } from '@/auth/auth.edge';

const protectedRoutes = ['/dashboard'];
const loginRoutes = ['/login', '/signup'];

export default auth((req) => {
  if (req.auth && loginRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
  }
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
