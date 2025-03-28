import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, BookOpen, MessageSquare, RotateCcw } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">LinguaLearn</h1>
        <p className="text-muted-foreground">Master languages through immersive learning</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Dictionary
            </CardTitle>
            <CardDescription>Browse common words and phrases</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore the most frequently used words in your target language with example sentences.</p>
          </CardContent>
          <CardFooter>
            <Link href="/dictionary" className="w-full">
              <Button className="w-full">Open Dictionary</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Create Sentences
            </CardTitle>
            <CardDescription>Practice making your own sentences</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create your own sentences, get translations, and hear them pronounced correctly.</p>
          </CardContent>
          <CardFooter>
            <Link href="/create" className="w-full">
              <Button className="w-full">Create Sentences</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Flashcard Review
            </CardTitle>
            <CardDescription>Review words and sentences</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Review your saved words and sentences with spaced repetition for better retention.</p>
          </CardContent>
          <CardFooter>
            <Link href="/review" className="w-full">
              <Button className="w-full">Start Review</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language Settings
            </CardTitle>
            <CardDescription>Customize your learning experience</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Choose your native language and the language you want to learn.</p>
          </CardContent>
          <CardFooter>
            <Link href="/settings" className="w-full">
              <Button className="w-full">Settings</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

