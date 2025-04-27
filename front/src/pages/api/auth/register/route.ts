import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // In a real app, this would create a new user in the database
    // For demo purposes, we'll just set a session cookie

    // Set a session cookie
    cookies().set("session", "demo-session-token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
    })

    // Parse the name into first and last name
    const nameParts = name.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""

    // Return a mock user
    return NextResponse.json({
      id: "user1",
      email,
      firstName,
      lastName,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 400 })
  }
}
