import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token');
  if (cookie) {
    return NextResponse.next();
  }
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    status: 302,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
