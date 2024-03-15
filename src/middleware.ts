import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/types/database.types";
import { useRouter } from "next/router";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname === "/" && !session) {
    // Redirect to the absolute login URL
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (req.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/", "/login"],
};
