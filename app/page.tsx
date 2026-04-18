import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Users, Home, Utensils, Wallet, Clock, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { DormitoryGallery } from "@/components/dormitory-gallery"

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - significantly reduced padding and height for mobile */}
      <section className="relative bg-accent text-accent-foreground overflow-hidden min-h-[400px] md:min-h-[500px] animate-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/orig.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="container mx-auto px-3 py-8 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-5">
            <Badge className="mb-1 md:mb-3 text-sm md:text-base px-4 md:px-4 py-1.5 md:py-2 bg-primary text-primary-foreground animate-slide-down">
              {"Набор открыт!"}
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-white drop-shadow-lg animate-slide-up">
              Работа в LES Art Resort
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 text-balance drop-shadow animate-slide-up delay-100">
              Присоединяйся к команде №1 в гостеприимстве
            </p>
            <div className="flex flex-col items-center gap-2 md:gap-4 pt-3 md:pt-5 animate-slide-up delay-200">
              <a href="tel:+79189058585">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5 md:h-5 md:w-5" />
                  {"Позвонить +7 (918) 905-85-85"}
                </Button>
              </a>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-sm md:text-sm text-white/80">Доступно в:</span>
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-8 h-8 md:w-8 md:h-8 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 md:w-8 md:h-8 bg-[#0088cc] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.11C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 md:pt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 max-w-3xl mx-auto">
              <div className="flex flex-col items-center animate-fade-in delay-300">
                <Home className="h-8 w-8 md:h-9 md:w-9 mb-1 md:mb-2 text-background" />
                <span className="text-xs md:text-sm font-medium text-center leading-tight text-background">
                  {"Бесплатное проживание"}
                </span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-400">
                <Utensils className="h-8 w-8 md:h-9 md:w-9 mb-1 md:mb-2 text-background" />
                <span className="text-xs md:text-sm font-medium text-center leading-tight text-background">
                  {"Бесплатное питание"}
                </span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-500">
                <Wallet className="h-8 w-8 md:h-9 md:w-9 mb-1 md:mb-2 text-background" />
                <span className="text-xs md:text-sm font-medium text-center leading-tight text-background">
                  {"Белая оплата"}
                </span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-600">
                <Users className="h-8 w-8 md:h-9 md:w-9 mb-1 md:mb-2 text-background" />
                <span className="text-xs md:text-sm font-medium text-center leading-tight text-background">
                  {"Дружная команда"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About HOLA Clusive - minimal padding for mobile */}
      <section className="py-5 md:py-14 bg-muted/30 animate-fade-in">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto text-center space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{"О LES Art Resort"}</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              <span className="font-semibold">{"Идеология HOLA Clusive"}</span> — это счастливая атмосфера, улыбки всех
              гостей, уникальный комплекс услуг и тёплый радушный приём.
            </p>
          </div>
        </div>
      </section>

      {/* Hotel Images Gallery - smaller images and gaps */}
      <section className="py-4 md:py-10 bg-background">
        <div className="container mx-auto px-3">
          <div className="grid md:grid-cols-3 gap-2 md:gap-4 max-w-6xl mx-auto">
            <div className="h-32 md:h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="/images/vf0knk43chz6eaosf50ihmkdbak58uh3.jpg"
                alt="Бассейн отеля"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-32 md:h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="/images/dfefd2cf78c253b17824ca626eff1bd2fea71eed.jpg"
                alt="Вид на территорию"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-32 md:h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="/images/mdp90wmg206eotljsbr03hgonf3kmlvs.jpeg"
                alt="Главное здание"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies Section - reduced spacing */}
      <section className="py-6 md:py-16">
        <div className="container mx-auto px-3">
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{"Какие бывают вакансии"}</h2>
            <p className="text-sm md:text-lg text-muted-foreground">{"Выбери свою роль в нашей команде"}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
            <VacancyCard icon="👩‍🍳" title="Повар" rate="380₽/час" gender="М/Ж" />
            <VacancyCard icon="🍽" title="Официант" rate="360₽/час" gender="М/Ж" />
            <VacancyCard icon="🧴" title="Стюард" rate="340₽/час" gender="М/Ж" />
            <VacancyCard icon="🏋️" title="Грузчик" rate="360₽/час" gender="Мужчины" />
            <VacancyCard icon="🥂" title="Официант банкетный" rate="420₽/час" gender="М/Ж" />
            <VacancyCard icon="🍾" title="Официант премиум" rate="370₽/час" gender="М/Ж" />
            <VacancyCard icon="🧼" title="Горничная" rate="360₽/час" gender="Женщины" />
            <VacancyCard icon="🧹" title="Хаусмен" rate="350₽/час" gender="Мужчины" />
          </div>

          <div className="mt-4 md:mt-7 text-center">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 md:px-6 py-2.5 md:py-3 rounded-lg">
              <AlertCircle className="h-5 w-5 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base font-semibold">
                {"Строго с документами и медицинской книжкой!"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - compact for mobile */}
      <section className="py-6 md:py-16 bg-muted/30">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto text-center space-y-2 md:space-y-4 mb-4 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold">{"Преимущества работы у нас"}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
            <BenefitCard
              icon={<Utensils className="h-5 w-5 md:h-8 md:w-8" />}
              title="Бесплатное питание"
              description="3-х разовое питание для всех сотрудников"
            />
            <BenefitCard
              icon={<Home className="h-5 w-5 md:h-8 md:w-8" />}
              title="Бесплатное проживание"
              description="Комфортное жильё на территории отеля"
            />
            <BenefitCard
              icon={<Wallet className="h-5 w-5 md:h-8 md:w-8" />}
              title="Белая оплата"
              description="За каждый час, выплаты без задержек"
            />
            <BenefitCard
              icon={<Sparkles className="h-5 w-5 md:h-8 md:w-8" />}
              title="Карьерный рост"
              description="Обучение и развитие в команде"
            />
            <BenefitCard
              icon={<Users className="h-5 w-5 md:h-8 md:w-8" />}
              title="Сильная команда"
              description="Дружелюбие и взаимовыручка"
            />
            <BenefitCard
              icon={<Clock className="h-5 w-5 md:h-8 md:w-8" />}
              title="Стабильный график"
              description="Чёткий график и поддержка"
            />
          </div>

          <div className="mt-5 md:mt-10 max-w-3xl mx-auto">
            <div className="mb-2 md:mb-3">
              <h3 className="text-base md:text-lg font-medium text-muted-foreground text-center">
                {"Условия проживания"}
              </h3>
            </div>
            <DormitoryGallery />
          </div>
        </div>
      </section>

      {/* How to Get There - compact cards */}
      <section className="py-6 md:py-16">
        <div className="container mx-auto px-3">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-5 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{"Как добраться"}</h2>
              <p className="text-sm md:text-lg text-muted-foreground">{"Мы находимся рядом с Москвой"}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-primary text-primary-foreground p-2.5 md:p-3 rounded-lg">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{"На автомобиле"}</h3>
                    <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">
                      LES Art Resort на Яндекс.Картах. Около 60 минут от Москвы.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-primary text-primary-foreground p-2.5 md:p-3 rounded-lg">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{"Общественный транспорт"}</h3>
                    <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">
                      МЦД-4 до станции Лесной Городок, далее автобус до отеля.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Working with us - tighter spacing */}
      <section className="py-6 md:py-16 bg-muted/30">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-5 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold">{"Работая у нас, ты"}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
              <ValueItem text="Уважаешь разнообразие гостей и коллег" />
              <ValueItem text="С гордостью представляешь компанию" />
              <ValueItem text="Постоянно учишься и реализуешь инициативы" />
              <ValueItem text="Работаешь в команде по принципу поддержки" />
              <ValueItem text="Идёшь вперёд ради ярких впечатлений гостей" />
              <ValueItem text="Всегда с улыбкой и уважением к 'Друзьям Отеля'" />
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section - replaced image with new uniform photo */}
      <section className="py-6 md:py-16">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-5 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{"Стандарты внешнего вида"}</h2>
              <p className="text-sm md:text-lg text-muted-foreground">{"Каждый сотрудник — лицо отеля"}</p>
            </div>

            <div className="mb-4 md:mb-7 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/7bf58d27d2-10c7-475b-836f-6bda4c8b3191-7d.png"
                alt="Стандарты формы сотрудников"
                className="w-full h-auto"
              />
            </div>

            <Card className="p-4 md:p-8">
              <div className="space-y-3 md:space-y-5">
                <StandardItem
                  emoji="👔"
                  title="Одежда"
                  text="Корпоративная форма, чистая и выглаженная с именным бейджем"
                />
                <StandardItem emoji="👞" title="Обувь" text="Классическая, чёрная, закрытая, без декора" />
                <StandardItem emoji="💇" title="Волосы" text="Женщины: собранные в пучок. Мужчины: короткая стрижка" />
                <StandardItem
                  emoji="💅"
                  title="Украшения"
                  text="Минимум: обручальное кольцо, по одной серёжке для женщин"
                />
                <StandardItem
                  emoji="🦷"
                  title="Гигиена"
                  text="Личная чистота обязательна! Свежее дыхание, чистые руки"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules Section - compact rules */}
      <section className="py-6 md:py-16 bg-muted/30">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-5 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{"Основные правила"}</h2>
              <p className="text-sm md:text-lg text-muted-foreground">
                {"Мы ценим честность, порядок и профессионализм"}
              </p>
            </div>

            <div className="grid gap-2 md:gap-4">
              <RuleCard text="Всегда выглядеть опрятно и стильно (ты — лицо компании)" />
              <RuleCard text="Передвигаться только по сотрудническому маршруту" />
              <RuleCard text="Русский язык в гостевых зонах, никаких громких разговоров" />
              <RuleCard text="Мобильные телефоны только на перерыве и вне гостевой зоны" />
              <RuleCard text="Курение строго в специальных местах" />
              <RuleCard text="Беречь имущество отеля, сразу сообщать о поломках" />
              <RuleCard text="Без медкнижки и документов не допускаем к работе" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - compact final CTA */}
      <section className="py-8 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-3">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-balance">{"Стань частью LES Team!"}</h2>
            <p className="text-base md:text-xl text-primary-foreground/90 text-balance">
              Работа для настоящих, энергичных, дружелюбных и честных. Приходи дарить улыбки!
            </p>
            <div className="flex flex-col items-center gap-2 md:gap-4 pt-3 md:pt-5">
              <a href="tel:+79189058585">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5 md:h-5 md:w-5" />
                  {"Позвонить +7 (918) 905-85-85"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - minimal, clean footer */}
      <footer className="py-6 md:py-10 bg-muted text-center">
        <div className="container mx-auto px-3">
          <p className="text-sm md:text-base text-muted-foreground">
            {"\u00A9 2025 LES Art Resort. Приезжай, работай, развивайся!"}
          </p>
        </div>
      </footer>
    </div>
  )
}

