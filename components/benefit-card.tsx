"use client"

interface BenefitCardProps {
  image: string
  title: string
  description: string
}

export function BenefitCard({ image, title, description }: BenefitCardProps) {
  return (
    <div className="relative h-40 md:h-48 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="font-bold text-lg md:text-xl text-white mb-1">{title}</h3>
        <p className="text-xs md:text-sm text-white/90">{description}</p>
      </div>
    </div>
  )
}
