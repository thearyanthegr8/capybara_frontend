import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/lib/types/database.types";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { name, mobile, email, password, type } = await request.json();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone: mobile.toString(),
    // options: {
    //   emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    // },
  });

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  const user = await prisma.user.create({
    data: {
      id: data.user?.id,
      name,
      mobile: mobile.toString(),
      email,
      type,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
