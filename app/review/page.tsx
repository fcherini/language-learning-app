"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, Volume2, Check, X, RotateCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock flashcard data
const mockFlashcards = [
  {
    id: 1,
    front: "hola",
    back: "hello",
    example: "¡Hola! ¿Cómo estás?",
    lastReviewed: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: 2,
    front: "gracias",
    back: "thank you",
    example: "Muchas gracias por tu ayuda.",
    lastReviewed: new Date(Date.now() - 86400000 * 3), // 3 days ago
  },
  {
    id: 3,
    front: "tiempo",
    back: "time / weather",
    example: "No tengo tiempo.",
    lastReviewed: new Date(Date.now() - 86400000 * 1), // 1 day ago
  },
  {
    id: 4,
    front: "casa",
    back: "house",
    example: "Mi casa es pequeña.",
    lastReviewed: new Date(Date.now() - 86400000 * 4), // 4 days ago
  },
  {
    id: 5,
    front: "hablar",
    back: "to speak",
    example: "Yo hablo español.",
    lastReviewed: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
]

export default function ReviewPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewedCards, setReviewedCards] = useState<number[]>([])

  const currentCard = mockFlashcards[currentCardIndex]
  const progress = (reviewedCards.length / mockFlashcards.length) * 100

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES" // Spanish
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleResponse = (remembered: boolean) => {
    // In a real app, this would update the spaced repetition algorithm
    console.log(`Card ${currentCard.id} marked as ${remembered ? "remembered" : "forgotten"}`)

    // Add to reviewed cards
    if (!reviewedCards.includes(currentCard.id)) {
      setReviewedCards([...reviewedCards, currentCard.id])
    }

    // Move to next card or end review
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else {
      // Review complete - in a real app, you'd show a completion screen
      console.log("Review complete")
    }
  }

  const resetReview = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setReviewedCards([])
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Flashcard Review</h1>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>Progress</span>
          <span>
            {reviewedCards.length}/{mockFlashcards.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {reviewedCards.length === mockFlashcards.length ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Review Complete!</h2>
          <p className="mb-6 text-muted-foreground">You've reviewed all the flashcards for today.</p>
          <Button onClick={resetReview}>
            <RotateCw className="w-4 h-4 mr-2" />
            Start Again
          </Button>
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="min-h-[200px] flex flex-col items-center justify-center cursor-pointer" onClick={flipCard}>
              {isFlipped ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{currentCard.back}</h2>
                  <p className="text-muted-foreground italic">"{currentCard.example}"</p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">{currentCard.front}</h2>
                  <p className="text-sm text-muted-foreground">(Click to reveal)</p>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" onClick={() => playAudio(currentCard.front)}>
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </Button>
            </div>
          </CardContent>

          {isFlipped && (
            <CardFooter className="flex justify-between gap-2 px-6 pb-6">
              <Button
                variant="outline"
                className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleResponse(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Didn't Know
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-200 hover:bg-green-50 hover:text-green-600"
                onClick={() => handleResponse(true)}
              >
                <Check className="w-4 h-4 mr-2" />
                Knew It
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}

