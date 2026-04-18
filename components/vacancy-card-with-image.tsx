import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VacancyCardWithImageProps {
  image: string
  title: string
  rate: string
  gender: string
}

export function VacancyCardWithImage({ image, title, rate, gender }: VacancyCardWithImageProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">{title}</h3>
          <div className="flex items-center justify-between gap-2">
            <Badge className="bg-primary text-primary-foreground text-base md:text-lg px-3 py-1 font-bold">
              {rate}
            </Badge>
            <span className="text-sm md:text-base text-white/90 font-medium">{gender}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
