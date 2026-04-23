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
    const loadRate = () => {
      fetchSiteContent()
        .then((c) => {
          const next = c.vacancyRates?.[title]
          if (typeof next === "number") setRate(next)
        })
        .catch(() => {
          // keep defaultRate
        })
    }
    loadRate()
  }, [title])

  return (
    <div className="group relative h-40 md:h-52 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg md:text-xl mb-1 drop-shadow-lg">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm font-semibold">
            {rate}р/час
          </span>
          <span className="text-white/80 text-sm">{gender}</span>
        </div>
      </div>
    </div>
  )
}
