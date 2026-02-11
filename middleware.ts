import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/widgets/(.*)",  // Allow public access to widget API
  "/api/gemini-research",  // Allow demo API
  "/api/vapi-call",  // Allow demo API
  "/api/get-prompt",  // Allow demo API
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle the request to avoid header immutability issues
  const { userId } = await auth();
  
  if (isPublicRoute(req)) {
    return;
  }
  
  // Protect non-public routes
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
