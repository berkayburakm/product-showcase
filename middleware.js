import { NextResponse } from 'next/server'

export function middleware(request) {
  const authToken = request.cookies.get('auth')?.value

  if (request.nextUrl.pathname.startsWith('/checkout')) {
    if (!authToken || authToken !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*'],
}
