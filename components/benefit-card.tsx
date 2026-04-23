"use client"

interface BenefitCardProps {
  image: string
  title: string
  description: string
}

export function BenefitCard({ image, title, description }: BenefitCardProps) {
  return (
    <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden group cursor-pointer border border-border/60 bg-muted/20 shadow-sm hover:shadow-lg transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
        <h3 className="font-semibold text-base md:text-lg text-white tracking-tight mb-1">{title}</h3>
        <p className="text-sm text-white/85 leading-snug">{description}</p>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  )
}
