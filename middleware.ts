import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)", 
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  if (userId && req.nextUrl.pathname === "/") {
    const dashboardUrl = new URL("/dashboard", req.url);
    return Response.redirect(dashboardUrl);
  }

  if (!isPublicRoute(req)) {
    const authResult = await auth();
    if (!authResult.userId) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
