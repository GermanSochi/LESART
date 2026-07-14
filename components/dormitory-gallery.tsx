"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const dormitoryImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-50-GIFcT8LRI7WPTBUTO6c8JNjwyPaW7h.jpg", alt: "Кухонная зона" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-52%20%282%29-7RQjepmOma4FhtgrWLUUQfYUe461dD.jpg", alt: "Холодильник и микроволновая печь" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-53-6VuIPYV4iHPjFxKCKwYK20bbEoIaem.jpg", alt: "Прачечная" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-52%20%283%29-jQwLatdgxqVGaCQYg0QVY679vDWbPi.jpg", alt: "Душевая" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-51-l1OhteJyNDd2PMW4egnRTaAgAVdOz3.jpg", alt: "Общая зона" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-51%20%282%29-KOZXKQodO86ZPLldOffUKWsM61MdoM.jpg", alt: "Лестница" },
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
      <Card className="p-4 md:p-6 bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-base">Условия проживания</h4>
            <p className="text-xs text-muted-foreground">Нажмите на фото для увеличения</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {dormitoryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:shadow-md"
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </Card>

      {/* Lightbox modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4">
            <img
              src={dormitoryImages[selectedImage].src}
              alt={dormitoryImages[selectedImage].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white text-sm md:text-base font-medium">{dormitoryImages[selectedImage].alt}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  )
}
