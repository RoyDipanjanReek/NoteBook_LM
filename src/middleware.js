import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isAdminUser } from "./lib/auth.js";

// Define routes
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl;
  const isAdminPath = url.pathname.startsWith("/admin");
  const isAdmin = isAdminUser(userId);

  // If user is not logged in
  if (!userId) {
    // Allow access only to public routes
    if (!isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  } else {
    // Admin route protection
    if (isAdminPath && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is logged in, block access to public routes
    if (url.pathname === "/" || url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL("/home", req.url)); // redirect authenticated users
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except Next internals and static assets
    "/((?!_next|.*\\..*).*)",
  ],
};
