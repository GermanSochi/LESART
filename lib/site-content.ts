import { promises as fs } from "node:fs"
import path from "node:path"

export type AudioReview = {
  id: string
  name: string
  position: string
  audioUrl: string
  avatarUrl?: string
}

export type VacancyRates = Record<string, number>

export type Vacancy = {
  id: string
  title: string
  rate: number
  gender: string
  image: string
  active: boolean
}

export type FAQ = {
  question: string
  answer: string
}

export type HeroBackground =
  | { kind: "image"; url: string }
  | { kind: "video"; url: string; posterUrl?: string }

export type SiteContent = {
  version: 1
  updatedAt: string
  media: {
    hotelImages: { src: string; alt: string }[]
    dormitoryImages: { src: string; alt: string }[]
  }
  sections: {
    about: {
      title: string
      text: string
    }
    vacancies: {
      title: string
      subtitle: string
    }
    conditions: {
      title: string
      text: string
    }
    seoArticle: {
      title: string
      html: string
    }
    voiceReviews: {
      title: string
      subtitle: string
    }
    faq: {
      title: string
    }
    benefits: {
      title: string
    }
    howToGetThere: {
      title: string
      subtitle: string
      car: { title: string; description: string; routeUrl: string; image: string }
      transit: { title: string; description: string; image: string }
    }
    values: {
      title: string
      items: string[]
    }
    standards: {
      title: string
      subtitle: string
      bannerImage: { src: string; alt: string }
    }
    rules: {
      title: string
      subtitle: string
      items: string[]
    }
    cta: {
      title: string
      subtitle: string
    }
    footer: {
      copyright: string
    }
  }
  hero: {
    title: string
    subtitle: string
    background: HeroBackground
  }
  audioReviews: AudioReview[]
  vacancies: Vacancy[]
  vacancyRates: VacancyRates
  faqs: FAQ[]
}

const DATA_DIR = path.join(process.cwd(), "data")
const CONTENT_PATH = path.join(DATA_DIR, "site-content.json")
const BLOB_PATHNAME = "admin/site-content.json"

function useBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

async function readFromBlob(): Promise<SiteContent | null> {
  try {
    const { list } = await import("@vercel/blob")
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 })
    if (blobs.length === 0) return null
    const res = await fetch(blobs[0].downloadUrl, { cache: "no-store" })
    if (!res.ok) return null
    return (await res.json()) as SiteContent
  } catch {
    return null
  }
}

async function writeToBlob(content: SiteContent): Promise<void> {
  const { put } = await import("@vercel/blob")
  const json = JSON.stringify(content, null, 2)
  await put(BLOB_PATHNAME, json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  })
}

