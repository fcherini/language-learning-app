import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function getAuthUser(request: Request | NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

    return decoded.id
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

