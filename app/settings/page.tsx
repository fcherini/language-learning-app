"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [nativeLanguage, setNativeLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [autoPlayAudio, setAutoPlayAudio] = useState(true)
  const [dailyGoal, setDailyGoal] = useState("10")
  const [isSaving, setIsSaving] = useState(false)

  const saveSettings = () => {
    setIsSaving(true)

    // Mock saving settings - would be replaced with actual API call
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or redirect
    }, 1000)
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Settings</h1>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Language Settings</CardTitle>
            <CardDescription>Choose your native and target languages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="native-language">Your Native Language</Label>
              <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                <SelectTrigger id="native-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-language">Language You're Learning</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger id="target-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Preferences</CardTitle>
            <CardDescription>Customize your learning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-play">Auto-play audio</Label>
                <p className="text-sm text-muted-foreground">Automatically play pronunciation when viewing words</p>
              </div>
              <Switch id="auto-play" checked={autoPlayAudio} onCheckedChange={setAutoPlayAudio} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily-goal">Daily Review Goal</Label>
              <Select value={dailyGoal} onValueChange={setDailyGoal}>
                <SelectTrigger id="daily-goal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 words/day</SelectItem>
                  <SelectItem value="10">10 words/day</SelectItem>
                  <SelectItem value="15">15 words/day</SelectItem>
                  <SelectItem value="20">20 words/day</SelectItem>
                  <SelectItem value="30">30 words/day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={saveSettings} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

