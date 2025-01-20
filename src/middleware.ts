import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const loginURL = new URL('/', request.url)
  const signInURL = new URL('/cadastro', request.url)
  const homeURL = new URL('/home', request.url)

  if (token) {
    if (pathname === loginURL.pathname || pathname === signInURL.pathname) {
      return NextResponse.redirect(homeURL)
    }
    return NextResponse.next()
  }

  if (!token) {
    if (pathname !== loginURL.pathname && pathname !== signInURL.pathname) {
      return NextResponse.redirect(loginURL)
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/',
    '/cadastro',
    '/home',
    '/client',
    '/services',
    '/services/:id',
    '/services/new-task',
    '/services/new-task/:id',
  ],
}
