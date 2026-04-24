"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Home,
  Utensils,
  Wallet,
  Users,
  AlertCircle,
  Train,
  Car,
  ChevronDown,
  Star,
  Shield,
  TrendingUp,
  Clock,
} from "lucide-react"
import { DormitoryGallery } from "@/components/dormitory-gallery"
import { DynamicVacancyCard } from "@/components/dynamic-vacancy-card"
import { VoiceReviews } from "@/components/voice-reviews"
import { FAQSection } from "@/components/faq-section"
import { AdminPanel } from "@/components/admin-panel"
import { fetchSiteContent, type SiteContent } from "@/lib/site-content-client"

export default function RecruitmentPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => setContent(null))
  }, [])

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            observerRef.current?.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [content])

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

  const WA_SVG = (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
  const TG_SVG = (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {hero?.background?.kind === "video" ? (
          <div className="absolute inset-0">
            <video
              className="absolute inset-0 w-full h-full object-cover scale-105"
              src={hero.background.url}
              poster={hero.background.posterUrl}
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${hero?.background?.kind === "image" ? hero.background.url : "/images/orig.jpg"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/85" />
          </div>
        )}

        {/* wordmark */}
        <div className="absolute top-6 left-0 right-0 flex justify-center z-10">
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/50">
            LES ART RESORT · ЗАГОРОДНЫЙ КУРОРТ
          </span>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center gap-5 md:gap-7 py-28">
          <Badge className="px-4 py-1.5 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-white border border-white/25 backdrop-blur-sm animate-slide-down">
            Набор открыт прямо сейчас
          </Badge>

          <h1 className="text-[2.6rem] sm:text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight text-white leading-[0.93] text-balance animate-slide-up max-w-5xl">
            {hero?.title ?? "Работай там,\nгде мечтают отдыхать"}
          </h1>

          <p className="text-base md:text-xl text-white/65 font-light tracking-wide animate-slide-up delay-100 max-w-sm md:max-w-xl">
            {hero?.subtitle ?? "Жильё · Питание · Белая зарплата · 60 км от Москвы"}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 animate-slide-up delay-200 pt-1">
            <a href="tel:+79189058585">
              <Button
                size="lg"
                className="cta-pulse h-13 px-8 text-base font-bold shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 rounded-full gap-2"
              >
                <Phone className="h-4 w-4" />
                Позвонить сейчас
              </Button>
            </a>
            <div className="flex gap-2">
              <a href="https://wa.me/79189058585" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg">
                {WA_SVG}
              </a>
              <a href="https://t.me/+79189058585" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-[#0088cc] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg">
                {TG_SVG}
              </a>
            </div>
          </div>

          {/* 4 quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pt-6 md:pt-10 animate-fade-in delay-400 w-full max-w-2xl">
            {[
              { icon: <Home className="h-5 w-5" />, label: "Бесплатное жильё" },
              { icon: <Utensils className="h-5 w-5" />, label: "Бесплатное питание" },
              { icon: <Wallet className="h-5 w-5" />, label: "Белая зарплата" },
              { icon: <Users className="h-5 w-5" />, label: "Дружная команда" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80">
                  {item.icon}
                </div>
                <span className="text-[11px] md:text-xs text-white/70 text-center font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 z-10 animate-bounce">
          <ChevronDown className="h-5 w-5 text-white/35" />
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-foreground text-background py-10 md:py-14" data-reveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { number: "до 420₽", label: "в час" },
              { number: "300+", label: "сотрудников" },
              { number: "60 км", label: "от Москвы" },
              { number: "5+", label: "лет на рынке" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5" data-reveal data-delay={String(i + 1)}>
                <span className="text-[2.25rem] md:text-5xl font-black tracking-tight stat-number">{stat.number}</span>
                <span className="text-xs md:text-sm text-background/50 font-semibold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VACANCIES ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" id="vacancies">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14" data-reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Открытые позиции</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              {content?.sections?.vacancies?.title ?? "Выбери свою роль"}
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-sm mx-auto">
              {content?.sections?.vacancies?.subtitle ?? "Реальные ставки · Оформление в день прихода"}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3 max-w-5xl mx-auto" data-reveal data-delay="1">
            {vacancies.map((v) => (
              <DynamicVacancyCard key={v.id} image={v.image} title={v.title} defaultRate={v.rate} gender={v.gender} />
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center" data-reveal data-delay="2">
            <div className="inline-flex items-center gap-3 bg-destructive/8 rounded-xl px-5 py-3 border border-destructive/20 max-w-md mx-auto">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-left">
                <span className="font-bold text-destructive">Строго с документами.</span>{" "}
                Личная медицинская книжка обязательна.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16" data-reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-background/40 mb-3">Условия работы</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              {content?.sections?.benefits?.title ?? "Почему выбирают нас"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/8 rounded-2xl overflow-hidden max-w-5xl mx-auto">
            {[
              { icon: <Utensils className="h-5 w-5" />, title: "Бесплатное питание", desc: "3-разовое питание каждый день" },
              { icon: <Home className="h-5 w-5" />, title: "Бесплатное жильё", desc: "Комфортные комнаты на территории отеля" },
              { icon: <Wallet className="h-5 w-5" />, title: "Белая зарплата", desc: "Официальное оформление, выплаты без задержек" },
              { icon: <TrendingUp className="h-5 w-5" />, title: "Карьерный рост", desc: "Обучение, наставники, реальный путь вверх" },
              { icon: <Users className="h-5 w-5" />, title: "Сильная команда", desc: "Атмосфера взаимовыручки и уважения" },
              { icon: <Clock className="h-5 w-5" />, title: "Стабильный график", desc: "5/2, 6/1 или 7/0 — выбирай под себя" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-foreground p-6 md:p-7 flex flex-col gap-3 hover:bg-background/5 transition-colors duration-300 group"
                data-reveal
                data-delay={String((i % 3) + 1)}
              >
                <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center text-background/70 group-hover:bg-background/15 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm text-background/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY + ABOUT ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12" data-reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Место, где ты будешь работать</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              {content?.sections?.about?.title ?? "О LES Art Resort"}
            </h2>
          </div>

          {/* asymmetric grid: 1 large + 2 small */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-6xl mx-auto mb-8" data-reveal data-delay="1">
            {(content?.media?.hotelImages?.length ? content.media.hotelImages : [
              { src: "/images/vf0knk43chz6eaosf50ihmkdbak58uh3.jpg", alt: "Бассейн отеля" },
              { src: "/images/dfefd2cf78c253b17824ca626eff1bd2fea71eed.jpg", alt: "Вид на территорию" },
              { src: "/images/mdp90wmg206eotljsbr03hgonf3kmlvs.jpeg", alt: "Главное здание" },
            ]).slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl group ${idx === 0 ? "col-span-2 md:col-span-1 row-span-1 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}
                style={idx === 0 ? { minHeight: "200px" } : {}}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto text-center" data-reveal data-delay="2">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              <span dangerouslySetInnerHTML={{
                __html: content?.sections?.about?.text ??
                  "<span class=\"font-semibold text-foreground\">Идеология HOLA Clusive</span> — самая счастливая атмосфера, улыбки всех гостей, уникальный комплекс услуг и тёплый радушный приём."
              }} />
            </p>
          </div>

          <div className="mt-10 md:mt-14 max-w-5xl mx-auto" data-reveal data-delay="1">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-6 text-center">Твоё жильё</p>
            <DormitoryGallery />
          </div>
        </div>
      </section>

      {/* ─── VOICE REVIEWS ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-10" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Социальное доказательство</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                {content?.sections?.voiceReviews?.title ?? "Говорят те, кто работает"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {content?.sections?.voiceReviews?.subtitle ?? "Нажми — услышишь сам"}
              </p>
            </div>
            <div data-reveal data-delay="1">
              <VoiceReviews />
            </div>
          </div>
        </div>
      </section>

      {/* ─── REAL CONDITIONS ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Честно и без прикрас</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                {content?.sections?.conditions?.title ?? "Реальные условия работы"}
              </h2>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 md:p-10" data-reveal data-delay="1">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-primary" />
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground pl-5">
                {content?.sections?.conditions?.text ??
                  "Здесь вас ждёт настоящая работа в гостиничном бизнесе — интенсивная, динамичная, но с отличными условиями. Смены длятся от 11 часов, горничные убирают 12–15 номеров в день. В сезон возможно до 14 часов. График: 5/2, 6/1 или 7/0. Проживание в комнатах по 4–6 человек — чисто, тепло, со всеми удобствами. Оформление по срочному договору или как самозанятый. Да, работа физически насыщенная, но взамен — бесплатное жильё, питание и честная белая зарплата."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Ответы на вопросы</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                {content?.sections?.faq?.title ?? "Часто задаваемые вопросы"}
              </h2>
            </div>
            <div data-reveal data-delay="1">
              <FAQSection />
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW TO GET THERE ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Локация</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
                {content?.sections?.howToGetThere?.title ?? "Как добраться"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {content?.sections?.howToGetThere?.subtitle ?? "60 км от Москвы по Минскому шоссе"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3" data-reveal data-delay="1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img
                  src={content?.sections?.howToGetThere?.car?.image ?? "/images/transport-car.jpg"}
                  alt={content?.sections?.howToGetThere?.car?.title ?? "На автомобиле"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                      <Car className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-base text-white">{content?.sections?.howToGetThere?.car?.title ?? "На автомобиле"}</h3>
                  </div>
                  <p className="text-xs text-white/75 mb-3 pl-[42px]">
                    {content?.sections?.howToGetThere?.car?.description ?? "Около 60 минут от Москвы по Минскому шоссе"}
                  </p>
                  <a href={content?.sections?.howToGetThere?.car?.routeUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="secondary" className="w-full rounded-full h-9 text-xs font-semibold">
                      <MapPin className="mr-1.5 h-3.5 w-3.5" />Открыть маршрут
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img
                  src={content?.sections?.howToGetThere?.transit?.image ?? "/images/transport-train.jpg"}
                  alt={content?.sections?.howToGetThere?.transit?.title ?? "Общественный транспорт"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                      <Train className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-base text-white">
                      {content?.sections?.howToGetThere?.transit?.title ?? "Общественный транспорт"}
                    </h3>
                  </div>
                  <p className="text-xs text-white/75 pl-[42px]">
                    {content?.sections?.howToGetThere?.transit?.description ?? "МЦД-4 до станции Дрохово, далее автобус или такси ~700₽"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES + STANDARDS + RULES ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Культура</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                {content?.sections?.values?.title ?? "Работая у нас, ты"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-12" data-reveal data-delay="1">
              {(content?.sections?.values?.items?.length
                ? content.sections.values.items
                : [
                    "Уважаешь разнообразие гостей и коллег",
                    "С гордостью представляешь компанию",
                    "Постоянно учишься и реализуешь инициативы",
                    "Работаешь в команде по принципу поддержки",
                    "Идёшь вперёд ради ярких впечатлений гостей",
                    "Всегда с улыбкой к «Друзьям Отеля»",
                  ]
              ).map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border hover:border-primary/40 hover:bg-background transition-colors duration-200">
                  <Star className="h-3 w-3 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>

            {/* Standards banner */}
            <div className="mb-10" data-reveal>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-5 text-center">
                {content?.sections?.standards?.title ?? "Стандарты внешнего вида"}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={content?.sections?.standards?.bannerImage?.src ?? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kTRxPknDJ72i6QQGq5ojeoNR6tdsSr.png"}
                  alt={content?.sections?.standards?.bannerImage?.alt ?? "Стандарты формы"}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Rules */}
            <div data-reveal data-delay="1">
              <div className="text-center mb-5">
                <h3 className="text-lg md:text-xl font-bold">{content?.sections?.rules?.title ?? "Основные правила"}</h3>
                <p className="text-xs text-muted-foreground mt-1">{content?.sections?.rules?.subtitle ?? "Мы ценим честность, порядок и профессионализм"}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {(content?.sections?.rules?.items?.length
                  ? content.sections.rules.items
                  : [
                      "Всегда выглядеть опрятно и стильно",
                      "Передвигаться только по сотрудническому маршруту",
                      "Русский язык в гостевых зонах, без громких разговоров",
                      "Мобильные телефоны только на перерыве",
                      "Курение строго в специальных местах",
                      "Беречь имущество отеля, сразу сообщать о поломках",
                      "Без медкнижки и документов к работе не допускаем",
                    ]
                ).map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-background rounded-xl px-4 py-3 border border-border">
                    <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden" style={{ background: "#0d1a12" }}>
        {/* ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "oklch(0.40 0.12 155 / 0.22)", filter: "blur(90px)" }} />
        {/* subtle top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-5 md:space-y-7" data-reveal>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/35">Готов начать?</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white text-balance leading-[1.05]">
              {content?.sections?.cta?.title ?? "Один звонок —\nи ты в команде"}
            </h2>
            <p className="text-sm md:text-base text-white/50">
              {content?.sections?.cta?.subtitle ?? "Ответим прямо сейчас. Выход на работу за 1–3 дня."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <a href="tel:+79189058585">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base font-bold rounded-full gap-2 bg-white text-foreground hover:bg-white/92 shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  +7 (918) 905-85-85
                </Button>
              </a>
              <div className="flex gap-2">
                <a href="https://wa.me/79189058585" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg">
                  {WA_SVG}
                </a>
                <a href="https://t.me/+79189058585" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-[#0088cc] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg">
                  {TG_SVG}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEO ARTICLE ──────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm md:text-base font-semibold mb-2 text-muted-foreground/60">
              {content?.sections?.seoArticle?.title ?? "Работа в загородном отеле с проживанием"}
            </h2>
            <div
              className="prose prose-neutral dark:prose-invert max-w-none text-xs prose-p:text-muted-foreground/60 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: content?.sections?.seoArticle?.html ??
                  "<p>Ищете работу с проживанием в Московской области? LES Art Resort — стабильные смены, бесплатное проживание и питание, белая зарплата.</p>",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-6 bg-foreground text-background/50 text-center relative">
        <div className="container mx-auto px-4">
          <p className="text-xs font-medium">
            {content?.sections?.footer?.copyright ?? "© 2025 LES Art Resort. Приезжай, работай, развивайся!"}
          </p>
        </div>
        <AdminPanel />
      </footer>

      {/* ─── STICKY MOBILE CTA ────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border px-3 py-2.5 flex gap-2">
        <a href="tel:+79189058585" className="flex-1">
          <Button className="w-full h-11 font-semibold rounded-full shadow-lg text-sm gap-1.5">
            <Phone className="h-4 w-4" />
            Позвонить
          </Button>
        </a>
        <a href="https://wa.me/79189058585" target="_blank" rel="noopener noreferrer"
          className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          {WA_SVG}
        </a>
        <a href="https://t.me/+79189058585" target="_blank" rel="noopener noreferrer"
          className="w-11 h-11 bg-[#0088cc] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          {TG_SVG}
        </a>
      </div>
    </div>
  )
}
