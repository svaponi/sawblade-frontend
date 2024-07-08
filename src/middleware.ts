import { NextResponse } from 'next/server';
import { auth } from '@/auth/auth.edge';

const protectedRoutes = ['/dashboard'];
const loginRoutes = ['/login', '/signup'];

function isUserAuthenticated(auth: any): boolean {
  // You want to check for `auth?.user` because in case of a config error you'll get back an `auth` object that looks like this:
  // { message: 'There was a problem with the server configuration. Check the server logs for more information.' }
  return auth?.user ?? false;
}

export default auth((req) => {
  try {
    // FIXME why user role is not available here?
    const isAuth = isUserAuthenticated(req.auth);
    if (isAuth && loginRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }
    if (!isAuth && protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
    const headers = new Headers(req.headers);
    headers.set('x-pathname', req.nextUrl.pathname);
    return NextResponse.next({ request: { headers } });
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
