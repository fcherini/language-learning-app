import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Flashcard from "@/models/Flashcard"
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

    // Get flashcards due for review
    const flashcards = await Flashcard.find({
      user: userId,
      dueDate: { $lte: new Date() },
    }).limit(20)

    return NextResponse.json(flashcards)
  } catch (error) {
    console.error("Get due flashcards error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