function VacancyCard({ icon, title, rate, gender }: { icon: string; title: string; rate: string; gender: string }) {
  return (
    <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="text-center space-y-2 md:space-y-3">
        <div className="text-4xl md:text-5xl">{icon}</div>
        <h3 className="font-semibold text-base md:text-xl">{title}</h3>
        <div className="space-y-1">
          <p className="text-lg md:text-2xl font-bold text-primary">{rate}</p>
          <p className="text-sm md:text-sm text-muted-foreground">{gender}</p>
        </div>
      </div>
    </Card>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center space-y-2 md:space-y-3">
        <div className="text-primary">{icon}</div>
        <h3 className="font-semibold text-base md:text-lg">{title}</h3>
        <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}

function ValueItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-background rounded-lg hover:shadow-md transition-shadow duration-200">
      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-sm md:text-base leading-relaxed">{text}</p>
    </div>
  )
}

function StandardItem({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <span className="text-3xl md:text-4xl flex-shrink-0">{emoji}</span>
      <div>
        <h4 className="font-semibold text-base md:text-lg mb-1">{title}</h4>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function RuleCard({ text }: { text: string }) {
  return (
    <Card className="p-4 md:p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3 md:gap-4">
        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm md:text-base leading-relaxed">{text}</p>
      </div>
    </Card>
  )
}
