export interface Hotel {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  location: string
  distance: string
  distanceKm: string
  highway: string
  stars: string
  territory: string
  rooms: string
  phone: string
  phoneDisplay: string
  heroImage: string
  color: string
  accommodation: {
    type: string
    details: string
  }
  benefits: { title: string; description: string }[]
  vacancies: { title: string; rate: number; gender: string; image: string }[]
  howToGetThere: {
    car: { time: string; description: string; mapUrl: string }
    public: { description: string }
  }
  conditions: string[]
  features: string[]
}

export const hotels: Hotel[] = [
  {
    slug: "les-art-resort",
    name: "LES Art Resort",
    shortName: "LES Art Resort",
    tagline: "Загородный курорт в сердце Подмосковья",
    description: "Загородный курорт на 60 км от Москвы по Минскому шоссе. Территория с бассейном, ресторанами и зелёной зоной. Работают 100+ человек.",
    location: "Дорохово, Одинцовский район",
    distance: "60 км от МКАД",
    distanceKm: "60",
    highway: "Минское шоссе",
    stars: "4+",
    territory: "загородная",
    rooms: "номера для гостей",
    phone: "+79189058585",
    phoneDisplay: "+7 (918) 905-85-85",
    heroImage: "/images/orig.jpg",
    color: "#2d6a4f",
    accommodation: {
      type: "Проживание на территории",
      details: "Бесплатное проживание в комнатах по 4-6 человек прямо на территории отеля. Кухня, прачечная, душевые — всё рядом."
    },
    benefits: [
      { title: "Бесплатное питание", description: "3-разовое питание каждый рабочий день" },
      { title: "Бесплатное жильё", description: "На территории отеля" },
      { title: "Белая зарплата", description: "Оформление, выплаты без задержек" },
      { title: "Карьерный рост", description: "Обучение и развитие в команде" },
      { title: "Сильная команда", description: "Дружелюбие и взаимовыручка" },
      { title: "Стабильный график", description: "5/2, 6/1 или 7/0" },
    ],
    vacancies: [
      { title: "Официант банкетный", rate: 420, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png" },
      { title: "Официант", rate: 360, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o0SL9GMRITmDLF9QTo6Q7hV4ygQ7Vb.png" },
      { title: "Повар", rate: 380, gender: "М/Ж", image: "/images/chef-cooking.jpg" },
      { title: "Су-шеф", rate: 400, gender: "М/Ж", image: "/images/sous-chef.jpg" },
      { title: "Стюард", rate: 340, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png" },
      { title: "Горничная", rate: 370, gender: "Женщины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png" },
      { title: "Бармен", rate: 370, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png" },
      { title: "Грузчик", rate: 360, gender: "Мужчины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZvfdMxqabiLi4LDwwAdrNV8YQbzIsv.png" },
    ],
    howToGetThere: {
      car: { time: "~60 минут", description: "от МКАД по Минскому шоссе", mapUrl: "https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~55.520648%2C36.355103&rtt=auto" },
      public: { description: "МЦД-4 до станции Дорохово, далее автобус или такси до отеля" },
    },
    conditions: [
      "Смены от 11 часов",
      "Графики: 5/2, 6/1 или 7/0",
      "Оформление по срочному трудовому договору или как самозанятый",
      "Горничные убирают 12-15 номеров в день",
      "В сезон возможно до 14 часов",
    ],
    features: ["Бассейн", "Рестораны", "Банкетный зал", "Парковка", "Wi-Fi"],
  },
  {
    slug: "emerald-forest",
    name: "Загородный отель в лесу",
    shortName: "Лесной отель",
    tagline: "Тишина леса и озера — 220 га природы",
    description: "Пятизвездочный загородный отель на 88 км от МКАД по Ленинградскому шоссе. 220 гектаров лесного массива с собственным озером, сафари-парком и спа-центром.",
    location: "Клинский район, Ленинградское шоссе",
    distance: "88 км от МКАД",
    distanceKm: "88",
    highway: "Ленинградское шоссе",
    stars: "5",
    territory: "220 га леса с озером",
    rooms: "143 номера: студии, дуплекс-сьюты, люксы, коттеджи, виллы",
    phone: "+74954020201",
    phoneDisplay: "+7 (495) 402-02-01",
    heroImage: "/images/emerald-hero.jpg",
    color: "#1b4332",
    accommodation: {
      type: "Проживание на территории",
      details: "Бесплатное проживание для сотрудников в служебных номерах на территории отеля. Озеро, лес, свежий воздух — всё рядом."
    },
    benefits: [
      { title: "Бесплатное питание", description: "3-разовое питание в сотрудничьей столовой" },
      { title: "Проживание на территории", description: "Служебные номера в лесном массиве" },
      { title: "Белая зарплата", description: "Полное оформление, выплаты без задержек" },
      { title: "Спа и бассейн", description: "Бесплатное использование для сотрудников" },
      { title: "Карьерный рост", description: "Обучение в сети отелей" },
      { title: "Природа", description: "220 га леса, озеро, чистый воздух" },
    ],
    vacancies: [
      { title: "Официант ресторан", rate: 400, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png" },
      { title: "Повар", rate: 420, gender: "М/Ж", image: "/images/chef-cooking.jpg" },
      { title: "Су-шеф", rate: 450, gender: "М/Ж", image: "/images/sous-chef.jpg" },
      { title: "Горничная", rate: 390, gender: "Женщины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png" },
      { title: "Бармен", rate: 380, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png" },
      { title: "Стюард", rate: 360, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png" },
      { title: "Аниматор", rate: 370, gender: "М/Ж", image: "/images/chef-cooking.jpg" },
      { title: "Спа-массажист", rate: 400, gender: "М/Ж", image: "/images/sous-chef.jpg" },
    ],
    howToGetThere: {
      car: { time: "~90 минут", description: "от МКАД по Ленинградскому шоссе", mapUrl: "https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~56.286861%2C36.861492&rtt=auto" },
      public: { description: "Электричка до Клина, далее такси до отеля (~15 мин)" },
    },
    conditions: [
      "Смены от 11 часов",
      "Графики: 5/2, 6/1 или 7/0",
      "Оформление по трудовому договору",
      "Виллы у озера — для VIP-гостей",
      "7 ресторанов на территории",
    ],
    features: ["Сафари-парк", "СПА-центр", "Бассейн", "7 ресторанов", "Озеро", "Конный клуб"],
  },
  {
    slug: "campus-hotel",
    name: "Загородный отель у парка",
    shortName: "Парковый отель",
    tagline: "Современный отель в окружении парка",
    description: "Пятизвездочный загородный отель на 45 км от МКАД в Истринском районе. Образовательный и гостиничный комплекс с конференц-залами, спортивным комплексом и спа.",
    location: "Истринский район, д. Аносино",
    distance: "45 км от МКАД",
    distanceKm: "45",
    highway: "Новорижское шоссе",
    stars: "5",
    territory: "парковая зона",
    rooms: "250 стандартных номеров, 46 люксов, 15 коттеджей",
    phone: "+74956654340",
    phoneDisplay: "+7 (495) 665-43-40",
    heroImage: "/images/campus-hero.jpg",
    color: "#2d6a4f",
    accommodation: {
      type: "Компенсация аренды жилья",
      details: "Проживание на территории не предусмотрено. Выдаётся компенсация на аренду жилья вблизи от отеля. Помощь в поиске жилья."
    },
    benefits: [
      { title: "Компенсация аренды", description: "Выплата на съём жилья рядом с отелем" },
      { title: "Бесплатное питание", description: "3-разовое питание в столовой" },
      { title: "Белая зарплата", description: "Полное оформление, выплаты без задержек" },
      { title: "Спортивный комплекс", description: "Бесплатный доступ для сотрудников" },
      { title: "Карьерный рост", description: "Корпоративное обучение" },
      { title: "Близко к Москве", description: "Всего 45 км — удобная транспортная доступность" },
    ],
    vacancies: [
      { title: "Официант", rate: 380, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o0SL9GMRITmDLF9QTo6Q7hV4ygQ7Vb.png" },
      { title: "Повар", rate: 400, gender: "М/Ж", image: "/images/chef-cooking.jpg" },
      { title: "Горничная", rate: 380, gender: "Женщины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png" },
      { title: "Стюард", rate: 350, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png" },
      { title: "Бармен", rate: 380, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png" },
      { title: "Спа-массажист", rate: 420, gender: "М/Ж", image: "/images/sous-chef.jpg" },
      { title: "Администратор", rate: 360, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png" },
      { title: "Техник", rate: 350, gender: "Мужчины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZvfdMxqabiLi4LDwwAdrNV8YQbzIsv.png" },
    ],
    howToGetThere: {
      car: { time: "~50 минут", description: "от МКАД по Новорижскому шоссе", mapUrl: "https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~55.913491%2C37.184182&rtt=auto" },
      public: { description: "Электричка до ст. Истра, далее автобус или такси (~10 мин)" },
    },
    conditions: [
      "Смены от 11 часов",
      "Графики: 5/2, 6/1 или 7/0",
      "Оформление по трудовому договору",
      "Компенсация аренды жилья ежемесячно",
      "Конференц-залы и бизнес-мероприятия",
    ],
    features: ["СПА и бассейн", "Спорткомплекс", "Конференц-залы", "Парк", "Алтайская баня", "Парковка"],
  },
]

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find(h => h.slug === slug)
}
