import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VacancyCardProps {
  icon: string
  title: string
  rate: string
  gender: string
}

export function VacancyCard({ icon, title, rate, gender }: VacancyCardProps) {
  return (
    <Card className="p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
        <div className="text-5xl md:text-6xl">{icon}</div>
        <div className="space-y-2 w-full">
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
          <div className="flex flex-col items-center gap-2">
            <Badge className="bg-primary text-primary-foreground text-base md:text-lg px-4 py-1.5 font-bold">
              {rate}
            </Badge>
            <span className="text-sm md:text-base text-muted-foreground font-medium">{gender}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
