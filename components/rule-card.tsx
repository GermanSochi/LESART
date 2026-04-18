import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface RuleCardProps {
  rule: string
}

export function RuleCard({ rule }: RuleCardProps) {
  return (
    <Card className="p-3 md:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-2 md:gap-3">
        <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm md:text-base leading-relaxed">{rule}</p>
      </div>
    </Card>
  )
}
