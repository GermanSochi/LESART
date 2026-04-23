import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface RuleCardProps {
  text: string
}

export function RuleCard({ text }: RuleCardProps) {
  return (
    <Card className="bento-card bento-card-hover p-3 md:p-4 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-l-primary">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm md:text-base leading-relaxed font-medium">{text}</p>
      </div>
    </Card>
  )
}
