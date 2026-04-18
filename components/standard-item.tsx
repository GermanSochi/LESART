"use client"

import { Shirt, Footprints, Scissors, Gem, Sparkles } from "lucide-react"

interface StandardItemProps {
  icon: "clothing" | "shoes" | "hair" | "jewelry" | "hygiene"
  title: string
  text: string
  image: string
}

const iconMap = {
  clothing: Shirt,
  shoes: Footprints,
  hair: Scissors,
  jewelry: Gem,
  hygiene: Sparkles,
}

export function StandardItem({ icon, title, text, image }: StandardItemProps) {
  const Icon = iconMap[icon]
  
  return (
    <div className="relative h-28 md:h-32 rounded-xl overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="absolute inset-0 flex items-center p-4 gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-white text-base md:text-lg mb-0.5">{title}</h4>
          <p className="text-xs md:text-sm text-white/90 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}
