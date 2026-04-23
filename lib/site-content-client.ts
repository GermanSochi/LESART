export type AudioReview = {
  id: string
  name: string
  position: string
  audioUrl: string
  avatarUrl?: string
}

export type VacancyRates = Record<string, number>

export type Vacancy = {
  id: string
  title: string
  rate: number
  gender: string
  image: string
  active: boolean
}

export type FAQ = {
  question: string
  answer: string
}

export type HeroBackground =
  | { kind: "image"; url: string }
  | { kind: "video"; url: string; posterUrl?: string }

export type SiteContent = {
  version: 1
  updatedAt: string
  media: {
    hotelImages: { src: string; alt: string }[]
    dormitoryImages: { src: string; alt: string }[]
  }
  sections: {
    about: {
      title: string
      text: string
    }
    vacancies: {
      title: string
      subtitle: string
    }
    conditions: {
      title: string
    }
    seoArticle: {
      title: string
      html: string
    }
    voiceReviews: {
      title: string
      subtitle: string
    }
    faq: {
      title: string
    }
    benefits: {
      title: string
    }
    howToGetThere: {
      title: string
      subtitle: string
      car: { title: string; description: string; routeUrl: string; image: string }
      transit: { title: string; description: string; image: string }
    }
    values: {
      title: string
      items: string[]
    }
    standards: {
      title: string
      subtitle: string
      bannerImage: { src: string; alt: string }
    }
    rules: {
      title: string
      subtitle: string
      items: string[]
    }
    cta: {
      title: string
      subtitle: string
    }
    footer: {
      copyright: string
    }
  }
  hero: {
    title: string
    subtitle: string
    background: HeroBackground
  }
  audioReviews: AudioReview[]
  vacancies: Vacancy[]
  vacancyRates: VacancyRates
  faqs: FAQ[]
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const res = await fetch("/api/content", { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to load content: ${res.status}`)
  return (await res.json()) as SiteContent
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const res = await fetch("/api/content", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(content),
  })
  if (!res.ok) throw new Error(`Failed to save content: ${res.status}`)
}

export async function uploadMedia(file: File): Promise<{ url: string }> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch("/api/upload", { method: "POST", body: fd })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
  const json = (await res.json()) as { url?: string }
  if (!json.url) throw new Error("Upload failed: missing url")
  return { url: json.url }
}

