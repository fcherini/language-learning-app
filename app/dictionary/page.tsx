"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Search, Volume2, Plus } from "lucide-react"

// Mock data for demonstration
const commonWords = [
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
]

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWords = commonWords.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const playAudio = (text: string) => {
    // In a real app, this would use a text-to-speech API
    console.log(`Playing audio for: ${text}`)
    // Mock implementation - would be replaced with actual TTS
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES" // Spanish
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Dictionary</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search words..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="nouns">Nouns</TabsTrigger>
          <TabsTrigger value="verbs">Verbs</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredWords.map((word, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">{word.word}</CardTitle>
                  <CardDescription>{word.translation}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => playAudio(word.word)}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge variant="outline" className="mt-1">
                {word.partOfSpeech}
              </Badge>
            </CardHeader>
            <CardContent>
              <h3 className="mb-2 text-sm font-medium">Example sentences:</h3>
              <ul className="space-y-2">
                {word.examples.map((example, i) => (
                  <li key={i} className="text-sm">
                    <p className="font-medium">{example.original}</p>
                    <p className="text-muted-foreground">{example.translation}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 h-6 px-2"
                      onClick={() => playAudio(example.original)}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Listen</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

