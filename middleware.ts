import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/widgets/(.*)",  // Allow public access to widget API
  "/api/gemini-research",  // Allow demo API
  "/api/vapi-call",  // Allow demo API
  "/api/get-prompt",  // Allow demo API
  "/hotels",  // Hotel demo page
  "/api/vapi-chat",  // Hotel demo chat API
  "/api/chat-sessions",  // Hotel demo sessions API
  "/navank(.*)",  // Navank subdomain page
]);

export default clerkMiddleware(async (auth, req) => {
  // Extract subdomain from hostname
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // Handle subdomain routing
  if (subdomain === "navank" && !req.nextUrl.pathname.startsWith("/navank")) {
    const url = req.nextUrl.clone();
    url.pathname = `/navank${url.pathname}`;
    return NextResponse.rewrite(url);
  }

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
