"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

const defaultFaqs: FAQ[] = [
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
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs)

  useEffect(() => {
    const loadFaqs = () => {
      const savedFaqs = localStorage.getItem("faqItems")
      if (savedFaqs) {
        setFaqs(JSON.parse(savedFaqs))
      }
    }
    loadFaqs()
    
    const handleUpdate = () => loadFaqs()
    window.addEventListener("faqsUpdated", handleUpdate)
    return () => window.removeEventListener("faqsUpdated", handleUpdate)
  }, [])

  return (
    <div className="space-y-2 md:space-y-3">
      {faqs.map((faq, index) => (
        <Card
          key={index}
          className={`overflow-hidden cursor-pointer transition-all duration-300 ${
            openIndex === index ? "shadow-lg border-primary/30" : "hover:shadow-md"
          }`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageCircleQuestion className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-medium text-sm md:text-base flex-1">{faq.question}</h3>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-primary" : ""
              }`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 pt-0 pl-16">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs)

  useEffect(() => {
    const savedFaqs = localStorage.getItem("faqItems")
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs))
    }
  }, [])

  return faqs
}
