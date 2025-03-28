import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Find user by ID
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

