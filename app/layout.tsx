import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Работа в загородных отелях — вакансии с проживанием в Москве и МО",
  description:
    "Ищем сотрудников в загородные отели Московской области. Вакансии: повар, официант, горничная, стюард, бармен. Бесплатное питание, белая зарплата, карьерный рост.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>{children}<Analytics /></body>
    </html>
  )
}
