import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Sentence from "@/models/Sentence"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Find sentence
    const sentence = await Sentence.findOne({
      _id: params.id,
      user: userId,
    })

    if (!sentence) {
      return NextResponse.json({ message: "Sentence not found" }, { status: 404 })
    }

    return NextResponse.json(sentence)
  } catch (error) {
    console.error("Get sentence error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Find sentence
    const sentence = await Sentence.findOne({
      _id: params.id,
      user: userId,
    })

    if (!sentence) {
      return NextResponse.json({ message: "Sentence not found" }, { status: 404 })
    }

    // Delete sentence
    await Sentence.deleteOne({ _id: params.id })

    return NextResponse.json({ message: "Sentence removed" })
  } catch (error) {
    console.error("Delete sentence error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

