"use client"

import { useEffect, useState, useRef } from "react"
import { AdminPanel } from "@/components/admin-panel"

const faqData = [
  { q: "Есть ли работа с проживанием под Москвой?", a: "Да! LES Art Resort — 60 км от Москвы. Жильё бесплатно для всех сотрудников прямо на территории отеля." },
  { q: "Сколько реально зарабатывает горничная?", a: "Горничная получает 370 ₽/ч. При стандартной смене — около 4 000–4 500 ₽ в день." },
  { q: "Можно ли приехать из другого города?", a: "Конечно. К нам приезжают сотрудники со всей России. Жильё бесплатное, помогаем с адаптацией." },
  { q: "Какой график и сколько часов смена?", a: "Смены от 11 часов. Графики: 5/2, 6/1 или 7/0 — обсуждается при оформлении." },
  { q: "Нужны ли опыт и медицинская книжка?", a: "Медкнижка обязательна для всех. Опыт приветствуется, но не всегда обязателен — обучим." },
  { q: "Как быстро можно выйти на работу?", a: "При наличии всех документов — выход за 1–3 дня после собеседования." },
]

const reviewsData = [
  { id: "seed-6", name: "Ольга", role: "Горничная", avatar: "/images/avatar-olga.jpg", audio: "/uploads/audio/seed-6.mp3" },
  { id: "seed-7", name: "Анастасия", role: "Горничная", avatar: "/images/avatar-anastasia.jpg", audio: "/uploads/audio/seed-7.mp3" },
  { id: "seed-5", name: "Ирина", role: "Горничная", avatar: "/images/avatar-irina.jpg", audio: "/uploads/audio/seed-5.mp3" },
  { id: "seed-1", name: "Азамат", role: "Водитель / грузчик", avatar: "/images/avatar-azamat.jpg", audio: "/uploads/audio/seed-1.mp3" },
  { id: "seed-2", name: "Бэк", role: "Официант", avatar: "/images/avatar-bek.jpg", audio: "/uploads/audio/seed-2.mp3" },
  { id: "seed-3", name: "Фархат", role: "Стюард", avatar: "/images/avatar-farkhat.jpg", audio: "/uploads/audio/seed-3.mp3" },
  { id: "seed-4", name: "Батыргуль", role: "Уборщица", avatar: "/images/avatar-batyr.jpg", audio: "/uploads/audio/seed-4.mp3" },
]

