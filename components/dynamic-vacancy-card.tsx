"use client"

import { useEffect, useState } from "react"
import { fetchSiteContent } from "@/lib/site-content-client"

interface DynamicVacancyCardProps {
  image: string
  title: string
  defaultRate: number
  gender: string
}

export function DynamicVacancyCard({ image, title, defaultRate, gender }: DynamicVacancyCardProps) {
  const [rate, setRate] = useState(defaultRate)

  useEffect(() => {
    fetchSiteContent()
      .then((c) => {
        const next = c.vacancyRates?.[title]
        if (typeof next === "number") setRate(next)
      })
      .catch(() => {})
  }, [title])

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      {/* hover sheen */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

      {/* gender tag top-right */}
      <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm border border-white/15 text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
        {gender}
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-bold text-sm md:text-base leading-tight mb-2 drop-shadow">{title}</p>
        <div className="inline-flex items-baseline gap-0.5 bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 shadow-lg shadow-primary/30">
          <span className="text-sm font-black">{rate}</span>
          <span className="text-[10px] opacity-80">₽/ч</span>
        </div>
      </div>

      {/* shadow lift on hover */}
      <div className="absolute inset-0 rounded-xl shadow-none group-hover:shadow-2xl group-hover:shadow-black/40 transition-shadow duration-300 pointer-events-none" />
    </div>
  )
}
