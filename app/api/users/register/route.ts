import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Connect to database
    await connectDB()

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

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
    console.error("Register error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

