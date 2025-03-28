import mongoose from "mongoose"

interface ISentence extends mongoose.Document {
  user: mongoose.Types.ObjectId
  original: string
  translation: string
}

const sentenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    original: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Sentence = mongoose.models.Sentence || mongoose.model<ISentence>("Sentence", sentenceSchema)

export default Sentence

