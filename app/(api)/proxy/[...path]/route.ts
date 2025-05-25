import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

import {apiBaseUrl} from '@/app/config/endpoints';
import {AUTH_COOKIE} from '@/app/config/constants';

async function proxyRequest(method: string, path: string, request: NextRequest) {
  // Get the JWT from cookies
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;
  console.log('proxyRequest jwt', jwt)

  // Set up headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
  };

  const options: RequestInit = {
    method,
    headers,
  };

  // Attach the request body for POST and PUT
  if (request && (method === 'POST' || method === 'PUT')) {
    const body = await request.json();
    options.body = JSON.stringify(body);
  }

  // Forward the request to Strapi API
  console.log('proxyRequest body', options)
  const response = await fetch(`${apiBaseUrl}/${path}`, options);
  console.log('proxyRequest response', response)
  const responseData = await response.json();
  console.log('proxyRequest responseData', responseData)

  return NextResponse.json(responseData, { status: response.status });
};

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const awaitedParams = await params;
  const path = awaitedParams.path.join('/');
  return proxyRequest('GET', path, request);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const awaitedParams = await params;
  const path = awaitedParams.path.join('/');
  return proxyRequest('POST', path, request);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const awaitedParams = await params;
  const path = awaitedParams.path.join('/');
  return proxyRequest('PUT', path, request);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const awaitedParams = await params;
  const path = awaitedParams.path.join('/');
  return proxyRequest('DELETE', path, request);
}