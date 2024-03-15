import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/types/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const user = await supabase
      .from("User")
      .select("*")
      .eq("email", session?.user?.email)
      .single();

    // const newUser = {
    //   ...session?.user,
    //   raw_user_meta_data: {
    //     ...session?.user.user_metadata,
    //     type: user.data.type,
    //     name: user.data.name,
    //     mobile: user.data.mobile,
    //   },
    // };

    console.log(session.user);
  }

  if (req.nextUrl.pathname === "/dashboard" && !session) {
    // Redirect to the absolute login URL
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (
    (req.nextUrl.pathname === "/auth" || req.nextUrl.pathname === "/") &&
    session
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/", "/auth", "/dashboard"],
};
