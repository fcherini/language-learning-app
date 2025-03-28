import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Sentence from "@/models/Sentence"
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

    // Get user's sentences
    const sentences = await Sentence.find({ user: userId }).sort({ createdAt: -1 })

    return NextResponse.json(sentences)
  } catch (error) {
    console.error("Get sentences error:", error)
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

    const { original, translation } = await request.json()

    // Connect to database
    await connectDB()

    // Create new sentence
    const sentence = await Sentence.create({
      user: userId,
      original,
      translation,
    })

    return NextResponse.json(sentence)
  } catch (error) {
    console.error("Create sentence error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

