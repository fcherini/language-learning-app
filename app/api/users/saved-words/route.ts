import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import Word from "@/models/Word"
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

    // Find user and populate saved words
    const user = await User.findById(userId).populate("savedWords")

    return NextResponse.json(user.savedWords)
  } catch (error) {
    console.error("Get saved words error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { wordId } = await request.json()

    // Connect to database
    await connectDB()

    // Check if word exists
    const word = await Word.findById(wordId)
    if (!word) {
      return NextResponse.json({ message: "Word not found" }, { status: 404 })
    }

    // Find user
    const user = await User.findById(userId)

    // Check if word is already saved
    if (user.savedWords.includes(wordId)) {
      return NextResponse.json({ message: "Word already saved" }, { status: 400 })
    }

    // Add word to saved words
    user.savedWords.push(wordId)
    await user.save()

    return NextResponse.json({ message: "Word saved successfully" })
  } catch (error) {
    console.error("Save word error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

