import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { getAuthUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const userId = await getAuthUser(request)
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { text } = await request.json()

    // Connect to database
    await connectDB()

    // Get user's language settings
    const user = await User.findById(userId)
    const sourceLanguage = user.settings.nativeLanguage || "en"
    const targetLanguage = user.settings.targetLanguage || "es"

    // In a real app, you would use a translation API like Google Translate, DeepL, etc.
    // For this example, we'll use a mock translation

    // Mock translation logic (replace with actual API call)
    let translation

    if (sourceLanguage === "en" && targetLanguage === "es") {
      // Simple English to Spanish translations for demo
      const translations: Record<string, string> = {
        hello: "hola",
        goodbye: "adiós",
        "thank you": "gracias",
        "how are you": "cómo estás",
        "my name is": "me llamo",
        "i like": "me gusta",
        "i want": "quiero",
        "i need": "necesito",
        please: "por favor",
        sorry: "lo siento",
        yes: "sí",
        no: "no",
        good: "bueno",
        bad: "malo",
        today: "hoy",
        tomorrow: "mañana",
        yesterday: "ayer",
      }

      // Very simple word replacement (not a real translation)
      translation = text.toLowerCase()

      for (const [english, spanish] of Object.entries(translations)) {
        translation = translation.replace(new RegExp(`\\b${english}\\b`, "gi"), spanish)
      }

      // If no changes were made, return a placeholder
      if (translation === text.toLowerCase()) {
        translation = `[Translation of: ${text}]`
      }
    } else {
      // For other language pairs, just return a placeholder
      translation = `[Translation of: ${text} from ${sourceLanguage} to ${targetLanguage}]`
    }

    return NextResponse.json({ translation })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ message: "Translation service error" }, { status: 500 })
  }
}

