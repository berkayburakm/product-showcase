import { NextResponse } from 'next/server'

export function middleware(request) {
  const authToken = request.cookies.get('auth')?.value
  const isAuthenticated = authToken === 'true'
  const { pathname } = request.nextUrl

  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isAuthenticated && pathname.startsWith('/checkout')) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*', '/login'],
}