const AV_COLORS = ["#1e3a26", "#2a3e1e", "#1e2e3a", "#2e1e3a", "#3a2e1e", "#1e3a36", "#2e3a1e"]
const BAR_HEIGHTS = [0.3, 0.55, 0.85, 0.45, 0.75, 0.35, 1, 0.6, 0.7, 0.45, 0.8, 0.5]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`
}

const PHONE_D = "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.02 1.22 2 2 0 012 .02h3a2 2 0 012 1.72c.128.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
const WA_D = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
const TG_D = "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"

function ReviewCard({
  r, i, playingId, onToggle,
}: {
  r: typeof reviewsData[0]
  i: number
  playingId: string | null
  onToggle: (id: string, audio: HTMLAudioElement) => void
}) {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [imgErr, setImgErr] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlaying = playingId === r.id

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={`rvcard${isPlaying ? " playing" : ""}`}>
      <div className="rvcard__top">
        {!imgErr ? (
          <img className="rvcard__av" src={r.avatar} alt={r.name} onError={() => setImgErr(true)} />
        ) : (
          <div className="rvcard__av-fallback" style={{ background: AV_COLORS[i % AV_COLORS.length] }}>
            {r.name[0]}
          </div>
        )}
        <div>
          <div className="rvcard__name">{r.name}</div>
          <div className="rvcard__role">{r.role}</div>
        </div>
      </div>
      <div className="rvcard__wave">
        {BAR_HEIGHTS.map((h, idx) => (
          <div key={idx} className="rvcard__bar" style={{ height: `${Math.round(h * 26)}px` }} />
        ))}
      </div>
      <div className="rvcard__prog">
        <div className="rvcard__fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="rvcard__bot">
        <button
          className="rvcard__play"
          aria-label="Воспроизвести"
          onClick={() => { if (audioRef.current) onToggle(r.id, audioRef.current) }}
        >
          {isPlaying ? (
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <span className="rvcard__time">{fmt(currentTime)}</span>
      </div>
      <audio
        ref={audioRef}
        src={r.audio}
        onTimeUpdate={(e) => {
          const a = e.currentTarget
          if (a.duration) setProgress((a.currentTime / a.duration) * 100)
          setCurrentTime(a.currentTime)
        }}
        onEnded={() => { onToggle("", new Audio()); setProgress(0); setCurrentTime(0) }}
      />
    </div>
  )
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openExpand, setOpenExpand] = useState<number | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const playingAudioRef = useRef<HTMLAudioElement | null>(null)

  const exBody = (idx: number): React.CSSProperties => ({
    maxHeight: openExpand === idx ? "1800px" : "0",
    overflow: "hidden",
    transition: "max-height .55s cubic-bezier(.16,1,.3,1)",
  })

  const handleToggle = (id: string, audio: HTMLAudioElement) => {
    if (playingId === id) {
      audio.pause()
      setPlayingId(null)
      playingAudioRef.current = null
    } else {
      if (playingAudioRef.current) {
        playingAudioRef.current.pause()
        playingAudioRef.current.currentTime = 0
      }
      audio.play().catch(() => {})
      setPlayingId(id)
      playingAudioRef.current = audio
    }
  }

  useEffect(() => {
    const ro = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); ro.unobserve(e.target) } }),
      { threshold: 0.06 }
    )
    document.querySelectorAll("[data-r]").forEach((el) => ro.observe(el))

    const hBg = document.getElementById("heroBg")
    if (hBg) setTimeout(() => { hBg.style.transform = "scale(1)" }, 80)

    const onScroll = () => {
      const y = window.scrollY
      if (hBg && y < window.innerHeight * 1.5)
        hBg.style.transform = `scale(1) translateY(${y * 0.16}px)`
      const rBg = document.getElementById("resortBg")
      if (rBg) {
        const resort = rBg.closest(".resort")
        if (resort) {
          const rect = resort.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0)
            rBg.style.transform = `scale(1.03) translateY(${-rect.top * 0.12}px)`
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const track = document.getElementById("reviewsTrack")
    let drag = false, sx = 0, sl = 0
    const onDown = (e: MouseEvent) => { drag = true; sx = e.pageX - (track?.offsetLeft ?? 0); sl = track?.scrollLeft ?? 0 }
    const onMove = (e: MouseEvent) => { if (!drag || !track) return; e.preventDefault(); track.scrollLeft = sl - (e.pageX - (track.offsetLeft) - sx) }
    const onUp = () => { drag = false }
    if (track) {
      track.addEventListener("mousedown", onDown)
      track.addEventListener("mousemove", onMove)
      track.addEventListener("mouseup", onUp)
      track.addEventListener("mouseleave", onUp)
    }

    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (track) {
        track.removeEventListener("mousedown", onDown)
        track.removeEventListener("mousemove", onMove)
        track.removeEventListener("mouseup", onUp)
        track.removeEventListener("mouseleave", onUp)
      }
    }
  }, [])

  return (
    <>
      <div className="grain-fx" aria-hidden="true" />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="hero" id="top">
        <div className="hero__bg" id="heroBg" />
        <div className="hero__wordmark"><span>LES Art Resort · Загородный курорт</span></div>
        <div className="hero__body">
          <div className="hero__left">
            <div className="hero__tag">Набор открыт прямо сейчас</div>
            <h1 className="hero__title display">Работай там,<br />где мечтают<br />отдыхать</h1>
            <p className="hero__sub">60 км от Москвы · Жильё · Питание · Белая зарплата</p>
          </div>
          <div className="hero__right">
            <a href="tel:+79189058585" className="btn btn--white">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d={PHONE_D} /></svg>
              Позвонить сейчас
            </a>
            <div style={{ display: "flex", gap: "8px" }}>
              <a href="https://wa.me/79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#25D366" }}>
                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={WA_D} /></svg>
              </a>
              <a href="https://t.me/+79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#0088cc" }}>
                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={TG_D} /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="hero__pills">
          <span className="hero__pill">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Бесплатное жильё
          </span>
          <span className="hero__pill">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>
            Питание включено
          </span>
          <span className="hero__pill">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
            Белая зарплата
          </span>
          <span className="hero__pill">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
            Дружная команда
          </span>
        </div>
        <div className="hero__scroll">
          <span>Листать</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <div className="stats">
        <div className="stats__row">
          <div className="stats__cell" data-r><div className="stats__num">до 420₽</div><div className="stats__lbl">в час</div></div>
          <div className="stats__cell" data-r data-d="1"><div className="stats__num">300+</div><div className="stats__lbl">сотрудников</div></div>
          <div className="stats__cell" data-r data-d="2"><div className="stats__num">60 км</div><div className="stats__lbl">от Москвы</div></div>
          <div className="stats__cell" data-r data-d="3"><div className="stats__num">5+</div><div className="stats__lbl">лет на рынке</div></div>
        </div>
      </div>

      {/* ══ ROLES ══════════════════════════════════════════════ */}
      <section className="roles" id="vacancies">
        <div className="roles__header" data-r>
          <div>
            <p className="eyebrow" style={{ marginBottom: "12px" }}>Открытые позиции</p>
            <h2 className="roles__title">Выбери<br />свою роль</h2>
          </div>
          <p className="roles__note">Оформление в день прихода. Реальные ставки без скрытых условий.</p>
        </div>
        <div className="roles__grid" data-r data-d="1">
          <div className="rcard rcard--featured">
            <img className="rcard__img" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-el02mE5Cs6iS0GLWPSxgaHWgbkEW85.png" alt="Официант банкетный" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__badge">★ Топ ставка</div>
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info">
              <div className="rcard__name">Официант банкетный</div>
              <div className="rcard__rate">420 ₽/ч</div>
              <div className="rcard__gender">М / Ж</div>
            </div>
          </div>
          <div className="rcard">
            <img className="rcard__img" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o0SL9GMRITmDLF9QTo6Q7hV4ygQ7Vb.png" alt="Официант" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Официант</div><div className="rcard__rate">360 ₽/ч</div><div className="rcard__gender">М / Ж</div></div>
          </div>
          <div className="rcard">
            <img className="rcard__img" src="/images/chef.jpg" alt="Повар" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Повар</div><div className="rcard__rate">380 ₽/ч</div><div className="rcard__gender">М / Ж</div></div>
          </div>
          <div className="rcard">
            <img className="rcard__img" src="/images/sous-chef.jpg" alt="Су-шеф" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Су-шеф</div><div className="rcard__rate">400 ₽/ч</div><div className="rcard__gender">М / Ж</div></div>
          </div>
          <div className="rcard">
            <img className="rcard__img" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BPrd50iLGfSSBquztZokeMyYGZrO9h.png" alt="Стюард" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Стюард</div><div className="rcard__rate">340 ₽/ч</div><div className="rcard__gender">М / Ж</div></div>
          </div>
          <div className="rcard rcard--wide">
            <img className="rcard__img" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Y2u25XeAGlvkGHPrKQvgQ1vPpFy81.png" alt="Горничная" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Горничная</div><div className="rcard__rate">370 ₽/ч</div><div className="rcard__gender">Женщины</div></div>
          </div>
          <div className="rcard">
            <img className="rcard__img" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua6uY01nwwLbNp2gS3lz8y433Mcevj.png" alt="Бармен" />
            <div className="rcard__base" /><div className="rcard__hover" />
            <div className="rcard__cta">Откликнуться →</div>
            <div className="rcard__info"><div className="rcard__name">Бармен</div><div className="rcard__rate">370 ₽/ч</div><div className="rcard__gender">М / Ж</div></div>
          </div>
        </div>
        <div className="roles__notice" data-r data-d="3">
          <svg width="16" height="16" fill="none" stroke="oklch(.55 .22 25)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span><strong style={{ color: "oklch(.55 .22 25)" }}>Строго с документами.</strong> Личная медицинская книжка обязательна для всех позиций.</span>
        </div>
      </section>

      {/* ══ RESORT STORYTELLING ════════════════════════════════ */}
      <section className="resort" id="resort">
        <div className="resort__bg" id="resortBg" />
        <div className="resort__content" data-r>
          <p className="resort__eyebrow">60 км · Минское шоссе · Одинцовский район · Дорохово</p>
          <h2 className="resort__title">Твоё место<br />в команде<br />уже ждёт.</h2>
          <p className="resort__desc">Один из лучших загородных курортов Подмосковья — в окружении леса. Здесь работают 300+ человек. Жильё на территории, питание, стабильная зарплата.</p>
        </div>
      </section>

      {/* ══ BENEFITS ═══════════════════════════════════════════ */}
      <section className="benefits">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="eyebrow benefits__eyebrow" data-r>Условия работы</p>
          <h2 className="benefits__title" data-r data-d="1">Почему здесь<br />остаются надолго</h2>
          <div className="bento" data-r data-d="2">
            <div className="bcell bcell--tall">
              <img className="bcell__img" src="/images/benefit-food.jpg" alt="Питание" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg></div>
                <div className="bcell__name">Бесплатное питание</div>
                <div className="bcell__desc">3-разовое каждый рабочий день</div>
              </div>
            </div>
            <div className="bcell">
              <img className="bcell__img" src="/images/benefit-housing.jpg" alt="Жильё" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                <div className="bcell__name">Бесплатное жильё</div>
                <div className="bcell__desc">На территории отеля</div>
              </div>
            </div>
            <div className="bcell">
              <img className="bcell__img" src="/images/benefit-payment.jpg" alt="Зарплата" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg></div>
                <div className="bcell__name">Белая зарплата</div>
                <div className="bcell__desc">Оформление, выплаты без задержек</div>
              </div>
            </div>
            <div className="bcell">
              <img className="bcell__img" src="/images/benefit-career.jpg" alt="Карьера" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /></svg></div>
                <div className="bcell__name">Карьерный рост</div>
                <div className="bcell__desc">Обучение и наставники</div>
              </div>
            </div>
            <div className="bcell">
              <img className="bcell__img" src="/images/benefit-team.jpg" alt="Команда" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
                <div className="bcell__name">Сильная команда</div>
                <div className="bcell__desc">Взаимовыручка и уважение</div>
              </div>
            </div>
            <div className="bcell">
              <img className="bcell__img" src="/images/benefit-schedule.jpg" alt="График" />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__icon"><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
                <div className="bcell__name">Стабильный график</div>
                <div className="bcell__desc">5/2, 6/1 или 7/0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DORMITORY ══════════════════════════════════════════ */}
      <section>
        <div className="dorm">
          <div className="dorm__text" data-r>
            <p className="eyebrow" style={{ marginBottom: "14px" }}>Твоё жильё</p>
            <h2>Чисто, тепло,<br />со всеми удобствами</h2>
            <p>Комнаты по 4–6 человек прямо на территории отеля. Кухня, прачечная, душевые — всё рядом.</p>
            <div className="dorm__conditions">
              <p>Смены 11+ часов · <strong>5/2, 6/1 или 7/0</strong> · Оформление по срочному договору или как самозанятый · Горничные убирают 12–15 номеров в день · В сезон возможно до 14 часов.</p>
              <p style={{ marginTop: "10px" }}><strong>Заселение в проживание</strong> — строго в будние дни до 18:00.</p>
            </div>
          </div>
          <div className="dorm__mosaic" data-r data-d="1">
            <div><img src="/images/dorm1.jpg" alt="Кухонная зона" loading="lazy" /></div>
            <div><img src="/images/dorm2.jpg" alt="Общая зона" loading="lazy" /></div>
            <div><img src="/images/dorm3.jpg" alt="Прачечная" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ══ VOICE REVIEWS ══════════════════════════════════════ */}
      <section className="reviews" id="reviews">
        <div className="reviews__header" data-r>
          <div>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: "12px" }}>Социальное доказательство</p>
            <h2 className="reviews__title">Говорят те,<br />кто работает</h2>
          </div>
          <div className="reviews__hint">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            листай
          </div>
        </div>
        <div className="reviews__track" id="reviewsTrack">
          {reviewsData.map((r, i) => (
            <ReviewCard key={r.id} r={r} i={i} playingId={playingId} onToggle={handleToggle} />
          ))}
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════ */}
      <section className="faq">
        <div className="faq__inner">
          <div data-r>
            <p className="eyebrow" style={{ marginBottom: "14px" }}>Ответы на вопросы</p>
            <h2 className="faq__title">FAQ</h2>
          </div>
          <div data-r data-d="1">
            {faqData.map(({ q, a }, idx) => (
              <div key={idx} className={`faq__item${openFaq === idx ? " open" : ""}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  {q}
                  <span className="faq__icon">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div className="faq__a"><div className="faq__a-in">{a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INFO EXPAND ════════════════════════════════════════ */}
      <section className="expand-section">
        <div className="expand-inner">
          <p className="expand-eyebrow" data-r>Для тех, кто хочет знать больше</p>
          <h2 className="expand-title" data-r data-d="1">
            Открыто<br />и <em>без лишней строгости</em>
          </h2>

          {/* Card 1 — LES principles */}
          <div className={`excard${openExpand === 0 ? " open" : ""}`} data-r data-d="1">
            <button className="excard__head" onClick={() => setOpenExpand(openExpand === 0 ? null : 0)} aria-expanded={openExpand === 0}>
              <div className="excard__icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div className="excard__titles">
                <div className="excard__title">Дух команды — L · E · S</div>
                <div className="excard__sub">Три буквы, на которых строится всё в нашем отеле</div>
              </div>
              <div className="excard__arrow" aria-hidden="true">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </button>
            <div className="excard__body" style={exBody(0)}>
              <div className="excard__inner">
                <div className="excard__divider" />
                <div className="excard__content">
                  <div className="les-principles">
                    <div className="les-principle">
                      <div className="les-principle__letter">L</div>
                      <div className="les-principle__word">Love</div>
                      <div className="les-principle__desc">Любовь к делу — основа каждого действия</div>
                    </div>
                    <div className="les-principle">
                      <div className="les-principle__letter">E</div>
                      <div className="les-principle__word">Enjoy</div>
                      <div className="les-principle__desc">Радость от работы — гости чувствуют это сразу</div>
                    </div>
                    <div className="les-principle">
                      <div className="les-principle__letter">S</div>
                      <div className="les-principle__word">Smile</div>
                      <div className="les-principle__desc">Улыбка — наша главная валюта</div>
                    </div>
                  </div>
                  <div className="excard__text">
                    <p>Мы работаем по системе <strong>HOLA Clusive</strong> — уникальная архитектура гостеприимства с особой атмосферой. Наших гостей называем <strong>Друзьями Отеля</strong> — это не просто слово, это отношение.</p>
                    <p>Миссия LES Art Resort — <strong>доказать, что в России есть высококлассный сервис</strong>. Ты становишься частью этой истории с первого рабочего дня. Мы — одна команда: работаем не на нас, а вместе с нами.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Appearance */}
          <div className={`excard${openExpand === 1 ? " open" : ""}`} data-r data-d="2">
            <button className="excard__head" onClick={() => setOpenExpand(openExpand === 1 ? null : 1)} aria-expanded={openExpand === 1}>
              <div className="excard__icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="excard__titles">
                <div className="excard__title">Форма и внешний вид</div>
                <div className="excard__sub">Стандарты 4★ — что нужно знать до первого дня</div>
              </div>
              <div className="excard__arrow" aria-hidden="true">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </button>
            <div className="excard__body" style={exBody(1)}>
              <div className="excard__inner">
                <div className="excard__divider" />
                <div className="excard__content">
                  <div className="excard__img-row has-img">
                    <div>
                      <div className="excard__standards">
                        <div className="excard__std">
                          <div className="excard__std-label">Отель выдаёт</div>
                          <div className="excard__std-val">Фартук, бабочку, именной бейдж — всё уже ждёт тебя</div>
                        </div>
                        <div className="excard__std">
                          <div className="excard__std-label">Приносишь ты</div>
                          <div className="excard__std-val">Чистая белая рубашка, чёрные брюки, чёрная обувь</div>
                        </div>
                        <div className="excard__std">
                          <div className="excard__std-label">Волосы и маникюр</div>
                          <div className="excard__std-val">Аккуратная укладка, нейтральные тона — просто опрятно</div>
                        </div>
                        <div className="excard__std">
                          <div className="excard__std-label">Украшения</div>
                          <div className="excard__std-val">Обручальное кольцо, по одной сережке — ничего лишнего</div>
                        </div>
                      </div>
                    </div>
                    <div className="excard__img-frame">
                      <img src="/images/standard-clothing.jpg" alt="Стандарты внешнего вида" width="220" height="165" loading="lazy" />
                    </div>
                  </div>
                  <div className="excard__text">
                    <p><strong>Почему это важно?</strong> Ты — лицо курорта. Опрятный вид — уважение к гостям и коллегам, а не просто требование. Перед сменой всегда есть минута свериться: форма чистая, причёска аккуратная, настрой рабочий.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Territory */}
          <div className={`excard${openExpand === 2 ? " open" : ""}`} data-r data-d="3">
            <button className="excard__head" onClick={() => setOpenExpand(openExpand === 2 ? null : 2)} aria-expanded={openExpand === 2}>
              <div className="excard__icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="excard__titles">
                <div className="excard__title">Жизнь на территории курорта</div>
                <div className="excard__sub">Маршруты, перерывы и простые правила соседства</div>
              </div>
              <div className="excard__arrow" aria-hidden="true">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </button>
            <div className="excard__body" style={exBody(2)}>
              <div className="excard__inner">
                <div className="excard__divider" />
                <div className="excard__content">
                  <div className="excard__img-row has-img">
                    <div className="excard__rules">
                      {([
                        ["Маршрут персонала", "Передвигаемся по служебным зонам — это удобно и гостям, и нам. В гостевые зоны только при исполнении обязанностей."],
                        ["Телефон в кармане", "Во время смены телефон убран. Звонки и сообщения — только в перерыве, не в гостевой зоне."],
                        ["Русский в гостевых зонах", "Общение с коллегами при гостях — только по-русски, спокойно и негромко. Личные беседы — в свободное время."],
                        ["Курение в отведённых местах", "Строго в специальных зонах — без исключений. После — убираем за собой."],
                        ["Принцип «убирай по ходу»", "Заметил беспорядок — поправил. Это рефлекс хорошей команды, и его ценят."],
                      ] as [string, string][]).map(([title, desc], i) => (
                        <div key={i} className="excard__rule">
                          <div className="excard__rule-dot" />
                          <div>
                            <div style={{ fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: "3px" }}>{title}</div>
                            <div>{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="excard__img-frame">
                      <img src="/images/territory.jpg" alt="Территория LES Art Resort" width="220" height="165" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 — Fines / transparency */}
          <div className={`excard${openExpand === 3 ? " open" : ""}`} data-r data-d="4">
            <button className="excard__head" onClick={() => setOpenExpand(openExpand === 3 ? null : 3)} aria-expanded={openExpand === 3}>
              <div className="excard__icon-wrap">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="excard__titles">
                <div className="excard__title">Честно: что важно соблюдать</div>
                <div className="excard__sub">Мы предупреждаем заранее — никаких сюрпризов в первый день</div>
              </div>
              <div className="excard__arrow" aria-hidden="true">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </button>
            <div className="excard__body" style={exBody(3)}>
              <div className="excard__inner">
                <div className="excard__divider" />
                <div className="excard__content">
                  <p className="excard__fine-intro">
                    Мы — отель 4★ с высокими стандартами. Часть этих стандартов закреплена финансово — <strong>не потому что мы суровые, а потому что это честно</strong>. Вот ключевые пункты без мелкого шрифта:
                  </p>
                  <table className="excard__fine-table">
                    <thead>
                      <tr>
                        <th>Нарушение</th>
                        <th>Размер</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ["Нет элементов формы / нарушение стандартов внешнего вида", "Не допуск к смене"],
                        ["Нарушение маршрута движения персонала", "1 000 ₽"],
                        ["Опьянение в любом виде на территории", "5 000 ₽ + отстранение"],
                        ["Опоздание на смену более 10 минут", "500 ₽ / повторно 1 000 ₽"],
                        ["Самовольный уход с рабочего места", "Потеря оплаты за смену"],
                        ["Неучастие в генеральной уборке", "1 500 ₽ + отстранение"],
                        ["Вынос/употребление продуктов со шведского стола", "2 000 ₽"],
                        ["Публикация фото с геолокацией и хэштегом отеля", "Потеря оплаты за смену"],
                      ] as [string, string][]).map(([violation, amount], i) => (
                        <tr key={i}>
                          <td>{violation}</td>
                          <td>{amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="excard__fine-note">
                    <strong>Это не страшно, если ты профессионал.</strong> Большинство сотрудников работают месяцами без единого нарушения. Таблица здесь — потому что мы ценим прозрачность и честность с командой. Все случаи фиксируются письменно и согласуются.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ TRANSPORT ══════════════════════════════════════════ */}
      <section className="transport">
        <div style={{ maxWidth: "900px", margin: "0 auto" }} data-r>
          <p className="eyebrow" style={{ marginBottom: "12px" }}>Локация</p>
          <h2 className="transport__title">Как добраться</h2>
          <p className="transport__sub">60 км от Москвы по Минскому шоссе · Одинцовский район</p>
          <div className="transport__grid">
            <div className="tcard">
              <img src="/images/transport-car.jpg" alt="На автомобиле" loading="lazy" />
              <div className="tcard__ov" />
              <div className="tcard__body">
                <div className="tcard__icon">
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                </div>
                <h3>На автомобиле</h3>
                <p>~60 минут от МКАД по Минскому шоссе</p>
                <a href="https://yandex.ru/maps/?ll=37.157876%2C55.656713&mode=routes&rtext=55.700094%2C37.342531~55.520648%2C36.355103&rtt=auto" target="_blank" rel="noopener" className="btn btn--outline">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  Открыть маршрут
                </a>
              </div>
            </div>
            <div className="tcard">
              <img src="/images/transport-train.jpg" alt="Общественный транспорт" loading="lazy" />
              <div className="tcard__ov" />
              <div className="tcard__body">
                <div className="tcard__icon">
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="14" rx="2" /><path d="M7 18v4" /><path d="M17 18v4" /><path d="M2 10h20" /></svg>
                </div>
                <h3>Общественный транспорт</h3>
                <p>До станции Дорохово, далее автобус или такси до отеля</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ═════════════════════════════════════════════ */}
      <section className="values">
        <div className="values__inner">
          <div data-r>
            <p className="eyebrow" style={{ marginBottom: "14px" }}>Культура и стандарты</p>
            <h2 className="values__title">Работая у нас, ты</h2>
          </div>
          <div className="values__pills" data-r data-d="1">
            {["Уважаешь разнообразие гостей и коллег", "С гордостью представляешь компанию", "Постоянно учишься и реализуешь инициативы", "Работаешь в команде по принципу поддержки", "Идёшь вперёд ради ярких впечатлений гостей", "Всегда с улыбкой к «Друзьям Отеля»"].map((v, i) => (
              <div key={i} className="val-pill"><span className="val-pip" />{v}</div>
            ))}
          </div>
          <div className="standards" data-r>
            <span className="standards__lbl">Стандарты внешнего вида</span>
            <img src="/images/standard-clothing.jpg" alt="Стандарты формы" loading="lazy" />
          </div>
          <div data-r data-d="1">
            <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px" }}>Основные правила</h3>
            <p style={{ fontSize: "13px", color: "var(--ink-60)", marginBottom: "20px" }}>Честность, порядок, профессионализм</p>
            <div className="rules__grid">
              {["Всегда выглядеть опрятно — ты лицо компании", "Передвигаться только по сотрудническому маршруту", "Русский язык в гостевых зонах, без громких разговоров", "Мобильный телефон — только на перерыве", "Курение строго в специальных местах", "Беречь имущество отеля, сразу сообщать о поломках", "Без медкнижки и документов к работе не допускаем"].map((r, i) => (
                <div key={i} className="rule"><span className="rule-dot" />{r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section className="cta-section" id="cta">
        <div className="cta__bg" />
        <div className="cta__body" data-r>
          <p className="cta__eyebrow">Готов начать?</p>
          <h2 className="cta__title display">Один звонок —<br />и ты в команде</h2>
          <p className="cta__sub">Ответим прямо сейчас. Выход на работу за 1–3 дня.</p>
          <div className="cta__actions">
            <a href="tel:+79189058585" className="btn btn--white">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d={PHONE_D} /></svg>
              +7 (918) 905-85-85
            </a>
            <a href="https://wa.me/79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#25D366" }}>
              <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={WA_D} /></svg>
            </a>
            <a href="https://t.me/+79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#0088cc" }}>
              <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={TG_D} /></svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2025 LES Art Resort · Приезжай, работай, развивайся</p>
        <p><span style={{cursor:"default"}} onClick={()=>window.dispatchEvent(new Event("open-admin"))}>60</span> км от Москвы · Минское шоссе</p>
      </footer>

      {/* ══ STICKY MOBILE ══════════════════════════════════════ */}
      <div className="sticky">
        <a href="tel:+79189058585" style={{ flex: 1 }}>
          <button className="btn btn--dark" style={{ width: "100%" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d={PHONE_D} /></svg>
            Позвонить
          </button>
        </a>
        <a href="https://wa.me/79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#25D366" }}>
          <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={WA_D} /></svg>
        </a>
        <a href="https://t.me/+79189058585" target="_blank" rel="noopener" className="social-btn" style={{ background: "#0088cc" }}>
          <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d={TG_D} /></svg>
        </a>
      </div>

      <AdminPanel />
    </>
  )
}
