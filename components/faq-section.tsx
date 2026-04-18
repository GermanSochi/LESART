"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Есть ли работа с проживанием в загородном отеле под Москвой?",
    answer: "Да! LES Art Resort находится в 60 км от Москвы (Дорохово). Мы предоставляем бесплатное проживание и 3-разовое питание для всех сотрудников. Комнаты рассчитаны на 4-6 человек.",
  },
  {
    question: "Сколько реально зарабатывает горничная?",
    answer: "Горничная получает 370 рублей в час. При полной загрузке (11+ часов в день, 5-6 дней в неделю) можно зарабатывать от 80 000 до 120 000 рублей в месяц. Оплата белая, без задержек.",
  },
  {
    question: "Можно ли приехать из другого города России?",
    answer: "Конечно! К нам приезжают сотрудники со всей России. Мы предоставляем жильё и питание, так что вам нужно только добраться до нас. Минимальная вахта — 1 месяц.",
  },
  {
    question: "Какой график и сколько часов смена?",
    answer: "Смены по 11 часов и больше — зависит от загрузки отеля и ваших сил. График гибкий: 5/2, 6/1 или даже 7/0 по желанию. Горничные убирают 12-15 номеров в день.",
  },
  {
    question: "Нужен ли опыт и медкнижка?",
    answer: "Медкнижка обязательна для всех без исключений. Опыт приветствуется, но не обязателен — мы обучаем. Главное: ответственность, трудолюбие и позитивный настрой.",
  },
  {
    question: "Как быстро можно выйти на работу?",
    answer: "При наличии медкнижки и документов — выход возможен в течение 1-3 дней после собеседования. Позвоните нам, и мы всё организуем максимально быстро!",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2 md:space-y-3">
      {faqs.map((faq, index) => (
        <Card
          key={index}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="p-4 flex items-center justify-between gap-3">
            <h3 className="font-medium text-sm md:text-base">{faq.question}</h3>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>
          {openIndex === index && (
            <div className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
