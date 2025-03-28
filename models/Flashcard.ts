import mongoose from "mongoose"

interface IFlashcard extends mongoose.Document {
  user: mongoose.Types.ObjectId
  front: string
  back: string
  example?: string
  type: string
  interval: number
  repetitions: number
  easeFactor: number
  dueDate: Date
}

const flashcardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    example: {
      type: String,
    },
    type: {
      type: String,
      enum: ["word", "sentence"],
      default: "word",
    },
    // Spaced repetition data
    interval: {
      type: Number,
      default: 1,
    },
    repetitions: {
      type: Number,
      default: 0,
    },
    easeFactor: {
      type: Number,
      default: 2.5,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Flashcard = mongoose.models.Flashcard || mongoose.model<IFlashcard>("Flashcard", flashcardSchema)

export default Flashcard

