import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  // In a real app, this would verify the session cookie and return the user
  // For demo purposes, we'll check if a session cookie exists and return a mock user
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return NextResponse.json(null)
  }

  // Mock user for demo
  return NextResponse.json({
    id: "user1",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
  })
}
