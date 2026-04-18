"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const dormitoryImages = [
  { src: "/images/photo-2026-01-12-15-21-51.jpg", alt: "Кухонная зона" },
  { src: "/images/photo-2026-01-12-15-21-52-20-282-29.jpg", alt: "Холодильник и микроволновая печь" },
  { src: "/images/photo-2026-01-12-15-21-50.jpg", alt: "Ванная с стиральными машинами" },
  { src: "/images/photo-2026-01-12-15-21-53.jpg", alt: "Прачечная" },
  { src: "/images/photo-2026-01-12-15-21-51-20-283-29.jpg", alt: "Общая зона" },
  { src: "/images/photo-2026-01-12-15-21-51-20-284-29.jpg", alt: "Коридор" },
  { src: "/images/photo-2026-01-12-15-21-51-20-282-29.jpg", alt: "Лестница" },
  { src: "/images/photo-2026-01-12-15-21-52-20-283-29.jpg", alt: "Душевая" },
]

export function DormitoryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + dormitoryImages.length) % dormitoryImages.length)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % dormitoryImages.length)
    }
  }

  return (
    <>
      {/* Small carousel */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {dormitoryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 border-border hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-4">
            <img
              src={dormitoryImages[selectedImage].src || "/placeholder.svg"}
              alt={dormitoryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-sm md:text-base">{dormitoryImages[selectedImage].alt}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  )
}
