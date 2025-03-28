import axios from "axios"

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
})

// Set auth token if available
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token")
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}

// Dictionary API
export const fetchDictionary = async () => {
  const { data } = await api.get("/api/dictionary")
  return data
}

export const saveWord = async (wordId: string) => {
  const { data } = await api.post("/api/users/saved-words", { wordId })
  return data
}

// Sentence API
export const translateText = async (text: string) => {
  const { data } = await api.post("/api/translate", { text })
  return data
}

export const saveSentence = async (original: string, translation: string) => {
  const { data } = await api.post("/api/sentences", { original, translation })
  return data
}

export const fetchSavedSentences = async () => {
  const { data } = await api.get("/api/sentences")
  return data
}

export const deleteSentence = async (id: string) => {
  const { data } = await api.delete(`/api/sentences/${id}`)
  return data
}

// Flashcard API
export const fetchDueFlashcards = async () => {
  const { data } = await api.get("/api/flashcards/due")
  return data
}

export const reviewFlashcard = async (id: string, remembered: boolean) => {
  const { data } = await api.post(`/api/flashcards/${id}/review`, { remembered })
  return data
}

export const addToFlashcards = async (front: string, back: string, type: string) => {
  const { data } = await api.post("/api/flashcards", { front, back, type })
  return data
}

// User settings API
export const fetchUserSettings = async () => {
  const { data } = await api.get("/api/users/settings")
  return data
}

export const updateUserSettings = async (settings: any) => {
  const { data } = await api.put("/api/users/settings", settings)
  return data
}

