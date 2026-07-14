"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, ArrowLeft, Car, Train, AlertCircle, Home, Shield, Clock, Star, ChevronRight, CheckCircle2 } from "lucide-react"
import { getHotelBySlug } from "@/lib/hotels"
import { DynamicVacancyCard } from "@/components/dynamic-vacancy-card"
import { BenefitCard } from "@/components/benefit-card"
import { FAQSection } from "@/components/faq-section"
import { AdminPanel } from "@/components/admin-panel"
import { VoiceReviews } from "@/components/voice-reviews"
import { DormitoryGallery } from "@/components/dormitory-gallery"
import { ValueItem } from "@/components/value-item"
import { StandardItem } from "@/components/standard-item"
import { RuleCard } from "@/components/rule-card"

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
      <div className="bg-muted/50 border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Все объекты
          </Link>
          <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" />
            {hotel.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <Badge className="mb-2 text-sm px-5 py-2 bg-white/15 text-white border-white/25 backdrop-blur-sm">
              Набор открыт!
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-white drop-shadow-lg">
              Работа в загородном отеле
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
              Присоединяйся к команде №1 в гостеприимстве
            </p>
            <div className="flex flex-col items-center gap-3 pt-4">
              <a href={`tel:${hotel.phone}`}>
                <Button size="lg" className="text-base md:text-lg px-6 md:px-10 h-14 md:h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Phone className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                  Позвонить и устроиться за 1 день
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 md:py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">до {Math.max(...hotel.vacancies.map(v => v.rate))}₽</div>
              <div className="text-sm text-muted-foreground mt-1">в час</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">300+</div>
              <div className="text-sm text-muted-foreground mt-1">сотрудников</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{hotel.distanceKm} км</div>
              <div className="text-sm text-muted-foreground mt-1">от Москвы</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">5+ лет</div>
              <div className="text-sm text-muted-foreground mt-1">на рынке</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-8 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">О загородном отеле</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground">
              {hotel.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Badge variant="secondary" className="gap-1"><MapPin className="h-3.5 w-3.5" />{hotel.location}</Badge>
              <Badge variant="secondary">{hotel.distance}</Badge>
              <Badge variant="secondary">{hotel.territory}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-8 md:py-16 bg-muted/30">
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

      {/* Location Quick */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>{hotel.distance}</span>
            <span>·</span>
            <span>{hotel.highway}</span>
            <span>·</span>
            <span>{hotel.location}</span>
          </div>
        </div>
      </section>

      {/* "Твоё место" */}
      <section className="py-8 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Твоё место в команде уже ждёт</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto mb-10">
              Один из лучших загородных курортов Подмосковья — в окружении леса. Здесь работают 300+ человек. Жильё на территории, питание, стабильная зарплата.
            </p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Условия работы</h3>
                <ul className="space-y-2">
                  {hotel.conditions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Почему здесь остаются надолго</h3>
                <div className="grid grid-cols-2 gap-3">
                  {hotel.benefits.slice(0, 4).map((b) => (
                    <div key={b.title} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      {hotel.slug === "les-art-resort" && (
        <section className="py-8 md:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Твоё жильё</h2>
              <DormitoryGallery />
              <Card className="mt-6 p-5 md:p-6">
                <p className="text-muted-foreground leading-relaxed text-center">
                  {hotel.accommodation.details}
                </p>
                <p className="text-sm text-muted-foreground/70 text-center mt-3">
                  Заселение в проживание — строго в будние дни до 18:00.
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {hotel.slug !== "les-art-resort" && (
        <section className="py-8 md:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{hotel.accommodation.type}</h2>
              <Card className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground leading-relaxed">{hotel.accommodation.details}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Преимущества работы</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {hotel.benefits.map((b, i) => (
              <BenefitCard key={b.title} image={`/images/benefit-${["food", "housing", "payment", "career", "team", "schedule"][i % 6]}.jpg`} title={b.title} description={b.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Working Conditions Text */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Реальные условия работы</h2>
            <Card className="p-6 md:p-8 bg-gradient-to-br from-muted/50 to-muted/20">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Здесь вас ждёт настоящая работа в гостиничном бизнесе — интенсивная, динамичная, но с отличными условиями. Смены длятся от 11 часов и больше, в зависимости от загрузки отеля. Горничные ежедневно убирают 12-15 номеров. В сезон работа может быть 13-14 часов в день. График подбирается под ваши возможности: 5/2, 6/1 или 7/0. {hotel.accommodation.details} Оформление по срочному трудовому договору или как самозанятый. Минимум месяц, максимум — сколько захотите. Ценные кадры всегда ждут и ценят!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Voice Reviews */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-2">Социальное доказательство</p>
              <h2 className="text-2xl md:text-3xl font-bold">Говорят те, кто работает</h2>
            </div>
            <VoiceReviews />
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

      {/* Standards & Rules */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Для тех, кто хочет знать больше</h2>
              <p className="text-muted-foreground">Говорим честно — без воды и без страшилок</p>
            </div>

            {/* Standards */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">Стандарты внешнего вида</h3>
              <p className="text-sm text-muted-foreground mb-4">Каждый сотрудник — лицо отеля</p>
              <div className="space-y-3">
                <StandardItem icon="clothing" title="Одежда" text="Корпоративная форма, чистая и выглаженная с именным бейджем" image="/images/standard-clothing.jpg" />
                <StandardItem icon="shoes" title="Обувь" text="Классическая, чёрная, закрытая, без декора" image="/images/standard-shoes.jpg" />
                <StandardItem icon="hair" title="Волосы" text="Женщины: собранные в пучок. Мужчины: короткая стрижка" image="/images/standard-hair.jpg" />
                <StandardItem icon="jewelry" title="Украшения" text="Минимум: обручальное кольцо, по одной серёжке для женщин" image="/images/standard-clothing.jpg" />
                <StandardItem icon="hygiene" title="Гигиена" text="Личная чистота обязательна! Свежее дыхание, чистые руки" image="/images/standard-hair.jpg" />
              </div>
            </div>

            {/* Rules */}
            <div>
              <h3 className="text-xl font-bold mb-4">Основные правила</h3>
              <p className="text-sm text-muted-foreground mb-4">Мы ценим честность, порядок и профессионализм</p>
              <div className="space-y-3">
                <RuleCard text="Всегда выглядеть опрятно и стильно — ты лицо компании" />
                <RuleCard text="Передвигаться только по сотрудническому маршруту" />
                <RuleCard text="Русский язык в гостевых зонах, никаких громких разговоров" />
                <RuleCard text="Мобильные телефоны только на перерыве и вне гостевой зоны" />
                <RuleCard text="Курение строго в специальных местах" />
                <RuleCard text="Беречь имущество отеля, сразу сообщать о поломках" />
                <RuleCard text="Без медкнижки и документов не допускаем к работе" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-8 md:py-16 bg-muted/30">
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
                  <Button size="sm" variant="outline" className="w-full"><MapPin className="mr-2 h-4 w-4" /> Открыть маршрут</Button>
                </a>
              </Card>
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Train className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">Общественный транспорт</h3>
                </div>
                <p className="text-sm text-muted-foreground">{hotel.howToGetThere.public.description}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">Готовы начать?</h2>
            <p className="text-lg text-primary-foreground/90">Один звонок — и вы в команде. Выход на работу за 1-3 дня.</p>
            <a href={`tel:${hotel.phone}`}>
              <Button size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-10 h-14 md:h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Phone className="mr-2 h-5 w-5 md:h-6 md:w-6" />
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
          <p className="text-xs text-muted-foreground/60 mt-1">{hotel.distance} · {hotel.highway}</p>
        </div>
        <AdminPanel />
      </footer>
    </div>
  )
}
