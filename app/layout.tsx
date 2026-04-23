import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "LES Art Resort",
        url: "https://lesart.ru/",
      },
      {
        "@type": "WebSite",
        name: "Работа в LES Art Resort",
        url: "https://lesart.ru/",
        inLanguage: "ru-RU",
      },
    ],
  }

  return (
    <html lang="ru">
      <body className={`font-sans antialiased`}>
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
