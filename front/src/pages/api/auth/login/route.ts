import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real app, this would validate the credentials against a database
    // For demo purposes, we'll accept any email/password and set a session cookie

    // Set a session cookie
    cookies().set("session", "demo-session-token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
    })

    // Return a mock user
    return NextResponse.json({
      id: "user1",
      email,
      firstName: "John",
      lastName: "Doe",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}
