import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Check if trying to access CMS
    if (request.nextUrl.pathname.startsWith('/cms')) {
        const token = request.cookies.get('cms_token')?.value;

        // Hardcoded simple check here, could be an env variable in production
        if (token !== 'authenticated') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/cms/:path*',
}
