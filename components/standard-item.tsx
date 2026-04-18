interface StandardItemProps {
  emoji: string
  title: string
  text: string
}

export function StandardItem({ emoji, title, text }: StandardItemProps) {
  return (
    <div className="flex items-start gap-3 md:gap-4 pb-3 md:pb-4 border-b last:border-0">
      <div className="text-2xl md:text-3xl flex-shrink-0">{emoji}</div>
      <div>
        <h4 className="font-semibold text-sm md:text-base mb-1">{title}</h4>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
