import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {Routes, privateRoutes, LoginCallBackRoutes} from '@/app/config/routes';
import {AUTH_COOKIE, DEAD_COOKIE, LIVE_COOKIE} from '@/app/config/constants';
import {apiBaseUrl} from '@/app/config/endpoints';

export async function middleware(request: NextRequest) {
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;
  const loginUrl = new URL(Routes.Login, request.url);
  const homeUrl = new URL(Routes.Home, request.url);

  // Remove cookies on Logout
  if (request.nextUrl.pathname === Routes.Logout) {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(AUTH_COOKIE, '', DEAD_COOKIE);
    return response;
  }

  // Set cookies on Login
  else if (!jwt && LoginCallBackRoutes.includes(request.nextUrl.pathname)) {
    const urlSearchParams = new URLSearchParams(request.nextUrl.search)
    const params = Object.fromEntries(urlSearchParams.entries());
    const provider = request.nextUrl.pathname.replace(/^\/login\//, '');
    try {
      const token = params.access_token;
      if (token) {
        const path = `/auth/${provider}/callback`;
        const url = `${apiBaseUrl}${path}?access_token=${token}`;

        const res = await fetch(url);
        const data = await res.json();

        const response = NextResponse.redirect(homeUrl);
        response.cookies.set(AUTH_COOKIE, data.jwt, LIVE_COOKIE);
        return response;
      } else {
        throw new Error('Token is required to sign in');
      }
    } catch (error) {
      console.log('Error connecting account', error);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to login if not authenticated
  else if (!jwt && privateRoutes.includes(request.url as Routes)) {
    return NextResponse.redirect(loginUrl);
  }

  // Pass other routes
  return NextResponse.next();
}
