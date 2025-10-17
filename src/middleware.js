import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes (no auth required)
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If route is not public, protect it
  if (!isPublicRoute(req)) {
    if (!userId) {
      // Redirect unauthenticated user to sign-in
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // match everything except Next internals and static files
    "/((?!_next|.*\\..*).*)",
  ],
};
