"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Settings, X, Trash2, Upload, Save, Plus, ImageIcon } from "lucide-react"

interface AudioReview {
  id: string
  name: string
  position: string
  audioData: string
  avatar?: string
}

interface FAQ {
  question: string
  answer: string
}

interface VacancyRates {
  [key: string]: number
}

const DEFAULT_RATES: VacancyRates = {
  "Официант": 360,
  "Повар": 380,
  "Су-шеф": 400,
  "Стюард": 340,
  "Горничная": 370,
  "Бармен": 370,
  "Официант банкетный": 420,
  "Грузчик": 360,
}

const DEFAULT_FAQS: FAQ[] = [
  { question: "Есть ли работа с проживанием в загородном отеле под Москвой?", answer: "Да! LES Art Resort находится в 60 км от Москвы." },
  { question: "Сколько реально зарабатывает горничная?", answer: "Горничная получает 370 рублей в час." },
  { question: "Можно ли приехать из другого города России?", answer: "Конечно! К нам приезжают сотрудники со всей России." },
  { question: "Какой график и сколько часов смена?", answer: "Смены по 11 часов и больше." },
  { question: "Нужен ли опыт и медкнижка?", answer: "Медкнижка обязательна для всех без исключений." },
  { question: "Как быстро можно выйти на работу?", answer: "При наличии документов — выход возможен в течение 1-3 дней." },
]

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState<"audio" | "rates" | "faq">("audio")
  const [reviews, setReviews] = useState<AudioReview[]>([])
  const [rates, setRates] = useState<VacancyRates>(DEFAULT_RATES)
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS)
  const [newReviewName, setNewReviewName] = useState("")
  const [newReviewPosition, setNewReviewPosition] = useState("")
  const [newReviewAvatar, setNewReviewAvatar] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedReviews = localStorage.getItem("audioReviews")
    if (savedReviews) setReviews(JSON.parse(savedReviews))
    
    const savedRates = localStorage.getItem("vacancyRates")
    if (savedRates) setRates({ ...DEFAULT_RATES, ...JSON.parse(savedRates) })
    
    const savedFaqs = localStorage.getItem("faqItems")
    if (savedFaqs) setFaqs(JSON.parse(savedFaqs))
  }, [])

  const handleLogin = () => {
    if (login === "admin" && password === "admin1234") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Неверный логин или пароль")
    }
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewReviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && newReviewName && newReviewPosition) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newReview: AudioReview = {
          id: Date.now().toString(),
          name: newReviewName,
          position: newReviewPosition,
          audioData: reader.result as string,
          avatar: newReviewAvatar || undefined,
        }
        const updatedReviews = [...reviews, newReview]
        setReviews(updatedReviews)
        localStorage.setItem("audioReviews", JSON.stringify(updatedReviews))
        window.dispatchEvent(new Event("audioReviewsUpdated"))
        setNewReviewName("")
        setNewReviewPosition("")
        setNewReviewAvatar("")
        if (fileInputRef.current) fileInputRef.current.value = ""
        if (avatarInputRef.current) avatarInputRef.current.value = ""
      }
      reader.readAsDataURL(file)
    }
  }

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter((r) => r.id !== id)
    setReviews(updatedReviews)
    localStorage.setItem("audioReviews", JSON.stringify(updatedReviews))
    window.dispatchEvent(new Event("audioReviewsUpdated"))
  }

  const saveRates = () => {
    localStorage.setItem("vacancyRates", JSON.stringify(rates))
    window.dispatchEvent(new Event("ratesUpdated"))
    alert("Ставки сохранены!")
  }

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const addFaq = () => {
    setFaqs([...faqs, { question: "Новый вопрос", answer: "Ответ" }])
  }

  const deleteFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index)
    setFaqs(updated)
  }

  const saveFaqs = () => {
    localStorage.setItem("faqItems", JSON.stringify(faqs))
    window.dispatchEvent(new Event("faqsUpdated"))
    alert("FAQ сохранены!")
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-muted opacity-30 hover:opacity-100 transition-opacity z-50"
        aria-label="Админ-панель"
      >
        <Settings className="h-5 w-5 text-muted-foreground" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isLoggedIn ? "Админ-панель" : "Вход"}</h2>
          <Button variant="ghost" size="sm" onClick={() => { setIsOpen(false); setIsLoggedIn(false); setLogin(""); setPassword(""); }}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isLoggedIn ? (
          <div className="space-y-4">
            <Input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
            <Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            {loginError && <p className="text-destructive text-sm">{loginError}</p>}
            <Button onClick={handleLogin} className="w-full">Войти</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2 border-b pb-2 overflow-x-auto">
              <Button variant={activeTab === "audio" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("audio")}>Отзывы</Button>
              <Button variant={activeTab === "rates" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("rates")}>Ставки</Button>
              <Button variant={activeTab === "faq" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("faq")}>FAQ</Button>
            </div>

            {activeTab === "audio" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Имя сотрудника" value={newReviewName} onChange={(e) => setNewReviewName(e.target.value)} />
                  <Input placeholder="Должность" value={newReviewPosition} onChange={(e) => setNewReviewPosition(e.target.value)} />
                  
                  <div className="flex gap-2">
                    <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    <Button variant="outline" size="sm" onClick={() => avatarInputRef.current?.click()} className="flex-1">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      {newReviewAvatar ? "Аватар загружен" : "Добавить аватар"}
                    </Button>
                    {newReviewAvatar && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                        <img src={newReviewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  <input ref={fileInputRef} type="file" accept="audio/mp3,audio/*" onChange={handleFileUpload} className="hidden" />
                  <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()} disabled={!newReviewName || !newReviewPosition}>
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить аудио
                  </Button>
                </div>

                <div className="space-y-2">
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">Нет отзывов</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          {review.avatar ? (
                            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-bold">{review.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{review.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{review.position}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => deleteReview(review.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "rates" && (
              <div className="space-y-3">
                {Object.entries(rates).map(([vacancy, rate]) => (
                  <div key={vacancy} className="flex items-center gap-2">
                    <span className="flex-1 text-sm">{vacancy}</span>
                    <Input type="number" value={rate} onChange={(e) => setRates({ ...rates, [vacancy]: parseInt(e.target.value) || 0 })} className="w-24" />
                    <span className="text-sm text-muted-foreground">р/ч</span>
                  </div>
                ))}
                <Button onClick={saveRates} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить ставки
                </Button>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex gap-2">
                      <Input placeholder="Вопрос" value={faq.question} onChange={(e) => updateFaq(index, "question", e.target.value)} className="flex-1" />
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
                <Button onClick={saveFaqs} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить FAQ
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export function useVacancyRates() {
  const [rates, setRates] = useState<VacancyRates>(DEFAULT_RATES)

  useEffect(() => {
    const loadRates = () => {
      const savedRates = localStorage.getItem("vacancyRates")
      if (savedRates) setRates({ ...DEFAULT_RATES, ...JSON.parse(savedRates) })
    }
    loadRates()
    window.addEventListener("ratesUpdated", loadRates)
    return () => window.removeEventListener("ratesUpdated", loadRates)
  }, [])

  return rates
}
