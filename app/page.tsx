"use client"

import Link from "next/link"
import { hotels } from "@/lib/hotels"
import { AdminPanel } from "@/components/admin-panel"

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero" id="top" style={{ minHeight: "clamp(400px, 60vh, 550px)" }}>
        <div className="hero__bg" style={{ backgroundImage: "url(/images/orig.jpg)" }} />
        <div className="hero__ov" />
        <div className="hero__content" style={{ maxWidth: 700 }}>
          <p className="eyebrow" style={{ color: "rgba(74,222,128,.7)" }}>Набор открыт в 3 объектах</p>
          <h1 className="display">Работа в<br />загородных отелях</h1>
          <p style={{ color: "rgba(255,255,255,.65)", marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
            Выберите объект в Москве и Московской области. Бесплатное питание, белая зарплата, карьерный рост.
          </p>
          <div className="hero__pills" style={{ marginTop: 20 }}>
            <span className="hero__pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
              Жильё
            </span>
            <span className="hero__pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>
              Питание
            </span>
            <span className="hero__pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Белая оплата
            </span>
          </div>
          <a href="tel:+79189058585" className="btn btn--white" style={{ marginTop: 24 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Позвонить: +7 (918) 905-85-85
          </a>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats__cell"><span className="stats__val">3</span><span className="stats__lab">объекта</span></div>
        <div className="stats__cell"><span className="stats__val">300+</span><span className="stats__lab">сотрудников</span></div>
        <div className="stats__cell"><span className="stats__val">45-88</span><span className="stats__lab">км от Москвы</span></div>
        <div className="stats__cell"><span className="stats__val">5+ лет</span><span className="stats__lab">на рынке</span></div>
      </div>

      {/* HOTEL CARDS */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 20px" }}>
        <h2 className="section-title">Выберите объект</h2>
        <p style={{ color: "rgba(255,255,255,.5)", textAlign: "center", marginBottom: 32 }}>Три загородных отеля в Московской области</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
          {hotels.map((hotel) => (
            <Link key={hotel.slug} href={`/hotel/${hotel.slug}`} style={{ textDecoration: "none", color: "#fff" }}>
              <div className="rcard" style={{ aspectRatio: "4/3" }}>
                <img className="rcard__img" src={hotel.heroImage} alt={hotel.name} />
                <div className="rcard__base" />
                <div className="rcard__badge" style={{ top: 12, left: 12 }}>{hotel.stars}★</div>
                <div className="rcard__info" style={{ bottom: 0, left: 0, right: 0, padding: 20 }}>
                  <div className="rcard__name" style={{ fontSize: 18 }}>{hotel.shortName}</div>
                  <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 4 }}>{hotel.distance} по {hotel.highway}</div>
                  <div className="rcard__rate" style={{ marginTop: 8 }}>от {Math.min(...hotel.vacancies.map(v => v.rate))} ₽/час</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {hotel.features.slice(0, 3).map((f) => (
                      <span key={f} style={{ background: "rgba(255,255,255,.08)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "rgba(255,255,255,.6)" }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 20px" }}>
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="bento" style={{ marginTop: 32 }}>
          {[
            { title: "Жильё", desc: "Бесплатное проживание или компенсация аренды", img: "/images/benefit-housing.jpg" },
            { title: "Питание", desc: "3-разовое питание каждый рабочий день", img: "/images/benefit-food.jpg" },
            { title: "Зарплата", desc: "Белая оплата, выплаты без задержек", img: "/images/benefit-payment.jpg" },
            { title: "Карьера", desc: "Обучение и карьерные возможности", img: "/images/benefit-career.jpg" },
            { title: "Команда", desc: "Дружелюбие и взаимовыручка", img: "/images/benefit-team.jpg" },
            { title: "График", desc: "5/2, 6/1 или 7/0", img: "/images/benefit-schedule.jpg" },
          ].map((b) => (
            <div key={b.title} className="bcell">
              <img className="bcell__img" src={b.img} alt={b.title} />
              <div className="bcell__overlay" />
              <div className="bcell__body">
                <div className="bcell__name">{b.title}</div>
                <div className="bcell__desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="display" style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}>Готовы начать?</h2>
        <p style={{ color: "rgba(255,255,255,.65)", marginTop: 12, fontSize: 16 }}>Один звонок — и вы в команде. Выход за 1-3 дня.</p>
        <a href="tel:+79189058585" className="btn btn--white" style={{ marginTop: 24 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          +7 (918) 905-85-85
        </a>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>© 2025 Загородные отели. Приезжай, работай, развивайся!</p>
      </footer>

      {/* STICKY BAR */}
      <div className="sticky">
        <a href="tel:+79189058585" className="btn btn--dark">
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
