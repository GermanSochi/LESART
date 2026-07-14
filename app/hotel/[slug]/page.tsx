"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getHotelBySlug } from "@/lib/hotels"
import { AdminPanel } from "@/components/admin-panel"

const PLAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`

function ReviewCard({ name, role, avatar, audioSrc }: { name: string; role: string; avatar: string; audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState("0:00")
  const [progress, setProgress] = useState(0)
  const bars = useRef(Array.from({ length: 12 }, () => 8 + Math.random() * 18))

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      const m = Math.floor(audio.currentTime / 60)
      const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0")
      setTime(`${m}:${s}`)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onEnd = () => { setPlaying(false); setTime("0:00"); setProgress(0) }
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnd)
    return () => { audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("ended", onEnd) }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  return (
    <div className="rvcard">
      <div className="rvcard__top">
        <img className="rvcard__av" src={avatar} alt={name} />
        <div>
          <div className="rvcard__name">{name}</div>
          <div className="rvcard__role">{role}</div>
        </div>
      </div>
      <div className="rvcard__wave">
        {bars.current.map((h, i) => (
          <div key={i} className="rvcard__bar" style={{ height: `${h}px` }} />
        ))}
      </div>
      <div className="rvcard__prog"><div className="rvcard__fill" style={{ width: `${progress}%` }} /></div>
      <div className="rvcard__bot">
        <button className="rvcard__play" onClick={toggle} dangerouslySetInnerHTML={{ __html: PLAY_SVG }} />
        <span className="rvcard__time">{time}</span>
      </div>
      <audio ref={audioRef} preload="metadata"><source src={audioSrc} /></audio>
    </div>
  )
}

function Accordion({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "none", border: "none", cursor: "pointer", color: "#fff", textAlign: "left" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(74,222,128,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </button>
      <div style={{ maxHeight: open ? 2000 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq__item">
      <button className="faq__q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq__icon" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <div className="faq__a" style={{ maxHeight: open ? 500 : 0, opacity: open ? 1 : 0 }}>
        <div className="faq__a-in">{a}</div>
      </div>
    </div>
  )
}

export default function HotelPage() {
  const params = useParams()
  const slug = params?.slug as string
  const hotel = getHotelBySlug(slug)

  if (!hotel) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#081510", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Отель не найден</h1>
          <Link href="/" style={{ color: "#4ade80", textDecoration: "underline" }}>На главную</Link>
        </div>
      </div>
    )
  }

  const reviews = [
    { name: "Ольга", role: "Горничная", avatar: "/images/avatar-olga.jpg", audio: "/uploads/audio/seed-6.mp3" },
    { name: "Анастасия", role: "Горничная", avatar: "/images/avatar-anastasia.jpg", audio: "/uploads/audio/seed-7.mp3" },
    { name: "Ирина", role: "Горничная", avatar: "/images/avatar-irina.jpg", audio: "/uploads/audio/seed-5.mp3" },
    { name: "Азамат", role: "Водитель / грузчик", avatar: "/images/avatar-azamat.jpg", audio: "/uploads/audio/seed-1.mp3" },
    { name: "Бэк", role: "Официант", avatar: "/images/avatar-bek.jpg", audio: "/uploads/audio/seed-2.mp3" },
    { name: "Фархат", role: "Стюард", avatar: "/images/avatar-farkhat.jpg", audio: "/uploads/audio/seed-3.mp3" },
    { name: "Батыргуль", role: "Уборщица", avatar: "/images/avatar-batyr.jpg", audio: "/uploads/audio/seed-4.mp3" },
  ]

  const faqs = [
    { q: "Есть ли работа с проживанием под Москвой?", a: `Да! ${hotel.name} — ${hotel.distance} от Москвы. Жильё бесплатно для всех сотрудников прямо на территории отеля.` },
    { q: "Сколько реально зарабатывает горничная?", a: "Горничная получает 370 ₽/ч. При стандартной смене — около 4 000–4 500 ₽ в день." },
    { q: "Можно ли приехать из другого города?", a: "Конечно. К нам приезжают сотрудники со всей России. Жильё бесплатное, помогаем с адаптацией." },
    { q: "Какой график и сколько часов смена?", a: "Смены от 11 часов. Графики: 5/2, 6/1 или 7/0 — обсуждается при оформлении." },
    { q: "Нужны ли опыт и медицинская книжка?", a: "Медкнижка обязательна для всех. Опыт приветствуется, но не всегда обязателен — обучим." },
    { q: "Как быстро можно выйти на работу?", a: "При наличии всех документов — выход за 1–3 дня после собеседования." },
  ]

  const values = [
    "Уважаешь разнообразие гостей и коллег",
    "С гордостью представляешь компанию",
    "Постоянно учишься и реализуешь инициативы",
    "Работаешь в команде по принципу поддержки",
    "Идёшь вперёд ради ярких впечатлений гостей",
    "Всегда с улыбкой к «Друзьям Отеля»",
  ]

  const rules = [
    "Всегда выглядеть опрятно — ты лицо компании",
    "Передвигаться только по сотрудническому маршруту",
    "Русский язык в гостевых зонах, без громких разговоров",
    "Мобильный телефон — только на перерыв",
    "Курение строго в специальных местах",
    "Беречь имущество отеля, сразу сообщать о поломках",
    "Без медкнижки и документов к работе не допускаем",
  ]

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero__bg" style={{ backgroundImage: `url(${hotel.heroImage})` }} />
        <div className="hero__ov" />
        <div className="hero__content">
          <p className="eyebrow" style={{ color: "rgba(74,222,128,.7)" }}>Набор открыт прямо сейчас</p>
          <h1 className="display">Приезжайте<br />и работайте</h1>
          <div className="hero__pills">
            <span className="hero__pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>{hotel.distance} от Москвы</span>
            <span className="hero__pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>Жильё</span>
            <span className="hero__pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>Белая зарплата</span>
          </div>
          <a href={`tel:${hotel.phone}`} className="btn btn--white" style={{ marginTop: 24 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Позвонить и устроиться за 1 день
          </a>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 18, marginTop: 8 }}>{hotel.phoneDisplay}</p>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats__cell"><span className="stats__val">до {Math.max(...hotel.vacancies.map(v => v.rate))}₽</span><span className="stats__lab">в час</span></div>
        <div className="stats__cell"><span className="stats__val">300+</span><span className="stats__lab">сотрудников</span></div>
        <div className="stats__cell"><span className="stats__val">{hotel.distanceKm} км</span><span className="stats__lab">от Москвы</span></div>
        <div className="stats__cell"><span className="stats__val">5+ лет</span><span className="stats__lab">на рынке</span></div>
      </div>

      {/* VACANCIES */}
      <section className="roles" id="vacancies">
        <h2 className="section-title">Открытые позиции</h2>
        <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32 }}>Выберись в роль. Оформление в день прихода. Реальные ставки без скрытых условий.</p>
        <div className="roles__grid">
          {hotel.vacancies.map((v, i) => (
            <div key={v.title} className={`rcard${i === 0 ? " rcard--featured" : ""}`}>
              <img className="rcard__img" src={v.image} alt={v.title} />
              <div className="rcard__base" />
              {i === 0 && <div className="rcard__badge">★ Топ ставка</div>}
              <div className="rcard__cta">Откликнуться →</div>
              <div className="rcard__info">
                <div className="rcard__name">{v.title}</div>
                <div className="rcard__rate">{v.rate} ₽/ч</div>
                <div className="rcard__gender">{v.gender}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Medical warning */}
        <div style={{ maxWidth: 600, margin: "32px auto 0", background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p style={{ color: "rgba(239,68,68,.8)", fontSize: 14, margin: 0 }}>Строго с документами. Личная медицинская книжка обязательна для всех позиций.</p>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "24px 0", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14 }}>{hotel.distance} · {hotel.highway} · {hotel.location}</p>
      </section>

      {/* RESORT */}
      <section className="resort" id="resort">
        <div className="resort__bg" style={{ backgroundImage: `url(${hotel.heroImage})` }} />
        <div className="resort__ov" />
        <div className="resort__content">
          <p className="eyebrow" style={{ color: "rgba(74,222,128,.7)" }}>Твоё место</p>
          <h2 className="display" style={{ fontSize: "clamp(22px,2.8vw,38px)" }}>в команде<br />уже ждёт</h2>
          <p style={{ color: "rgba(255,255,255,.65)", marginTop: 16, maxWidth: 500, lineHeight: 1.6 }}>
            Один из лучших загородных курортов Подмосковья — в окружении леса. Здесь работают 300+ человек. Жильё на территории, питание, стабильная зарплата.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
        <h2 className="section-title">Почему здесь<br />остаются надолго</h2>
        <div className="bento">
          {hotel.benefits.map((b, i) => (
            <div key={b.title} className={`bcell${i === 1 ? " bcell--tall" : ""}`}>
              <img className="bcell__img" src={`/images/benefit-${["food", "housing", "payment", "career", "team", "schedule"][i % 6]}.jpg`} alt={b.title} />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__name">{b.title}</div>
                <div className="bcell__desc">{b.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCOMMODATION */}
      <section style={{ padding: "clamp(40px,6vw,80px) 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <h2 className="section-title">Твоё жильё</h2>
          <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32, fontSize: 14 }}>Чисто, тепло, со всеми удобствами</p>
          <div className="dorm-mosaic">
            <img src="/images/dorm1.jpg" alt="Кухня" className="dorm-mosaic__img" />
            <img src="/images/dorm2.jpg" alt="Общая зона" className="dorm-mosaic__img" />
            <img src="/images/dorm3.jpg" alt="Прачечная" className="dorm-mosaic__img" />
          </div>
          <div style={{ marginTop: 20, color: "rgba(255,255,255,.65)", fontSize: 15, lineHeight: 1.7, textAlign: "center" }}>
            <p>{hotel.accommodation.details}</p>
            {hotel.slug === "les-art-resort" && (
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, marginTop: 12 }}>Заселение в проживание — строго в будние дни до 18:00.</p>
            )}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 16, color: "rgba(255,255,255,.4)", fontSize: 13 }}>
            {hotel.conditions.map((c, i) => (
              <span key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: "6px 12px" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews">
        <div className="reviews__header">
          <div>
            <p className="eyebrow" style={{ color: "rgba(74,222,128,.7)" }}>Социальное доказательство</p>
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: 0 }}>Говорят те,<br />кто работает</h2>
          </div>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}>листай →</span>
        </div>
        <div className="reviews__track" id="reviewsTrack">
          {reviews.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2 className="section-title">Ответы на вопросы</h2>
        <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32 }}>FAQ</p>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* HONEST DETAILS */}
      <section style={{ padding: "clamp(40px,6vw,80px) 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
          <h2 className="section-title">Для тех, кто хочет знать больше</h2>
          <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32 }}>Говорим честно — без воды и без страшилок</p>

          <Accordion title="Форма и внешний вид" subtitle="Стандарты 4★ — что нужно знать до первого дня">
            <StandardItem icon="clothing" title="Одежда" text="Корпоративная форма, чистая и выглаженная с именным бейджем" />
            <StandardItem icon="shoes" title="Обувь" text="Классическая, чёрная, закрытая, без декора" />
            <StandardItem icon="hair" title="Волосы" text="Женщины: собранные в пучок. Мужчины: короткая стрижка" />
            <StandardItem icon="jewelry" title="Украшения" text="Минимум: обручальное кольцо, по одной серёжке для женщин" />
            <StandardItem icon="hygiene" title="Гигиена" text="Личная чистота обязательна! Свежее дыхание, чистые руки" />
          </Accordion>

          <Accordion title="Жизнь на территории курорта" subtitle="Маршруты, перерывы и простые правила соседстваМаршрут персонала">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Передвигаемся по служебным зонам. В гостевые зоны — только при исполнении обязанностей.",
                "Во время смены телефон убран. Звонки — только в перерыве, не в гостевой зоне.",
                "Общение с коллегами при гостях — только по-русски, спокойно и негромко.",
                "Строго в специальных зонах, без исключений. После — убираем за собой.",
                "Заметил беспорядок — поправил. Это рефлекс хорошей команды."
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", marginTop: 7, flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Честно: что важно соблюдать" subtitle="Предупреждаем заранее — никаких сюрпризов в первый день">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "rgba(255,255,255,.4)", fontWeight: 500 }}>Нарушение</th>
                    <th style={{ textAlign: "right", padding: "10px 12px", color: "rgba(255,255,255,.4)", fontWeight: 500 }}>Размер</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Нет элементов формы / нарушение стандартов", "Не допуск к смене"],
                    ["Нарушение маршрута движения персонала", "1 000 ₽"],
                    ["Опьянение в любом виде на территории", "5 000 ₽ + отстранение"],
                    ["Опоздание на смену более 10 минут", "500 ₽ / повторно 1 000 ₽"],
                    ["Самовольный уход с рабочего места", "Потеря оплаты за смену"],
                    ["Неучастие в генеральной уборке", "1 500 ₽ + отстранение"],
                    ["Вынос/употребление продуктов со стола", "2 000 ₽"],
                  ].map(([rule, penalty], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                      <td style={{ padding: "10px 12px" }}>{rule}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "rgba(74,222,128,.8)", fontWeight: 600 }}>{penalty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>
        </div>
      </section>

      {/* TRANSPORT */}
      <section className="transport">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <h2 className="section-title">Как добраться</h2>
          <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32, fontSize: 14 }}>{hotel.location}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <div className="tcard">
              <img src="/images/transport-car.jpg" alt="Авто" className="tcard__bg" />
              <div className="tcard__ov" />
              <div className="tcard__body">
                <div className="tcard__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1M6 19a2 2 0 104 0M14 19a2 2 0 104 0"/></svg></div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>На автомобиле</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13, marginTop: 4 }}>{hotel.howToGetThere.car.time} {hotel.howToGetThere.car.description}</p>
                <a href={hotel.howToGetThere.car.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ marginTop: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Открыть маршрут
                </a>
              </div>
            </div>
            <div className="tcard">
              <img src="/images/transport-train.jpg" alt="Транспорт" className="tcard__bg" />
              <div className="tcard__ov" />
              <div className="tcard__body">
                <div className="tcard__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M8 19l-2 3M16 19l2 3M12 3v8"/></svg></div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Общественный транспорт</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13, marginTop: 4 }}>{hotel.howToGetThere.public.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left" }}>Работая у нас,<br />ты</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                {values.map((v, i) => (
                  <div key={i} className="val-pill">
                    <div className="val-pip" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="section-title" style={{ textAlign: "left" }}>Основные<br />правила</h2>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginTop: 8, marginBottom: 20 }}>Честность, порядок, профессионализм</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {rules.map((r, i) => (
                  <div key={i} className="rule">
                    <div className="rule-dot" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <h2 className="display" style={{ fontSize: "clamp(22px,2.8vw,38px)" }}>Готов начать?</h2>
        <p style={{ color: "rgba(255,255,255,.65)", marginTop: 12, fontSize: 16 }}>Один звонок —<br />и ты в команде</p>
        <p style={{ color: "rgba(255,255,255,.4)", marginTop: 8, fontSize: 13 }}>Ответим прямо сейчас. Выход на работу за 1–3 дня.</p>
        <a href={`tel:${hotel.phone}`} className="btn btn--white" style={{ marginTop: 24 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          {hotel.phoneDisplay}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>© 2025 {hotel.shortName} · Приезжай, работай, развивайся!</p>
        <p style={{ marginTop: 4 }}>{hotel.distance} · {hotel.highway}</p>
      </footer>

      {/* STICKY BAR */}
      <div className="sticky">
        <a href={`tel:${hotel.phone}`} className="btn btn--dark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Позвонить
        </a>
        <a href="https://wa.me/79189058585" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ background: "#25D366" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="https://t.me/+79189058585" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ background: "#0088cc" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
      </div>

      <AdminPanel />
    </div>
  )
}

function StandardItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(74,222,128,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 2 }}>{text}</div>
      </div>
    </div>
  )
}