export function defaultSiteContent(): SiteContent {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    media: {
      hotelImages: [
        { src: "/images/vf0knk43chz6eaosf50ihmkdbak58uh3.jpg", alt: "Бассейн отеля" },
        { src: "/images/dfefd2cf78c253b17824ca626eff1bd2fea71eed.jpg", alt: "Вид на территорию" },
        { src: "/images/mdp90wmg206eotljsbr03hgonf3kmlvs.jpeg", alt: "Главное здание" },
      ],
      dormitoryImages: [
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-50-GIFcT8LRI7WPTBUTO6c8JNjwyPaW7h.jpg", alt: "Кухонная зона" },
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-52%20%282%29-7RQjepmOma4FhtgrWLUUQfYUe461dD.jpg", alt: "Холодильник и микроволновая печь" },
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-53-6VuIPYV4iHPjFxKCKwYK20bbEoIaem.jpg", alt: "Прачечная" },
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-52%20%283%29-jQwLatdgxqVGaCQYg0QVY679vDWbPi.jpg", alt: "Душевая" },
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-51-l1OhteJyNDd2PMW4egnRTaAgAVdOz3.jpg", alt: "Общая зона" },
        { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-01-12_15-21-51%20%282%29-KOZXKQodO86ZPLldOffUKWsM61MdoM.jpg", alt: "Лестница" },
      ],
    },
    sections: {
      about: {
        title: "О LES Art Resort",
        text: "<span class=\"font-semibold\">Идеология HOLA Clusive</span> — это самая счастливая атмосфера, улыбки всех гостей, уникальный комплекс услуг и тёплый радушный приём.",
      },
      vacancies: {
        title: "Выбери свою роль",
        subtitle: "Открытые вакансии с реальными ставками",
      },
      conditions: {
        title: "Реальные условия работы",
        text: "Здесь вас ждёт настоящая работа в гостиничном бизнесе — интенсивная, динамичная, но с отличными условиями. Смены длятся от 11 часов и больше, в зависимости от загрузки отеля. Горничные ежедневно убирают 12-15 номеров. В сезон работа может быть 13-14 часов в день. График подбирается под ваши возможности: 5/2, 6/1 или 7/0. Проживание в комнатах по 4-6 человек — чисто, тепло, со всеми удобствами. Оформление по срочному трудовому договору или как самозанятый. Минимум месяц, максимум — сколько захотите. Ценные кадры всегда ждут и ценят! Да, работа физически насыщенная, но взамен — бесплатное проживание, питание и честная белая зарплата.",
      },
      seoArticle: {
        title: "Работа в загородном отеле с проживанием: условия, вакансии, ответы",
        html: "<p>Ищете работу с проживанием в Москве и Московской области? LES Art Resort — это стабильные смены, бесплатное проживание и питание, белая зарплата и понятные условия. Ниже — ответы на частые вопросы, реальные ставки по вакансиям и голосовые отзывы сотрудников.</p>",
      },
      voiceReviews: {
        title: "Говорят те, кто уже работает",
        subtitle: "Реальные голосовые отзывы сотрудников",
      },
      faq: {
        title: "Часто задаваемые вопросы",
      },
      benefits: {
        title: "Почему выбирают нас",
      },
      howToGetThere: {
        title: "Как добраться",
        subtitle: "60 км от Москвы по Минскому шоссе",
        car: {
          title: "На автомобиле",
          description: "Около 60 минут от Москвы по Минскому шоссе",
          routeUrl:
            "https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~55.520648%2C36.355103&rtt=auto&ruri=ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3Dstation__lh_9602218~ymapsbm1%3A%2F%2Forg%3Foid%3D1242864809&z=11.3",
          image: "/images/transport-car.jpg",
        },
        transit: {
          title: "Общественный транспорт",
          description: "МЦД-4 до станции Лесной Городок, далее автобус до отеля",
          image: "/images/transport-train.jpg",
        },
      },
      values: {
        title: "Работая у нас, ты",
        items: [
          "Уважаешь разнообразие гостей и коллег",
          "С гордостью представляешь компанию",
          "Постоянно учишься и реализуешь инициативы",
          "Работаешь в команде по принципу поддержки",
          "Идёшь вперёд ради ярких впечатлений гостей",
          "Всегда с улыбкой и уважением к «Друзьям Отеля»",
        ],
      },
      standards: {
        title: "Стандарты внешнего вида",
        subtitle: "Каждый сотрудник — лицо отеля",
        bannerImage: {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kTRxPknDJ72i6QQGq5ojeoNR6tdsSr.png",
          alt: "Стандарты формы сотрудников",
        },
      },
      rules: {
        title: "Основные правила",
        subtitle: "Мы ценим честность, порядок и профессионализм",
        items: [
          "Всегда выглядеть опрятно и стильно (ты — лицо компании)",
          "Передвигаться только по сотрудническому маршруту",
          "Русский язык в гостевых зонах, никаких громких разговоров",
          "Мобильные телефоны только на перерыве и вне гостевой зоны",
          "Курение строго в специальных местах",
          "Беречь имущество отеля, сразу сообщать о поломках",
          "Без медкнижки и документов не допускаем к работе",
        ],
      },
      cta: {
        title: "Один звонок — и ты в команде",
        subtitle: "Ответим прямо сейчас. Выход на работу за 1–3 дня.",
      },
      footer: {
        copyright: "© 2025 LES Art Resort. Приезжай, работай, развивайся!",
      },
    },
    hero: {
      title: "Работай там, где мечтают отдыхать",
      subtitle: "Жильё · Питание · Белая зарплата · 60 км от Москвы",
      background: { kind: "image", url: "/images/orig.jpg" },
    },
    audioReviews: [],
    vacancies: [
      {
        id: "waiter",
        title: "Официант",
        rate: 360,
        gender: "М/Ж",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o0SL9GMRITmDLF9QTo6Q7hV4ygQ7Vb.png",
        active: true,
      },
      { id: "chef", title: "Повар", rate: 380, gender: "М/Ж", image: "/images/chef-cooking.jpg", active: true },
      { id: "sous-chef", title: "Су-шеф", rate: 400, gender: "М/Ж", image: "/images/sous-chef.jpg", active: true },
      {
        id: "steward",
        title: "Стюард",
        rate: 340,
        gender: "М/Ж",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png",
        active: true,
      },
      {
        id: "housekeeper",
        title: "Горничная",
        rate: 370,
        gender: "Женщины",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png",
        active: true,
      },
      {
        id: "barman",
        title: "Бармен",
        rate: 370,
        gender: "М/Ж",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png",
        active: true,
      },
      {
        id: "banquet-waiter",
        title: "Официант банкетный",
        rate: 420,
        gender: "М/Ж",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png",
        active: true,
      },
      {
        id: "loader",
        title: "Грузчик",
        rate: 360,
        gender: "Мужчины",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZvfdMxqabiLi4LDwwAdrNV8YQbzIsv.png",
        active: true,
      },
    ],
    vacancyRates: {
      "Официант": 360,
      "Повар": 380,
      "Су-шеф": 400,
      "Стюард": 340,
      "Горничная": 370,
      "Бармен": 370,
      "Официант банкетный": 420,
      "Грузчик": 360,
    },
    faqs: [
      { question: "Есть ли работа с проживанием в загородном отеле под Москвой?", answer: "Да! LES Art Resort находится в 60 км от Москвы." },
      { question: "Сколько реально зарабатывает горничная?", answer: "Горничная получает 370 рублей в час." },
      { question: "Можно ли приехать из другого города России?", answer: "Конечно! К нам приезжают сотрудники со всей России." },
      { question: "Какой график и сколько часов смена?", answer: "Смены по 11 часов и больше." },
      { question: "Нужен ли опыт и медкнижка?", answer: "Медкнижка обязательна для всех без исключений." },
      { question: "Как быстро можно выйти на работу?", answer: "При наличии документов — выход возможен в течение 1-3 дней." },
    ],
  }
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

export async function readSiteContent(): Promise<SiteContent> {
  if (useBlob()) {
    const content = await readFromBlob()
    if (content) return content
    const defaultContent = defaultSiteContent()
    await writeToBlob(defaultContent)
    return defaultContent
  }

  await ensureDataDir()
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8")
    return JSON.parse(raw) as SiteContent
  } catch {
    const content = defaultSiteContent()
    await writeSiteContent(content)
    return content
  }
}

export async function writeSiteContent(next: SiteContent): Promise<void> {
  const toWrite: SiteContent = {
    ...next,
    version: 1,
    updatedAt: new Date().toISOString(),
  }

  if (useBlob()) {
    await writeToBlob(toWrite)
    return
  }

  await ensureDataDir()
  await fs.writeFile(CONTENT_PATH, JSON.stringify(toWrite, null, 2), "utf8")
}
