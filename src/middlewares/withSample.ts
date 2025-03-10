import { auth, TSession } from "@/config/auth";
import { MiddlewareFactory } from "@/types/middleware-factory";
import {
    NextFetchEvent,
    NextRequest,
    NextResponse
} from "next/server";

function getSearchParam(param: string, url: any) {
    return url.searchParams.get(param);
}

export const withSample: MiddlewareFactory = (next) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const session: TSession = await auth()
        const pathname = request.nextUrl.pathname;

        if (!pathname.startsWith("/sample")) {
            return next(request, _next);
        };

        // NO AUTHENTICATION
        if (!session?.user && pathname !== "/sample/login") {
            return NextResponse.redirect(new URL('/sample/login', request.url))
        }

        // EXPIRED SESSION
        if (session?.expires && new Date(session.expires).getTime() < new Date().getTime()) { }

        // NOT AUTHORIZED
        if (![1, 2].includes(session?.user?.role!) && !["/samplelogin", "/sample/not-authorized"].includes(pathname)) {
            return NextResponse.redirect(new URL('/sample/not-authorized', request.url))
        }

        return next(request, _next);

    };
};

// // Protecting routes with next-auth
// // https://next-auth.js.org/configuration/nextjs#middleware
// // https://nextjs.org/docs/app/building-your-application/routing/middleware

// import NextAuth from 'next-auth';
// import authConfig from '@/config/auth.config';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return Response.redirect(url);
//   }
// });

// export const config = { matcher: ['/sample/:path*'] };
