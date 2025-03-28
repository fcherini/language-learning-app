import mongoose from "mongoose"
import bcrypt from "bcryptjs"

interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  settings: {
    nativeLanguage: string
    targetLanguage: string
    autoPlayAudio: boolean
    dailyGoal: number
  }
  savedWords: mongoose.Types.ObjectId[]
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    settings: {
      nativeLanguage: {
        type: String,
        default: "en",
      },
      targetLanguage: {
        type: String,
        default: "es",
      },
      autoPlayAudio: {
        type: Boolean,
        default: true,
      },
      dailyGoal: {
        type: Number,
        default: 10,
      },
    },
    savedWords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User

