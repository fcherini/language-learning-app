import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Connect to database
    await connectDB()

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" })

    return NextResponse.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        settings: user.settings,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

