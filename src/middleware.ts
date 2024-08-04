import { NextRequest } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { firebaseEdgePrivateConfig } from "./utils/firebase/getServerToken";

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    ...firebaseEdgePrivateConfig,
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    debug: false,
    checkRevoked: true,
    // handleValidToken: async (token, headers) => {
    //   // Authenticated user should not be able to access /login and /register routes
    //   if (request.nextUrl.pathname.includes("/login")) {
    //     return redirectToHome(request);
    //   }

    //   return NextResponse.next({
    //     request: {
    //       headers,
    //     },
    //   });
    // },
    // handleInvalidToken: async () => {
    //   return redirectToLogin(request, {
    //     path: "/login",
    //     publicPaths: ["/login"],
    //   });
    // },
    // handleError: async (error) => {
    //   console.error("Unhandled authentication error", {
    //     error,
    //   });
    //   return NextResponse.next({});
    // },
  });
}

export const config = {
  matcher: ["/api/login", "/api/logout", "/", "/((?!_next|favicon.ico|api|.*\\.).*)"],
};
