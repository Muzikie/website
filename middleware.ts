import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {Routes, privateRoutes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';

export async function middleware(request: NextRequest) {
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;
  const loginUrl = new URL(Routes.Login, request.url);

  // Redirect to login if not authenticated
  if (!jwt && privateRoutes.includes(request.url as Routes)) {
    return NextResponse.redirect(loginUrl);
  }

  // Pass other routes
  return NextResponse.next();
}
