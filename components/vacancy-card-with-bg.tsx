interface VacancyCardWithBgProps {
  image: string
  title: string
  rate: string
  gender: string
}

export function VacancyCardWithBg({ image, title, rate, gender }: VacancyCardWithBgProps) {
  return (
    <div className="group relative h-48 md:h-64 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 transition-opacity duration-300 group-hover:from-black/50 group-hover:to-black/80" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
        <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 drop-shadow-lg">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="bg-primary px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-sm md:text-lg shadow-lg">
            {rate}
          </div>
          <div className="text-xs md:text-sm text-white/90 font-medium">{gender}</div>
        </div>
      </div>
    </div>
  )
}
