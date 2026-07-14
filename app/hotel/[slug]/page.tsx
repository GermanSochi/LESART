"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, ArrowLeft, Car, Train, AlertCircle, Home, Utensils, Wallet, Users, ChevronDown } from "lucide-react"
import { getHotelBySlug } from "@/lib/hotels"
import { DynamicVacancyCard } from "@/components/dynamic-vacancy-card"
import { BenefitCard } from "@/components/benefit-card"
import { FAQSection } from "@/components/faq-section"
import { AdminPanel } from "@/components/admin-panel"
import { useState } from "react"

export default function HotelPage() {
  const params = useParams()
  const slug = params?.slug as string
  const hotel = getHotelBySlug(slug)

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Отель не найден</h1>
          <Link href="/">
            <Button><ArrowLeft className="mr-2 h-4 w-4" /> На главную</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Все объекты
          </Link>
          <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4 text-primary" />
            {hotel.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[350px] md:min-h-[450px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Badge className="mb-2 text-sm px-4 py-1.5 bg-white/20 text-white border-white/30">
              Набор открыт! ★ {hotel.stars}
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-white drop-shadow-lg">
              Работа в загородном отеле
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow">
              {hotel.name} — {hotel.distance} по {hotel.highway}
            </p>
            <div className="flex flex-col items-center gap-3 pt-3">
              <a href={`tel:${hotel.phone}`}>
                <Button size="lg" className="text-base px-8 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Phone className="mr-2 h-5 w-5" />
                  Позвонить: {hotel.phoneDisplay}
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-white/80">
              {hotel.features.slice(0, 4).map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">О загородном отеле</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              {hotel.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Badge variant="secondary"><MapPin className="h-3.5 w-3.5 mr-1" />{hotel.location}</Badge>
              <Badge variant="secondary">{hotel.distance}</Badge>
              <Badge variant="secondary">{hotel.territory}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Открытые вакансии</h2>
            <p className="text-muted-foreground">Оформление в день прихода. Реальные ставки без скрытых условий.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {hotel.vacancies.map((v) => (
              <DynamicVacancyCard key={v.title} image={v.image} title={v.title} defaultRate={v.rate} gender={v.gender} />
            ))}
          </div>

          {/* Medical Book Warning */}
          <div className="mt-8 max-w-2xl mx-auto">
            <Card className="p-5 bg-gradient-to-r from-destructive/5 to-destructive/10 border-destructive/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-bold text-destructive">Строго с документами!</p>
                  <p className="text-sm text-muted-foreground">Личная медицинская книжка обязательна для всех позиций</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Accommodation Info */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{hotel.accommodation.type}</h3>
                  <p className="text-muted-foreground leading-relaxed">{hotel.accommodation.details}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Преимущества работы</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {hotel.benefits.map((b) => (
              <BenefitCard key={b.title} image="/images/benefit-career.jpg" title={b.title} description={b.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Working Conditions */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Условия работы</h2>
            <Card className="p-6 md:p-8">
              <ul className="space-y-3">
                {hotel.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Как добраться</h2>
              <p className="text-muted-foreground">{hotel.location}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">На автомобиле</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{hotel.howToGetThere.car.time} {hotel.howToGetThere.car.description}</p>
                <a href={hotel.howToGetThere.car.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="w-full"><MapPin className="mr-2 h-4 w-4" /> Маршрут</Button>
                </a>
              </Card>
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Train className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">Транспорт</h3>
                </div>
                <p className="text-sm text-muted-foreground">{hotel.howToGetThere.public.description}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
            <FAQSection />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">Готовы начать?</h2>
            <p className="text-lg text-primary-foreground/90">Один звонок — и вы в команде. Выход за 1-3 дня.</p>
            <a href={`tel:${hotel.phone}`}>
              <Button size="lg" variant="secondary" className="text-lg px-10 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Phone className="mr-2 h-6 w-6" />
                {hotel.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground font-medium">
            © 2025 Загородные отели. Приезжай, работай, развивайся!
          </p>
        </div>
        <AdminPanel />
      </footer>
    </div>
  )
}
