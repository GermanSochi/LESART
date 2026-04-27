import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "../styles/les-new.css"

export const metadata: Metadata = {
  title: "Работа в загородном отеле LES Art Resort с проживанием и питанием в Москве и МО",
  description:
    "Ищем в премиум-отель LES Art Resort (Дорохово, 60 км от Москвы). Вакансии: повар, официант, горничная, стюард. Бесплатное проживание + 3-разовое питание + белая зарплата. Реальные голосовые отзывы сотрудников.",
  generator: "v0.app",
  metadataBase: new URL("https://lesart.ru"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Работа в LES Art Resort — с проживанием и питанием",
    description:
      "Вакансии в загородном отеле под Москвой: проживание, питание, белая зарплата. Ставки, условия, реальные голосовые отзывы сотрудников.",
    url: "https://lesart.ru/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Работа в LES Art Resort — с проживанием и питанием",
    description:
      "Вакансии в загородном отеле под Москвой: проживание, питание, белая зарплата. Реальные голосовые отзывы сотрудников.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jobLocation = {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Дорохово",
      addressLocality: "Одинцовский район",
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
  }

  const jobBenefits = "Бесплатное проживание на территории отеля, бесплатное 3-разовое питание, белая зарплата, оформление по срочному договору или как самозанятый"

  const hiringOrg = {
    "@type": "Organization",
    name: "LES Art Resort",
    url: "https://lesart.ru/",
    telephone: "+79189058585",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LodgingBusiness"],
        name: "LES Art Resort",
        url: "https://lesart.ru/",
        telephone: "+79189058585",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Дорохово",
          addressLocality: "Одинцовский район",
          addressRegion: "Московская область",
          addressCountry: "RU",
        },
        description:
          "Загородный курорт 4★, 60 км от Москвы по Минскому шоссе. Набор персонала: официанты, горничные, повара, стюарды. Бесплатное жильё и питание.",
      },
      {
        "@type": "WebSite",
        name: "Работа в LES Art Resort",
        url: "https://lesart.ru/",
        inLanguage: "ru-RU",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Есть ли работа с проживанием под Москвой?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да! LES Art Resort — 60 км от Москвы. Жильё бесплатно для всех сотрудников прямо на территории отеля.",
            },
          },
          {
            "@type": "Question",
            name: "Сколько реально зарабатывает горничная?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Горничная получает 370 ₽/ч. При стандартной смене — около 4 000–4 500 ₽ в день.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли приехать из другого города?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Конечно. К нам приезжают сотрудники со всей России. Жильё бесплатное, помогаем с адаптацией.",
            },
          },
          {
            "@type": "Question",
            name: "Какой график и сколько часов смена?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Смены от 11 часов. Графики: 5/2, 6/1 или 7/0 — обсуждается при оформлении.",
            },
          },
          {
            "@type": "Question",
            name: "Нужны ли опыт и медицинская книжка?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Медкнижка обязательна для всех. Опыт приветствуется, но не всегда обязателен — обучим.",
            },
          },
          {
            "@type": "Question",
            name: "Как быстро можно выйти на работу?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "При наличии всех документов — выход за 1–3 дня после собеседования.",
            },
          },
        ],
      },
      {
        "@type": "JobPosting",
        title: "Официант банкетный",
        description: "Обслуживание банкетных мероприятий в загородном курорте LES Art Resort. Бесплатное проживание и питание.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 420, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
        applicantLocationRequirements: { "@type": "Country", name: "RU" },
      },
      {
        "@type": "JobPosting",
        title: "Официант ресторана",
        description: "Обслуживание гостей в ресторане загородного курорта LES Art Resort.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 360, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
      {
        "@type": "JobPosting",
        title: "Повар",
        description: "Работа поваром в загородном курорте LES Art Resort, 60 км от Москвы.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 380, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
      {
        "@type": "JobPosting",
        title: "Горничная",
        description: "Уборка номеров в загородном курорте LES Art Resort. Проживание и питание бесплатно.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 370, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
      {
        "@type": "JobPosting",
        title: "Стюард",
        description: "Работа стюардом в LES Art Resort. Поддержка чистоты на кухне и в зонах обслуживания.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 340, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
      {
        "@type": "JobPosting",
        title: "Бармен",
        description: "Работа барменом в загородном курорте LES Art Resort.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 370, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
      {
        "@type": "JobPosting",
        title: "Су-шеф",
        description: "Су-шеф в LES Art Resort. Управление кухней совместно с шеф-поваром.",
        hiringOrganization: hiringOrg,
        jobLocation,
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "RUB",
          value: { "@type": "QuantitativeValue", value: 400, unitText: "HOUR" },
        },
        employmentType: "FULL_TIME",
        jobBenefits,
        datePosted: "2026-04-01",
        validThrough: "2026-12-31",
      },
    ],
  }

  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
