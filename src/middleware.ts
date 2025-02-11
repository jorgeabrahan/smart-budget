import { updateSession } from '@/middlewares/updateSession'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/dashboard/:path*']
}
