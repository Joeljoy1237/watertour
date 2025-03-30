import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the request is for a protected route
    const protectedRoutes = ["/dashboard"];

    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        if (!token) {
            // Redirect to login if user is not authenticated
            const loginUrl = new URL("/login", req.url);
            return NextResponse.redirect(loginUrl);
        }

    }

    return NextResponse.next(); // Allow request to continue
}

// Apply middleware only to specific routes
export const config = {
    matcher: ["/dashboard/:path*"], // Apply middleware to /dashboard and all its subroutes
};
