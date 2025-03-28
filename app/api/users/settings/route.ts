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
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user.settings)
  } catch (error) {
    console.error("Get settings error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { nativeLanguage, targetLanguage, autoPlayAudio, dailyGoal } = await request.json()

    // Connect to database
    await connectDB()

    // Find user by ID
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update settings
    user.settings.nativeLanguage = nativeLanguage || user.settings.nativeLanguage
    user.settings.targetLanguage = targetLanguage || user.settings.targetLanguage
    user.settings.autoPlayAudio = autoPlayAudio !== undefined ? autoPlayAudio : user.settings.autoPlayAudio
    user.settings.dailyGoal = dailyGoal || user.settings.dailyGoal

    await user.save()

    return NextResponse.json({ settings: user.settings })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

