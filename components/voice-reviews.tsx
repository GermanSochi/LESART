"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Mic } from "lucide-react"
import { fetchSiteContent, type AudioReview } from "@/lib/site-content-client"

const BAR_HEIGHTS = [30, 60, 45, 75, 50, 85, 40, 70, 35, 60, 80, 45, 65]

function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[2.5px] h-7">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${h}%`,
            transformOrigin: "bottom",
            backgroundColor: playing ? "oklch(0.40 0.12 155)" : "currentColor",
            opacity: playing ? 1 : 0.25,
            animation: playing ? `waveform-bar ${0.55 + (i % 5) * 0.07}s ease-in-out infinite alternate` : "none",
            animationDelay: playing ? `${i * 45}ms` : "0ms",
          }}
        />
      ))}
    </div>
  )
}

export function VoiceReviews() {
  const [reviews, setReviews] = useState<AudioReview[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  useEffect(() => {
    fetchSiteContent()
      .then((c) => setReviews(c.audioReviews ?? []))
      .catch(() => setReviews([]))
  }, [])

  const togglePlay = useCallback(
    (id: string) => {
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
    },
    [playingId],
  )

  const handleTimeUpdate = (id: string) => {
    const audio = audioRefs.current[id]
    if (!audio?.duration) return
    setProgress((p) => ({ ...p, [id]: (audio.currentTime / audio.duration) * 100 }))
  }

  const handleEnded = (id: string) => {
    setPlayingId(null)
    setProgress((p) => ({ ...p, [id]: 0 }))
  }

  const seekTo = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRefs.current[id]
    if (!audio?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-muted-foreground">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Mic className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium">Голосовые отзывы скоро появятся</p>
        <p className="text-xs text-muted-foreground/60">Добавьте через админ-панель</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {reviews.map((review) => {
        const isPlaying = playingId === review.id
        const pct = progress[review.id] ?? 0
        return (
          <div
            key={review.id}
            onClick={() => togglePlay(review.id)}
            className="flex-shrink-0 w-[240px] bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 cursor-pointer group hover:border-primary/40 hover:shadow-md transition-all duration-300 select-none"
          >
            {/* avatar + meta */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                {review.avatarUrl ? (
                  <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{review.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate leading-tight">{review.name}</p>
                <p className="text-xs text-muted-foreground truncate">{review.position}</p>
              </div>
            </div>

            {/* waveform */}
            <WaveformBars playing={isPlaying} />

            {/* progress bar */}
            <div
              className="h-[3px] bg-border rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                seekTo(review.id, e)
              }}
            >
              <div
                className="h-full bg-primary rounded-full transition-[width] duration-100"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* footer */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground/60 uppercase tracking-wider">голос. отзыв</span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isPlaying
                    ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/30"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-px" />}
              </div>
            </div>

            <audio
              ref={(el) => {
                if (el) audioRefs.current[review.id] = el
              }}
              onTimeUpdate={() => handleTimeUpdate(review.id)}
              onEnded={() => handleEnded(review.id)}
            >
              <source src={review.audioUrl} />
            </audio>
          </div>
        )
      })}
    </div>
  )
}
