import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function seedDictionary() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const database = client.db()
    const wordsCollection = database.collection("words")

    // Check if collection already has data
    const count = await wordsCollection.countDocuments()
    if (count > 0) {
      console.log("Dictionary already has data. Skipping seed.")
      return
    }

    // Sample dictionary data
    const words = [
      {
        word: "hola",
        translation: "hello",
        partOfSpeech: "interjection",
        examples: [
          { original: "¡Hola! ¿Cómo estás?", translation: "Hello! How are you?" },
          { original: "Hola a todos.", translation: "Hello everyone." },
        ],
        difficulty: "beginner",
      },
      {
        word: "gracias",
        translation: "thank you",
        partOfSpeech: "interjection",
        examples: [
          { original: "Muchas gracias por tu ayuda.", translation: "Thank you very much for your help." },
          { original: "Gracias por venir.", translation: "Thanks for coming." },
        ],
        difficulty: "beginner",
      },
      {
        word: "tiempo",
        translation: "time / weather",
        partOfSpeech: "noun",
        examples: [
          { original: "No tengo tiempo.", translation: "I don't have time." },
          { original: "¿Qué tiempo hace hoy?", translation: "What's the weather like today?" },
        ],
        difficulty: "beginner",
      },
      {
        word: "casa",
        translation: "house",
        partOfSpeech: "noun",
        examples: [
          { original: "Mi casa es pequeña.", translation: "My house is small." },
          { original: "Vamos a casa.", translation: "Let's go home." },
        ],
        difficulty: "beginner",
      },
      {
        word: "hablar",
        translation: "to speak",
        partOfSpeech: "verb",
        examples: [
          { original: "Yo hablo español.", translation: "I speak Spanish." },
          { original: "¿Puedes hablar más despacio?", translation: "Can you speak more slowly?" },
        ],
        difficulty: "beginner",
      },
      {
        word: "comer",
        translation: "to eat",
        partOfSpeech: "verb",
        examples: [
          { original: "Me gusta comer frutas.", translation: "I like to eat fruits." },
          { original: "¿Quieres comer algo?", translation: "Do you want to eat something?" },
        ],
        difficulty: "beginner",
      },
      {
        word: "agua",
        translation: "water",
        partOfSpeech: "noun",
        examples: [
          { original: "Necesito beber agua.", translation: "I need to drink water." },
          { original: "El agua está fría.", translation: "The water is cold." },
        ],
        difficulty: "beginner",
      },
      {
        word: "bueno",
        translation: "good",
        partOfSpeech: "adjective",
        examples: [
          { original: "La comida está buena.", translation: "The food is good." },
          { original: "Él es un buen amigo.", translation: "He is a good friend." },
        ],
        difficulty: "beginner",
      },
      {
        word: "ahora",
        translation: "now",
        partOfSpeech: "adverb",
        examples: [
          { original: "Necesito hacerlo ahora.", translation: "I need to do it now." },
          { original: "¿Podemos hablar ahora?", translation: "Can we talk now?" },
        ],
        difficulty: "beginner",
      },
      {
        word: "por favor",
        translation: "please",
        partOfSpeech: "interjection",
        examples: [
          { original: "Un café, por favor.", translation: "A coffee, please." },
          { original: "Ayúdame, por favor.", translation: "Help me, please." },
        ],
        difficulty: "beginner",
      },
    ]

    // Insert the words
    const result = await wordsCollection.insertMany(words)
    console.log(`${result.insertedCount} words inserted into the dictionary.`)
  } finally {
    await client.close()
    console.log("Connection closed")
  }
}

seedDictionary().catch(console.error)

