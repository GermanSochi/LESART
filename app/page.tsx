"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Users, Home, Utensils, Wallet, Clock, Sparkles, AlertCircle, Train, Car } from "lucide-react"
import { DormitoryGallery } from "@/components/dormitory-gallery"
import { DynamicVacancyCard } from "@/components/dynamic-vacancy-card"
import { BenefitCard } from "@/components/benefit-card"
import { ValueItem } from "@/components/value-item"
import { StandardItem } from "@/components/standard-item"
import { RuleCard } from "@/components/rule-card"
import { VoiceReviews } from "@/components/voice-reviews"
import { FAQSection } from "@/components/faq-section"
import { AdminPanel } from "@/components/admin-panel"
import { fetchSiteContent, type SiteContent } from "@/lib/site-content-client"

export default function RecruitmentPage() {
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => setContent(null))
  }, [])

  const hero = content?.hero
  const vacancies = content?.vacancies?.length
    ? content.vacancies.filter((v) => v.active)
    : [
        { id: "waiter", title: "Официант", rate: 360, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o0SL9GMRITmDLF9QTo6Q7hV4ygQ7Vb.png", active: true },
        { id: "chef", title: "Повар", rate: 380, gender: "М/Ж", image: "/images/chef-cooking.jpg", active: true },
        { id: "sous-chef", title: "Су-шеф", rate: 400, gender: "М/Ж", image: "/images/sous-chef.jpg", active: true },
        { id: "steward", title: "Стюард", rate: 340, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png", active: true },
        { id: "housekeeper", title: "Горничная", rate: 370, gender: "Женщины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png", active: true },
        { id: "barman", title: "Бармен", rate: 370, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png", active: true },
        { id: "banquet-waiter", title: "Официант банкетный", rate: 420, gender: "М/Ж", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png", active: true },
        { id: "loader", title: "Грузчик", rate: 360, gender: "Мужчины", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZvfdMxqabiLi4LDwwAdrNV8YQbzIsv.png", active: true },
      ]
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-accent text-accent-foreground overflow-hidden min-h-[420px] md:min-h-[500px] animate-fade-in">
        {hero?.background?.kind === "video" ? (
          <div className="absolute inset-0">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={hero.background.url}
              poster={hero.background.posterUrl}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hero?.background?.kind === "image" ? hero.background.url : "/images/orig.jpg"})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
        )}
        <div className="container mx-auto px-4 py-10 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-5">
            <Badge className="mb-2 md:mb-3 text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 bg-primary text-primary-foreground animate-slide-down">
              Набор открыт!
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-white drop-shadow-lg animate-slide-up">
              {hero?.title ?? "Работа в загородном отеле с проживанием в Москве и Московской области — LES Art Resort"}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-white/90 text-balance drop-shadow animate-slide-up delay-100">
              {hero?.subtitle ?? "Присоединяйся к команде №1 в гостеприимстве"}
            </p>
            <div className="flex flex-col items-center gap-3 md:gap-4 pt-4 md:pt-5 animate-slide-up delay-200">
              <a href="tel:+79189058585">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-5 md:px-8 h-16 md:h-18 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-normal text-center leading-tight"
                >
                  <Phone className="mr-2 h-6 w-6 md:h-7 md:w-7 flex-shrink-0" />
                  <span>Позвонить и устроиться за 1 день<br /> +7 (918) 905-85-85</span>
                </Button>
              </a>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/80">Доступно в:</span>
                <div className="flex gap-2">
                  <a href="https://wa.me/79189058585" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a href="https://t.me/+79189058585" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.11C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 md:pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-3xl mx-auto">
              <div className="flex flex-col items-center animate-fade-in delay-300">
                <Home className="h-9 w-9 md:h-10 md:w-10 mb-2 text-white" />
                <span className="text-sm md:text-base font-medium text-center leading-tight text-white">Бесплатное проживание</span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-400">
                <Utensils className="h-9 w-9 md:h-10 md:w-10 mb-2 text-white" />
                <span className="text-sm md:text-base font-medium text-center leading-tight text-white">Бесплатное питание</span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-500">
                <Wallet className="h-9 w-9 md:h-10 md:w-10 mb-2 text-white" />
                <span className="text-sm md:text-base font-medium text-center leading-tight text-white">Белая оплата</span>
              </div>
              <div className="flex flex-col items-center animate-fade-in delay-600">
                <Users className="h-9 w-9 md:h-10 md:w-10 mb-2 text-white" />
                <span className="text-sm md:text-base font-medium text-center leading-tight text-white">Дружная команда</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About HOLA Clusive */}
      <section className="py-6 md:py-14 bg-muted/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{content?.sections?.about?.title ?? "О LES Art Resort"}</h2>
            <p className="text-base md:text-lg leading-relaxed">
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html:
                    content?.sections?.about?.text ??
                    "<span class=\"font-semibold\">Идеология HOLA Clusive</span> — это самая! счастливая атмосфера!!!!!!, улыбки всех гостей, уникальный комплекс услуг и тёплый радушный приём.",
                }}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Hotel Images Gallery */}
      <section className="py-5 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {(content?.media?.hotelImages?.length ? content.media.hotelImages : [
              { src: "/images/vf0knk43chz6eaosf50ihmkdbak58uh3.jpg", alt: "Бассейн отеля" },
              { src: "/images/dfefd2cf78c253b17824ca626eff1bd2fea71eed.jpg", alt: "Вид на территорию" },
              { src: "/images/mdp90wmg206eotljsbr03hgonf3kmlvs.jpeg", alt: "Главное здание" },
            ]).slice(0, 3).map((img, idx) => (
              <div key={idx} className="h-36 md:h-64 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
              {content?.sections?.vacancies?.title ?? "Какие бывают вакансии"}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {content?.sections?.vacancies?.subtitle ?? "Выбери свою роль в нашей команде"}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {vacancies.map((v) => (
              <DynamicVacancyCard key={v.id} image={v.image} title={v.title} defaultRate={v.rate} gender={v.gender} />
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <div className="inline-block bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-2xl p-5 md:p-8 max-w-2xl mx-auto border border-destructive/20">
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gVj5H9XLXz2uBIsEYahB4uBY0eZVpl.png" 
                    alt="Медицинская книжка" 
                    className="w-full h-full object-contain bg-white/80" 
                  />
                </div>
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0" />
                    <span className="text-xl md:text-2xl font-bold">Строго с документами!</span>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground text-center md:text-left">
                    Личная медицинская книжка обязательна для всех сотрудников
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">
              {content?.sections?.benefits?.title ?? "Преимущества работы у нас"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <BenefitCard image="/images/benefit-food.jpg" title="Бесплатное питание" description="3-х разовое питание для всех сотрудников" />
            <BenefitCard image="/images/benefit-housing.jpg" title="Бесплатное проживание" description="Комфортное жильё на территории отеля" />
            <BenefitCard image="/images/benefit-payment.jpg" title="Белая оплата" description="За каждый час, выплаты без задержек" />
            <BenefitCard image="/images/benefit-career.jpg" title="Карьерный рост" description="Обучение и развитие в команде" />
            <BenefitCard image="/images/benefit-team.jpg" title="Сильная команда" description="Дружелюбие и взаимовыручка" />
            <BenefitCard image="/images/benefit-schedule.jpg" title="Стабильный график" description="Чёткий график и поддержка" />
          </div>

          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <DormitoryGallery />
          </div>
        </div>
      </section>

      {/* Real Working Conditions */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold">
                {content?.sections?.conditions?.title ?? "Реальные условия работы в LES Art Resort"}
              </h2>
            </div>
            <Card className="p-5 md:p-8 bg-gradient-to-br from-muted/50 to-muted/20">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Здесь вас ждёт настоящая работа в гостиничном бизнесе — интенсивная, динамичная, но с отличными условиями. Смены длятся от 11 часов и больше, в зависимости от загрузки отеля. Горничные ежедневно убирают 12-15 номеров. В сезон работа может быть 13-14 часов в день. График подбирается под ваши возможности: 5/2, 6/1 или 7/0. Проживание в комнатах по 4-6 человек — чисто, тепло, со всеми удобствами. Оформление по срочному трудовому договору или как самозанятый. Минимум месяц, максимум — сколько захотите. Ценные кадры всегда ждут и ценят! Да, работа физически насыщенная, но взамен — бесплатное проживание, питание и честная белая зарплата.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Voice Reviews */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {content?.sections?.voiceReviews?.title ?? "Голосовые отзывы реальных сотрудников"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {content?.sections?.voiceReviews?.subtitle ?? "Послушайте, что говорят наши коллеги"}
              </p>
            </div>
            <VoiceReviews />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {content?.sections?.faq?.title ?? "Часто задаваемые вопросы"}
              </h2>
            </div>
            <FAQSection />
          </div>
        </div>
      </section>

      {/* SEO Article */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
              {content?.sections?.seoArticle?.title ?? "Работа в загородном отеле с проживанием: условия, вакансии, ответы"}
            </h2>
            <div
              className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  content?.sections?.seoArticle?.html ??
                  "<p>Ищете работу с проживанием в Москве и Московской области? LES Art Resort — это стабильные смены, бесплатное проживание и питание, белая зарплата и понятные условия.</p>",
              }}
            />
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
                {content?.sections?.howToGetThere?.title ?? "Как добраться"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {content?.sections?.howToGetThere?.subtitle ?? "Мы находимся рядом с Москвой"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative h-48 md:h-56 rounded-xl overflow-hidden group">
                <img
                  src={content?.sections?.howToGetThere?.car?.image ?? "/images/transport-car.jpg"}
                  alt={content?.sections?.howToGetThere?.car?.title ?? "На автомобиле"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-white">{content?.sections?.howToGetThere?.car?.title ?? "На автомобиле"}</h3>
                  </div>
                  <p className="text-sm text-white/90 mb-3">
                    {content?.sections?.howToGetThere?.car?.description ?? "Около 60 минут от Москвы по Минскому шоссе"}
                  </p>
                  <a
                    href={
                      content?.sections?.howToGetThere?.car?.routeUrl ??
                      "https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~55.520648%2C36.355103&rtt=auto&ruri=ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3Dstation__lh_9602218~ymapsbm1%3A%2F%2Forg%3Foid%3D1242864809&z=11.3"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="secondary" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Открыть маршрут
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative h-48 md:h-56 rounded-xl overflow-hidden group">
                <img
                  src={content?.sections?.howToGetThere?.transit?.image ?? "/images/transport-train.jpg"}
                  alt={content?.sections?.howToGetThere?.transit?.title ?? "Общественный транспорт"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Train className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-white">
                      {content?.sections?.howToGetThere?.transit?.title ?? "Общественный транспорт"}
                    </h3>
                  </div>
                  <p className="text-sm text-white/90">
                    {content?.sections?.howToGetThere?.transit?.description ??
                      "МЦД-4 до станции Лесной Городок, далее автобус до отеля"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working with us */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold">{content?.sections?.values?.title ?? "Работая у нас, ты"}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {(content?.sections?.values?.items?.length
                ? content.sections.values.items
                : [
                    "Уважаешь разнообразие гостей и коллег",
                    "С гордостью представляешь компанию",
                    "Постоянно учишься и реализуешь инициативы",
                    "Работаешь в команде по принципу поддержки",
                    "Идёшь вперёд ради ярких впечатлений гостей",
                    "Всегда с улыбкой и уважением к «Друзьям Отеля»",
                  ]
              ).map((t, i) => (
                <ValueItem key={i} text={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
                {content?.sections?.standards?.title ?? "Стандарты внешнего вида"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {content?.sections?.standards?.subtitle ?? "Каждый сотрудник — лицо отеля"}
              </p>
            </div>

            <div className="mb-5 md:mb-8 rounded-xl overflow-hidden shadow-xl">
              <img
                src={content?.sections?.standards?.bannerImage?.src ?? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kTRxPknDJ72i6QQGq5ojeoNR6tdsSr.png"}
                alt={content?.sections?.standards?.bannerImage?.alt ?? "Стандарты формы сотрудников"}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <StandardItem icon="clothing" title="Одежда" text="Корпоративная форма, чистая и выглаженная с именным бейджем" image="/images/standard-clothing.jpg" />
              <StandardItem icon="shoes" title="Обувь" text="Классическая, чёрная, закрытая, без декора" image="/images/standard-shoes.jpg" />
              <StandardItem icon="hair" title="Волосы" text="Женщины: собранные в пучок. Мужчины: короткая стрижка" image="/images/standard-hair.jpg" />
              <StandardItem icon="jewelry" title="Украшения" text="Минимум: обручальное кольцо, по одной серёжке для женщин" image="/images/standard-clothing.jpg" />
              <StandardItem icon="hygiene" title="Гигиена" text="Личная чистота обязательна! Свежее дыхание, чистые руки" image="/images/standard-hair.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
                {content?.sections?.rules?.title ?? "Основные правила"}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {content?.sections?.rules?.subtitle ?? "Мы ценим честность, порядок и профессионализм"}
              </p>
            </div>

            <div className="grid gap-3 md:gap-4">
              {(content?.sections?.rules?.items?.length
                ? content.sections.rules.items
                : [
                    "Всегда выглядеть опрятно и стильно (ты — лицо компании)",
                    "Передвигаться только по сотрудническому маршруту",
                    "Русский язык в гостевых зонах, никаких громких разговоров",
                    "Мобильные телефоны только на перерыве и вне гостевой зоны",
                    "Курение строго в специальных местах",
                    "Беречь имущество отеля, сразу сообщать о поломках",
                    "Без медкнижки и документов не допускаем к работе",
                  ]
              ).map((t, i) => (
                <RuleCard key={i} text={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-balance">
              {content?.sections?.cta?.title ?? "Стань частью LES Team!"}
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 text-balance">
              {content?.sections?.cta?.subtitle ??
                "Работа для настоящих, энергичных, дружелюбных и честных. Приходи дарить улыбки!"}
            </p>
            <div className="flex flex-col items-center gap-3 md:gap-4 pt-4 md:pt-5">
              <a href="tel:+79189058585">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base md:text-lg px-6 md:px-10 h-16 md:h-18 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-normal text-center leading-tight"
                >
                  <Phone className="mr-2 h-6 w-6 md:h-7 md:w-7 flex-shrink-0" />
                  <span>Позвонить и устроиться за 1 день<br /> +7 (918) 905-85-85</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-muted text-center relative">
        <div className="container mx-auto px-4">
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            {content?.sections?.footer?.copyright ?? "© 2025 LES Art Resort. Приезжай, работай, развивайся!"}
          </p>
        </div>
        <AdminPanel />
      </footer>
    </div>
  )
}
