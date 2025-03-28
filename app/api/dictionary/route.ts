import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
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

    // Get all words
    const words = await Word.find({})

    return NextResponse.json(words)
  } catch (error) {
    console.error("Get dictionary error:", error)
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

    const { word, translation, partOfSpeech, examples, difficulty } = await request.json()

    // Connect to database
    await connectDB()

    // Create new word
    const newWord = await Word.create({
      word,
      translation,
      partOfSpeech,
      examples,
      difficulty,
    })

    return NextResponse.json(newWord)
  } catch (error) {
    console.error("Add word error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

