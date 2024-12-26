import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  try {
    // Add timeout of 5 seconds
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Supabase request timeout")), 5000)
    );

    await Promise.race([supabase.auth.getSession(), timeoutPromise]);
  } catch (error) {
    console.error("Supabase middleware error:", error);
    // Continue with the request even if Supabase times out
  }

  return res;
}
