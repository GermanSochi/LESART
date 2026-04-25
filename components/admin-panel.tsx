"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDown, ArrowUp, ImageIcon, Plus, RefreshCw, Save, Trash2, Upload, X } from "lucide-react"
import { fetchSiteContent, saveSiteContent, uploadMedia, type AudioReview, type SiteContent, type Vacancy } from "@/lib/site-content-client"

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function move<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener("open-admin", handler)
    return () => window.removeEventListener("open-admin", handler)
  }, [])
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [activeTab, setActiveTab] = useState<"site" | "audio" | "rates" | "faq">("audio")
  const [content, setContent] = useState<SiteContent | null>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string>("")

  const [newReviewName, setNewReviewName] = useState("")
  const [newReviewPosition, setNewReviewPosition] = useState("")
  const [newReviewAvatarFile, setNewReviewAvatarFile] = useState<File | null>(null)
  const [newReviewAudioFile, setNewReviewAudioFile] = useState<File | null>(null)

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const heroImageRef = useRef<HTMLInputElement>(null)
  const heroVideoRef = useRef<HTMLInputElement>(null)
  const heroPosterRef = useRef<HTMLInputElement>(null)

  const refreshFromServer = async () => {
    setError("")
    try {
      const c = await fetchSiteContent()
      setContent(c)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить данные")
    }
  }

  const saveAll = async () => {
    if (!content) return
    setIsSaving(true)
    setError("")
    try {
      const vacancyRates = (content.vacancies ?? []).reduce<Record<string, number>>((acc, v) => {
        if (v.title) acc[v.title] = v.rate
        return acc
      }, {})
      const toSave: SiteContent = { ...content, vacancyRates }
      await saveSiteContent(toSave)
      await refreshFromServer()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogin = () => {
    if (login === "admin" && password === "admin1234") {
      setIsLoggedIn(true)
      setLoginError("")
      refreshFromServer()
    } else {
      setLoginError("Неверный логин или пароль")
    }
  }

  const addAudioReview = async () => {
    if (!content) return
    if (!newReviewName.trim() || !newReviewPosition.trim() || !newReviewAudioFile) return

    setIsUploading(true)
    setError("")
    try {
      const audio = await uploadMedia(newReviewAudioFile)
      const avatar = newReviewAvatarFile ? await uploadMedia(newReviewAvatarFile) : null

      const next: AudioReview = {
        id: uid(),
        name: newReviewName.trim(),
        position: newReviewPosition.trim(),
        audioUrl: audio.url,
        avatarUrl: avatar?.url,
      }

      setContent({ ...content, audioReviews: [...(content.audioReviews ?? []), next] })
      setNewReviewName("")
      setNewReviewPosition("")
      setNewReviewAvatarFile(null)
      setNewReviewAudioFile(null)
      if (avatarInputRef.current) avatarInputRef.current.value = ""
      if (audioInputRef.current) audioInputRef.current.value = ""
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки")
    } finally {
      setIsUploading(false)
    }
  }

  const updateReview = (id: string, patch: Partial<AudioReview>) => {
    if (!content) return
    setContent({
      ...content,
      audioReviews: (content.audioReviews ?? []).map((r) => (r.id === id ? { ...r, ...patch } : r)),
    })
  }

  const deleteReview = (id: string) => {
    if (!content) return
    setContent({ ...content, audioReviews: (content.audioReviews ?? []).filter((r) => r.id !== id) })
  }

  const replaceReviewMedia = async (id: string, kind: "audio" | "avatar", file: File) => {
    if (!content) return
    setIsUploading(true)
    setError("")
    try {
      const uploaded = await uploadMedia(file)
      if (kind === "audio") updateReview(id, { audioUrl: uploaded.url })
      else updateReview(id, { avatarUrl: uploaded.url })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки")
    } finally {
      setIsUploading(false)
    }
  }

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    if (!content) return
    const updated = [...(content.faqs ?? [])]
    updated[index] = { ...updated[index], [field]: value }
    setContent({ ...content, faqs: updated })
  }

  const addFaq = () => {
    if (!content) return
    setContent({ ...content, faqs: [...(content.faqs ?? []), { question: "Новый вопрос", answer: "Ответ" }] })
  }

  const deleteFaq = (index: number) => {
    if (!content) return
    setContent({ ...content, faqs: (content.faqs ?? []).filter((_, i) => i !== index) })
  }

  // legacy helper; vacancyRates now derived from vacancies on save

  const uploadHeroBackground = async (file: File, kind: "image" | "video") => {
    if (!content) return
    setIsUploading(true)
    setError("")
    try {
      const uploaded = await uploadMedia(file)
      const bg =
        kind === "image"
          ? { kind: "image" as const, url: uploaded.url }
          : { kind: "video" as const, url: uploaded.url, posterUrl: undefined }
      setContent({ ...content, hero: { ...content.hero, background: bg } })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки")
    } finally {
      setIsUploading(false)
    }
  }

  const uploadHeroPoster = async (file: File) => {
    if (!content) return
    if (content.hero.background.kind !== "video") return
    setIsUploading(true)
    setError("")
    try {
      const uploaded = await uploadMedia(file)
      setContent({
        ...content,
        hero: { ...content.hero, background: { ...content.hero.background, posterUrl: uploaded.url } },
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки")
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    // keep content loaded after refresh in same session
    if (isLoggedIn && isOpen && !content) refreshFromServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isOpen])

  const updateVacancy = (id: string, patch: Partial<Vacancy>) => {
    if (!content) return
    setContent({
      ...content,
      vacancies: (content.vacancies ?? []).map((v) => (v.id === id ? { ...v, ...patch } : v)),
    })
  }

  const addVacancy = () => {
    if (!content) return
    const next: Vacancy = { id: uid(), title: "Новая должность", rate: 0, gender: "М/Ж", image: "", active: true }
    setContent({ ...content, vacancies: [...(content.vacancies ?? []), next] })
  }

  const deleteVacancy = (id: string) => {
    if (!content) return
    setContent({ ...content, vacancies: (content.vacancies ?? []).filter((v) => v.id !== id) })
  }

  const moveVacancy = (id: string, dir: -1 | 1) => {
    if (!content) return
    const arr = content.vacancies ?? []
    const idx = arr.findIndex((v) => v.id === id)
    if (idx === -1) return
    setContent({ ...content, vacancies: move(arr, idx, idx + dir) })
  }

  const moveReview = (id: string, dir: -1 | 1) => {
    if (!content) return
    const arr = content.audioReviews ?? []
    const idx = arr.findIndex((r) => r.id === id)
    if (idx === -1) return
    setContent({ ...content, audioReviews: move(arr, idx, idx + dir) })
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isLoggedIn ? "Админ-панель" : "Вход"}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false)
              setIsLoggedIn(false)
              setLogin("")
              setPassword("")
              setContent(null)
              setError("")
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isLoggedIn ? (
          <div className="space-y-4">
            <Input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {loginError && <p className="text-destructive text-sm">{loginError}</p>}
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2 border-b pb-2 overflow-x-auto">
                <Button variant={activeTab === "site" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("site")}>
                  Сайт
                </Button>
                <Button variant={activeTab === "audio" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("audio")}>
                  Отзывы
                </Button>
                <Button variant={activeTab === "rates" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("rates")}>
                  Ставки
                </Button>
                <Button variant={activeTab === "faq" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("faq")}>
                  FAQ
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={refreshFromServer} disabled={isSaving || isUploading}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Обновить
                </Button>
                <Button onClick={saveAll} size="sm" disabled={!content || isSaving || isUploading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            </div>

            {!content ? (
              <div className="text-sm text-muted-foreground">Загружаю данные…</div>
            ) : (
              <>
                {activeTab === "site" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Hero</p>
                      <Input
                        value={content.hero.title}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                        placeholder="Заголовок"
                      />
                      <Input
                        value={content.hero.subtitle}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                        placeholder="Подзаголовок"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Тексты секций</p>
                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">О нас — заголовок</p>
                        <Input
                          value={content.sections.about.title}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, about: { ...content.sections.about, title: e.target.value } },
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground">О нас — текст (можно с HTML)</p>
                        <Textarea
                          value={content.sections.about.text}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, about: { ...content.sections.about, text: e.target.value } },
                            })
                          }
                          rows={4}
                        />
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Вакансии — заголовок</p>
                        <Input
                          value={content.sections.vacancies.title}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, vacancies: { ...content.sections.vacancies, title: e.target.value } },
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground">Вакансии — подзаголовок</p>
                        <Input
                          value={content.sections.vacancies.subtitle}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                vacancies: { ...content.sections.vacancies, subtitle: e.target.value },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Условия работы — заголовок</p>
                        <Input
                          value={content.sections.conditions.title}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, conditions: { ...content.sections.conditions, title: e.target.value } },
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground">Условия работы — текст</p>
                        <Textarea
                          value={content.sections.conditions.text ?? ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, conditions: { ...content.sections.conditions, text: e.target.value } },
                            })
                          }
                          rows={6}
                          placeholder="Описание реальных условий работы..."
                        />
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">SEO-статья (HTML)</p>
                        <Input
                          value={content.sections.seoArticle.title}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, seoArticle: { ...content.sections.seoArticle, title: e.target.value } },
                            })
                          }
                          placeholder="Заголовок статьи"
                        />
                        <Textarea
                          value={content.sections.seoArticle.html}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, seoArticle: { ...content.sections.seoArticle, html: e.target.value } },
                            })
                          }
                          rows={6}
                          placeholder="<p>...</p>"
                        />
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Заголовки блоков</p>
                        <div className="grid gap-2">
                          <Input
                            value={content.sections.benefits.title}
                            onChange={(e) => setContent({ ...content, sections: { ...content.sections, benefits: { title: e.target.value } } })}
                            placeholder="Преимущества — заголовок"
                          />
                          <Input
                            value={content.sections.voiceReviews.title}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, voiceReviews: { ...content.sections.voiceReviews, title: e.target.value } },
                              })
                            }
                            placeholder="Отзывы — заголовок"
                          />
                          <Input
                            value={content.sections.voiceReviews.subtitle}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, voiceReviews: { ...content.sections.voiceReviews, subtitle: e.target.value } },
                              })
                            }
                            placeholder="Отзывы — подзаголовок"
                          />
                          <Input
                            value={content.sections.faq.title}
                            onChange={(e) => setContent({ ...content, sections: { ...content.sections, faq: { title: e.target.value } } })}
                            placeholder="FAQ — заголовок"
                          />
                          <Input
                            value={content.sections.howToGetThere.title}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, howToGetThere: { ...content.sections.howToGetThere, title: e.target.value } },
                              })
                            }
                            placeholder="Как добраться — заголовок"
                          />
                          <Input
                            value={content.sections.howToGetThere.subtitle}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, howToGetThere: { ...content.sections.howToGetThere, subtitle: e.target.value } },
                              })
                            }
                            placeholder="Как добраться — подзаголовок"
                          />
                          <Input
                            value={content.sections.values.title}
                            onChange={(e) => setContent({ ...content, sections: { ...content.sections, values: { ...content.sections.values, title: e.target.value } } })}
                            placeholder="Ценности — заголовок"
                          />
                          <Input
                            value={content.sections.standards.title}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, standards: { ...content.sections.standards, title: e.target.value } },
                              })
                            }
                            placeholder="Стандарты — заголовок"
                          />
                          <Input
                            value={content.sections.standards.subtitle}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, standards: { ...content.sections.standards, subtitle: e.target.value } },
                              })
                            }
                            placeholder="Стандарты — подзаголовок"
                          />
                          <Input
                            value={content.sections.rules.title}
                            onChange={(e) => setContent({ ...content, sections: { ...content.sections, rules: { ...content.sections.rules, title: e.target.value } } })}
                            placeholder="Правила — заголовок"
                          />
                          <Input
                            value={content.sections.rules.subtitle}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, rules: { ...content.sections.rules, subtitle: e.target.value } },
                              })
                            }
                            placeholder="Правила — подзаголовок"
                          />
                          <Input
                            value={content.sections.cta.title}
                            onChange={(e) => setContent({ ...content, sections: { ...content.sections, cta: { ...content.sections.cta, title: e.target.value } } })}
                            placeholder="CTA — заголовок"
                          />
                          <Input
                            value={content.sections.cta.subtitle}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                sections: { ...content.sections, cta: { ...content.sections.cta, subtitle: e.target.value } },
                              })
                            }
                            placeholder="CTA — подзаголовок"
                          />
                        </div>
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Футер</p>
                        <Input
                          value={content.sections.footer.copyright}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: { ...content.sections, footer: { copyright: e.target.value } },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Фон: картинка</p>
                        <input
                          ref={heroImageRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) uploadHeroBackground(f, "image")
                            if (heroImageRef.current) heroImageRef.current.value = ""
                          }}
                        />
                        <Button variant="outline" className="w-full" onClick={() => heroImageRef.current?.click()} disabled={isUploading}>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Загрузить картинку
                        </Button>
                        <p className="text-xs text-muted-foreground break-all">
                          {content.hero.background.kind === "image" ? content.hero.background.url : "—"}
                        </p>
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Фон: видео</p>
                        <input
                          ref={heroVideoRef}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) uploadHeroBackground(f, "video")
                            if (heroVideoRef.current) heroVideoRef.current.value = ""
                          }}
                        />
                        <Button variant="outline" className="w-full" onClick={() => heroVideoRef.current?.click()} disabled={isUploading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Загрузить видео
                        </Button>

                        {content.hero.background.kind === "video" && (
                          <>
                            <input
                              ref={heroPosterRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (f) uploadHeroPoster(f)
                                if (heroPosterRef.current) heroPosterRef.current.value = ""
                              }}
                            />
                            <Button variant="outline" className="w-full" onClick={() => heroPosterRef.current?.click()} disabled={isUploading}>
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Постер (картинка)
                            </Button>
                            <p className="text-xs text-muted-foreground break-all">{content.hero.background.url}</p>
                            <p className="text-xs text-muted-foreground break-all">{content.hero.background.posterUrl ?? "poster: —"}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Картинки отеля (3 шт)</p>
                      {(content.media?.hotelImages ?? []).map((img, idx) => (
                        <div key={idx} className="rounded-lg border p-3 space-y-2">
                          <div className="grid gap-2 md:grid-cols-[1fr_160px] items-start">
                            <div className="space-y-2">
                              <Input
                                value={img.alt}
                                onChange={(e) => {
                                  const next = [...(content.media?.hotelImages ?? [])]
                                  next[idx] = { ...next[idx], alt: e.target.value }
                                  setContent({ ...content, media: { ...content.media, hotelImages: next, dormitoryImages: content.media.dormitoryImages } })
                                }}
                                placeholder="alt"
                              />
                              <p className="text-xs text-muted-foreground break-all">{img.src}</p>
                            </div>
                            <div className="h-20 rounded-md overflow-hidden bg-muted">
                              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (!f) return
                                setIsUploading(true)
                                setError("")
                                uploadMedia(f)
                                  .then(({ url }) => {
                                    const next = [...(content.media?.hotelImages ?? [])]
                                    next[idx] = { ...next[idx], src: url }
                                    setContent({ ...content, media: { ...content.media, hotelImages: next, dormitoryImages: content.media.dormitoryImages } })
                                  })
                                  .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
                                  .finally(() => setIsUploading(false))
                                e.target.value = ""
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}
                              disabled={isUploading}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Заменить
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const next = (content.media?.hotelImages ?? []).filter((_, i) => i !== idx)
                                setContent({ ...content, media: { ...content.media, hotelImages: next, dormitoryImages: content.media.dormitoryImages } })
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const next = [...(content.media?.hotelImages ?? []), { src: "/images/orig.jpg", alt: "Фото" }]
                          setContent({ ...content, media: { ...content.media, hotelImages: next, dormitoryImages: content.media.dormitoryImages } })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить картинку
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Фото проживания</p>
                      {(content.media?.dormitoryImages ?? []).map((img, idx) => (
                        <div key={idx} className="rounded-lg border p-3 space-y-2">
                          <Input
                            value={img.alt}
                            onChange={(e) => {
                              const next = [...(content.media?.dormitoryImages ?? [])]
                              next[idx] = { ...next[idx], alt: e.target.value }
                              setContent({ ...content, media: { ...content.media, dormitoryImages: next, hotelImages: content.media.hotelImages } })
                            }}
                            placeholder="Подпись (alt)"
                          />
                          <Input
                            value={img.src}
                            onChange={(e) => {
                              const next = [...(content.media?.dormitoryImages ?? [])]
                              next[idx] = { ...next[idx], src: e.target.value }
                              setContent({ ...content, media: { ...content.media, dormitoryImages: next, hotelImages: content.media.hotelImages } })
                            }}
                            placeholder="URL картинки"
                          />
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (!f) return
                                setIsUploading(true)
                                setError("")
                                uploadMedia(f)
                                  .then(({ url }) => {
                                    const next = [...(content.media?.dormitoryImages ?? [])]
                                    next[idx] = { ...next[idx], src: url }
                                    setContent({ ...content, media: { ...content.media, dormitoryImages: next, hotelImages: content.media.hotelImages } })
                                  })
                                  .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
                                  .finally(() => setIsUploading(false))
                                e.target.value = ""
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}
                              disabled={isUploading}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Загрузить
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const next = (content.media?.dormitoryImages ?? []).filter((_, i) => i !== idx)
                                setContent({ ...content, media: { ...content.media, dormitoryImages: next, hotelImages: content.media.hotelImages } })
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const next = [...(content.media?.dormitoryImages ?? []), { src: "", alt: "Фото" }]
                          setContent({ ...content, media: { ...content.media, dormitoryImages: next, hotelImages: content.media.hotelImages } })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить фото
                      </Button>
                      <p className="text-xs text-muted-foreground">После изменений нажмите “Сохранить” сверху.</p>
                    </div>
                  </div>
                )}

                {activeTab === "audio" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input placeholder="Имя сотрудника" value={newReviewName} onChange={(e) => setNewReviewName(e.target.value)} />
                      <Input placeholder="Должность" value={newReviewPosition} onChange={(e) => setNewReviewPosition(e.target.value)} />

                      <div className="flex gap-2">
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewReviewAvatarFile(e.target.files?.[0] ?? null)}
                          className="hidden"
                        />
                        <Button variant="outline" size="sm" onClick={() => avatarInputRef.current?.click()} className="flex-1">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {newReviewAvatarFile ? "Аватар выбран" : "Добавить аватар"}
                        </Button>

                        <input
                          ref={audioInputRef}
                          type="file"
                          accept="audio/mpeg,audio/mp3,audio/*"
                          onChange={(e) => setNewReviewAudioFile(e.target.files?.[0] ?? null)}
                          className="hidden"
                        />
                        <Button variant="outline" size="sm" onClick={() => audioInputRef.current?.click()} className="flex-1" disabled={!newReviewName || !newReviewPosition}>
                          <Upload className="h-4 w-4 mr-2" />
                          {newReviewAudioFile ? "Аудио выбрано" : "Выбрать аудио"}
                        </Button>
                      </div>

                      <Button
                        className="w-full"
                        onClick={addAudioReview}
                        disabled={!newReviewName.trim() || !newReviewPosition.trim() || !newReviewAudioFile || isUploading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {isUploading ? "Загрузка..." : "Добавить отзыв"}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {(content.audioReviews ?? []).length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-4">Нет отзывов</p>
                      ) : (
                        (content.audioReviews ?? []).map((review) => (
                          <div key={review.id} className="p-3 bg-muted rounded-lg space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                {review.avatarUrl ? (
                                  <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-primary font-bold">{review.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <Input value={review.name} onChange={(e) => updateReview(review.id, { name: e.target.value })} className="h-8" />
                                <Input
                                  value={review.position}
                                  onChange={(e) => updateReview(review.id, { position: e.target.value })}
                                  className="h-8 mt-2"
                                />
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => deleteReview(review.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => moveReview(review.id, -1)}>
                                <ArrowUp className="h-4 w-4 mr-2" />
                                Выше
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => moveReview(review.id, 1)}>
                                <ArrowDown className="h-4 w-4 mr-2" />
                                Ниже
                              </Button>
                            </div>

                            <div className="grid gap-2 md:grid-cols-2">
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground break-all">{review.audioUrl}</p>
                                <input
                                  type="file"
                                  accept="audio/mpeg,audio/mp3,audio/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0]
                                    if (f) replaceReviewMedia(review.id, "audio", f)
                                    if (e.target) e.target.value = ""
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}
                                  disabled={isUploading}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Заменить аудио
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground break-all">{review.avatarUrl ?? "avatar: —"}</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0]
                                    if (f) replaceReviewMedia(review.id, "avatar", f)
                                    if (e.target) e.target.value = ""
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}
                                  disabled={isUploading}
                                >
                                  <ImageIcon className="h-4 w-4 mr-2" />
                                  Заменить аватар
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">После изменений нажмите “Сохранить” сверху.</p>
                  </div>
                )}

                {activeTab === "rates" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={addVacancy}>
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить должность
                      </Button>
                    </div>

                    {(content.vacancies ?? []).length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">Нет должностей</p>
                    ) : (
                      (content.vacancies ?? []).map((v) => (
                        <div key={v.id} className="p-3 bg-muted rounded-lg space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={v.active}
                                onChange={(e) => updateVacancy(v.id, { active: e.target.checked })}
                              />
                              <span className="text-sm text-muted-foreground">Активна</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => moveVacancy(v.id, -1)}>
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => moveVacancy(v.id, 1)}>
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteVacancy(v.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="space-y-2">
                              <Input value={v.title} onChange={(e) => updateVacancy(v.id, { title: e.target.value })} placeholder="Должность" />
                              <Input value={v.gender} onChange={(e) => updateVacancy(v.id, { gender: e.target.value })} placeholder="М/Ж" />
                              <Input
                                type="number"
                                value={v.rate}
                                onChange={(e) => updateVacancy(v.id, { rate: parseInt(e.target.value) || 0 })}
                                placeholder="Ставка"
                              />
                            </div>
                            <div className="space-y-2">
                              <Input value={v.image} onChange={(e) => updateVacancy(v.id, { image: e.target.value })} placeholder="URL картинки" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0]
                                  if (!f) return
                                  setIsUploading(true)
                                  setError("")
                                  uploadMedia(f)
                                    .then(({ url }) => updateVacancy(v.id, { image: url }))
                                    .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
                                    .finally(() => setIsUploading(false))
                                  e.target.value = ""
                                }}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={(e) => (e.currentTarget.previousSibling as HTMLInputElement | null)?.click()}
                                disabled={isUploading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Загрузить картинку
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    <p className="text-xs text-muted-foreground">После изменений нажмите “Сохранить” сверху.</p>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-3">
                    {(content.faqs ?? []).map((faq, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Вопрос"
                            value={faq.question}
                            onChange={(e) => updateFaq(index, "question", e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => deleteFaq(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <Textarea placeholder="Ответ" value={faq.answer} onChange={(e) => updateFaq(index, "answer", e.target.value)} rows={2} />
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={addFaq}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить вопрос
                    </Button>
                    <p className="text-xs text-muted-foreground">После изменений нажмите “Сохранить” сверху.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export function useVacancyRates() {
  const [rates, setRates] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchSiteContent()
      .then((c) => setRates(c.vacancyRates ?? {}))
      .catch(() => setRates({}))
  }, [])

  return rates
}
