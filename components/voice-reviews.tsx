"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, User } from "lucide-react"

interface AudioReview {
  id: string
  name: string
  position: string
  audioData: string
}

export function VoiceReviews() {
  const [reviews, setReviews] = useState<AudioReview[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = localStorage.getItem("audioReviews")
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews))
      }
    }
    loadReviews()
    
    const handleStorageChange = () => loadReviews()
    window.addEventListener("storage", handleStorageChange)
    
    const interval = setInterval(loadReviews, 2000)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const togglePlay = (id: string) => {
    const audio = audioRefs.current[id]
    if (!audio) return

    if (playingId === id) {
      audio.pause()
      setPlayingId(null)
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause())
      audio.play()
      setPlayingId(id)
    }
  }

  const handleEnded = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    }
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Скоро здесь появятся голосовые отзывы наших сотрудников</p>
      </div>
    )
  }

  return (
    <div className="grid gap-3 md:gap-4 md:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{review.name}</p>
            <p className="text-sm text-muted-foreground truncate">{review.position}</p>
          </div>
          <Button
            size="sm"
            variant={playingId === review.id ? "default" : "outline"}
            className="flex-shrink-0"
            onClick={() => togglePlay(review.id)}
          >
            {playingId === review.id ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <audio
            ref={(el) => {
              if (el) audioRefs.current[review.id] = el
            }}
            onEnded={() => handleEnded(review.id)}
          >
            <source src={review.audioData} />
          </audio>
        </Card>
      ))}
    </div>
  )
}
