"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Volume2, Save, RotateCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreatePage() {
  const [userSentence, setUserSentence] = useState("")
  const [translation, setTranslation] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

  const translateSentence = () => {
    // In a real app, this would call a translation API
    setIsTranslating(true)

    // Mock translation - would be replaced with actual API call
    setTimeout(() => {
      // Simple mock translations for demo purposes
      const mockTranslations: Record<string, string> = {
        hello: "hola",
        "how are you": "¿cómo estás?",
        "my name is": "me llamo",
        "i like to learn languages": "me gusta aprender idiomas",
        "what time is it": "¿qué hora es?",
      }

      // Very simple mock translation logic
      let translatedText = userSentence.toLowerCase()

      Object.entries(mockTranslations).forEach(([english, spanish]) => {
        translatedText = translatedText.replace(english, spanish)
      })

      // If no translation patterns matched, provide a fallback message
      if (translatedText === userSentence.toLowerCase()) {
        setTranslation("(Enter a sentence to see the translation)")
      } else {
        setTranslation(translatedText)
      }

      setIsTranslating(false)
    }, 1000)
  }

  const playAudio = (text: string) => {
    // In a real app, this would use a text-to-speech API
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
        <h1 className="ml-2 text-2xl font-bold">Create Sentences</h1>
      </div>

      <Tabs defaultValue="create" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <div className="space-y-4">
            <div>
              <label htmlFor="user-sentence" className="block mb-2 text-sm font-medium">
                Enter a sentence in English:
              </label>
              <Textarea
                id="user-sentence"
                placeholder="Type your sentence here..."
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={translateSentence} disabled={!userSentence.trim() || isTranslating}>
                {isTranslating ? (
                  <>
                    <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Translate"
                )}
              </Button>
            </div>

            {translation && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="mb-2 text-sm font-medium">Translation:</h3>
                  <p className="text-lg">{translation}</p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudio(translation)}
                      disabled={translation === "(Enter a sentence to see the translation)"}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={translation === "(Enter a sentence to see the translation)"}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="p-8 text-center text-muted-foreground">
            <p>Your saved sentences will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

