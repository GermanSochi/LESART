import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="flex flex-col items-center gap-2 md:gap-3">
        <div className="text-primary">{icon}</div>
        <h3 className="font-semibold text-base md:text-lg">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}
