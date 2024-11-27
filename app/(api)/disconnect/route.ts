import {NextResponse} from 'next/server';

import {AUTH_COOKIE, DEAD_COOKIE} from '@/app/config/constants';

export const dynamic = 'force-dynamic'; 
export async function GET() {
  try {
    const response = NextResponse.json({success: true});
    response.cookies.set(AUTH_COOKIE, '', DEAD_COOKIE);
    return response;
  } catch (error) {
    console.log('Error disconnecting account', error);
    return NextResponse.json({success: false});
  }
}