"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Home, Utensils, Wallet, Users, ArrowRight, Sparkles } from "lucide-react"
import { hotels } from "@/lib/hotels"
import { AdminPanel } from "@/components/admin-panel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <Badge className="mb-3 text-sm px-4 py-1.5 bg-white/20 text-white border-white/30">
              Набор открыт в 3 объектах
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance drop-shadow-lg">
              Работа в загородных отелях
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-balance drop-shadow max-w-2xl mx-auto">
              Выберите объект в Москве и Московской области. Бесплатное питание, белая зарплата, карьерный рост.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a href="tel:+79189058585">
                <Button size="lg" variant="secondary" className="text-base px-8 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Phone className="mr-2 h-5 w-5" />
                  +7 (918) 905-85-85
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-white/80">
              <div className="flex items-center gap-2"><Home className="h-4 w-4" /> Жильё</div>
              <div className="flex items-center gap-2"><Utensils className="h-4 w-4" /> Питание</div>
              <div className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Белая оплата</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Команда</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Cards */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Выберите объект</h2>
            <p className="text-base md:text-lg text-muted-foreground">Три загородных отеля в Московской области</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {hotels.map((hotel) => (
              <Link key={hotel.slug} href={`/hotel/${hotel.slug}`}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border-0 shadow-lg h-full">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-foreground font-bold">{hotel.stars}★</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">{hotel.shortName}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-white/80" />
                        <span className="text-white/80 text-sm">{hotel.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.slice(0, 3).map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        от {Math.min(...hotel.vacancies.map(v => v.rate))} ₽/час
                      </span>
                      <Button size="sm" className="group-hover:gap-2 transition-all">
                        Смотреть <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Почему выбирают нас</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <Home className="h-6 w-6" />, title: "Жильё", desc: "Бесплатное проживание или компенсация аренды" },
                { icon: <Utensils className="h-6 w-6" />, title: "Питание", desc: "3-разовое питание каждый рабочий день" },
                { icon: <Wallet className="h-6 w-6" />, title: "Зарплата", desc: "Белая оплата, выплаты без задержек" },
                { icon: <Sparkles className="h-6 w-6" />, title: "Рост", desc: "Обучение и карьерные возможности" },
              ].map((item) => (
                <Card key={item.title} className="p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">Готовы начать?</h2>
            <p className="text-lg text-primary-foreground/90">Один звонок — и вы в команде. Выход на работу за 1-3 дня.</p>
            <a href="tel:+79189058585">
              <Button size="lg" variant="secondary" className="text-lg px-10 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Phone className="mr-2 h-6 w-6" />
                +7 (918) 905-85-85
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
