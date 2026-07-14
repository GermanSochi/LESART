import { Check } from "lucide-react"

interface ValueItemProps {
  text: string
}

export function ValueItem({ text }: ValueItemProps) {
  return (
    <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-background rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="bg-primary text-primary-foreground p-1 md:p-1.5 rounded-full flex-shrink-0 mt-0.5">
        <Check className="h-3 w-3 md:h-4 md:w-4" />
      </div>
      <p className="text-sm md:text-base leading-relaxed">{text}</p>
    </div>
  )
}
