import mongoose from "mongoose"

interface IExample {
  original: string
  translation: string
}

interface IWord extends mongoose.Document {
  word: string
  translation: string
  partOfSpeech: string
  examples: IExample[]
  difficulty: string
}

const wordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    partOfSpeech: {
      type: String,
      enum: ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"],
      required: true,
    },
    examples: [
      {
        original: String,
        translation: String,
      },
    ],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  {
    timestamps: true,
  },
)

const Word = mongoose.models.Word || mongoose.model<IWord>("Word", wordSchema)

export default Word

