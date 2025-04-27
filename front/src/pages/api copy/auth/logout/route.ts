import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the session cookie
  cookies().set("session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  })

  return NextResponse.json({ success: true })
}
