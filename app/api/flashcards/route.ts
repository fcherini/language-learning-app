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

    // Get user's flashcards
    const flashcards = await Flashcard.find({ user: userId })

    return NextResponse.json(flashcards)
  } catch (error) {
    console.error("Get flashcards error:", error)
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

    const { front, back, example, type } = await request.json()

    // Connect to database
    await connectDB()

    // Create new flashcard
    const flashcard = await Flashcard.create({
      user: userId,
      front,
      back,
      example,
      type,
    })

    return NextResponse.json(flashcard)
  } catch (error) {
    console.error("Create flashcard error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

