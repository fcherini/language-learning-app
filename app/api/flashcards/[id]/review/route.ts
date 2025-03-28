import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Flashcard from "@/models/Flashcard"
import { getAuthUser } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { remembered } = await request.json()

    // Connect to database
    await connectDB()

    // Find flashcard
    const flashcard = await Flashcard.findOne({
      _id: params.id,
      user: userId,
    })

    if (!flashcard) {
      return NextResponse.json({ message: "Flashcard not found" }, { status: 404 })
    }

    // Implement SuperMemo SM-2 algorithm for spaced repetition
    if (remembered) {
      // If the user remembered the flashcard
      flashcard.repetitions += 1

      if (flashcard.repetitions === 1) {
        flashcard.interval = 1
      } else if (flashcard.repetitions === 2) {
        flashcard.interval = 6
      } else {
        flashcard.interval = Math.round(flashcard.interval * flashcard.easeFactor)
      }

      flashcard.easeFactor += 0.1
      if (flashcard.easeFactor > 2.5) {
        flashcard.easeFactor = 2.5
      }
    } else {
      // If the user didn't remember the flashcard
      flashcard.repetitions = 0
      flashcard.interval = 1
      flashcard.easeFactor -= 0.2
      if (flashcard.easeFactor < 1.3) {
        flashcard.easeFactor = 1.3
      }
    }

    // Set the next due date
    const now = new Date()
    flashcard.dueDate = new Date(now.setDate(now.getDate() + flashcard.interval))

    await flashcard.save()

    return NextResponse.json(flashcard)
  } catch (error) {
    console.error("Review flashcard error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

