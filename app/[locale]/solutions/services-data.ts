import {
  Bot,
  Code,
  Globe,
  Cloud,
  Workflow,
  Sparkles,
  GraduationCap,
  Lightbulb,
  Megaphone,
  type LucideIcon,
} from "lucide-react"

export type ServiceKey =
  | "chatbots"
  | "customSoftware"
  | "websites"
  | "saas"
  | "automation"
  | "aiContent"
  | "elearning"
  | "consulting"
  | "socialMedia"

export type ServiceDef = {
  slug: string
  key: ServiceKey
  icon: LucideIcon
  color: string
  borderColor: string
}

/**
 * Sursa unica pentru cele 9 servicii — folosita de hub-ul /solutions,
 * de ruta dinamica /solutions/[service] si de sitemap.ts. Slug-urile sunt
 * identice in toate limbile (ca la articolele de blog) — doar continutul
 * (din locales/{ro,en,ru}.ts, cheia `key`) difera pe limba.
 */
export const SERVICES: ServiceDef[] = [
  {
    slug: "chatbot-ai",
    key: "chatbots",
    icon: Bot,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    slug: "software-personalizat",
    key: "customSoftware",
    icon: Code,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
  },
  {
    slug: "website-uri",
    key: "websites",
    icon: Globe,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    slug: "platforme-saas",
    key: "saas",
    icon: Cloud,
    color: "from-sky-500/20 to-blue-500/20",
    borderColor: "border-sky-500/30",
  },
  {
    slug: "automatizari-business",
    key: "automation",
    icon: Workflow,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    slug: "continut-ai-dublaj-avatare",
    key: "aiContent",
    icon: Sparkles,
    color: "from-fuchsia-500/20 to-rose-500/20",
    borderColor: "border-fuchsia-500/30",
  },
  {
    slug: "elearning",
    key: "elearning",
    icon: GraduationCap,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
  },
  {
    slug: "consultanta-digitala",
    key: "consulting",
    icon: Lightbulb,
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    slug: "automatizare-social-media",
    key: "socialMedia",
    icon: Megaphone,
    color: "from-pink-500/20 to-orange-500/20",
    borderColor: "border-pink-500/30",
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
