import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = ['/', '/sign-in', '/sign-up'];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

}

export const config = {
  matcher: ['/organization/:path*', '/create-organization/:path*', '/board/:path*'],
};


 