"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Mic } from "lucide-react"

interface AudioReview {
  id: string
  name: string
  position: string
  audioData: string
  avatar?: string
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
    window.addEventListener("audioReviewsUpdated", handleStorageChange)
    
    const interval = setInterval(loadReviews, 2000)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("audioReviewsUpdated", handleStorageChange)
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
      <Card className="p-8 text-center bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mic className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground font-medium">Скоро здесь появятся голосовые отзывы наших сотрудников</p>
        <p className="text-sm text-muted-foreground/70 mt-2">Добавьте отзывы через админ-панель</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-3 md:gap-4 md:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-muted/30 to-transparent">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
            {review.avatar ? (
              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{review.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{review.name}</p>
            <p className="text-sm text-muted-foreground truncate">{review.position}</p>
          </div>
          <Button
            size="icon"
            variant={playingId === review.id ? "default" : "outline"}
            className={`flex-shrink-0 h-12 w-12 rounded-full transition-all duration-300 ${
              playingId === review.id ? "scale-110 shadow-lg" : ""
            }`}
            onClick={() => togglePlay(review.id)}
          >
            {playingId === review.id ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
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
