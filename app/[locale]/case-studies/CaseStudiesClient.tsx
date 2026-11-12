"use client"

import { Bot, CheckCircle2, Clock, Image as ImageIcon, RefreshCw, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LocaleLink as Link } from "@/components/ui/locale-link"
import { Reveal } from "@/components/ui/reveal"
import { useLocale } from "@/contexts/locale-context"

const TEXT = {
  ro: {
    eyebrow: "Caz de studiu",
    title: "Cum arată, de fapt, propriile noastre pagini de Facebook și Instagram",
    subtitle:
      "Nu e un studiu cu un client extern — e sistemul pe care îl rulăm chiar noi, zilnic, de la finalul lunii septembrie 2026. Îl arătăm exact așa cum e, inclusiv partea unde s-a stricat și a trebuit reparată.",
    proofNote:
      "Poți verifica tot ce scriem aici direct pe paginile publice — nu sunt capturi editate.",
    fbLabel: "Pagina de Facebook",
    igLabel: "Pagina de Instagram",

    problemTitle: "Problema de la care am pornit",
    problemText:
      "O afacere mică nu are timp să scrie zilnic postări, să caute idei, să creeze o imagine potrivită și să publice la ora corectă, de 3 ori pe săptămână, constant. De obicei se termină cu o pagină abandonată după 2-3 postări.",

    whatTitle: "Ce am construit",
    whatText:
      "Un agent AI care rulează automat luni, miercuri și vineri dimineața: caută ce e relevant acum în domeniul AI/digitalizare, scrie o postare în română (variind tipul de conținut — sfat practic, curiozitate, scenariu, întrebare, mit demontat, checklist), generează o imagine potrivită temei și publică direct pe Facebook și Instagram. 20 de minute mai târziu, adaugă singur un comentariu de follow-up diferit de fiecare dată.",

    feature1: "Conținut variat, nu șablon repetat — 6 tipuri de postări care alternează automat",
    feature2: "Imagine generată de AI pentru fiecare postare, pe o temă diferită de ultimele 2-3",
    feature3: "Publicare automată pe Facebook și Instagram, fără pași manuali",
    feature4: "Comentariu de follow-up adăugat automat la ~20 de minute, cu text diferit de fiecare dată",

    realityTitle: "Partea reală: ce s-a stricat și cum am reparat-o",
    realityText:
      "La un moment dat, contul folosit pentru generarea imaginilor a rămas fără credit și postările au început să iasă fără imagine pe Facebook. Soluția nu a fost să adăugăm pur și simplu mai mult credit — am construit un sistem cu rezervă automată: dacă furnizorul principal eșuează, sistemul trece singur pe un al doilea furnizor, fără nicio intervenție manuală. De atunci, rata de reușită e 100%.",

    honestTitle: "Ce NU pretindem",
    honestText:
      "Nu spunem că această pagină are mii de urmăritori sau că automatizarea singură aduce clienți peste noapte — asta ține de promovare, de buget, de audiență, nu doar de a publica constant. Ce arătăm aici e partea tehnică: un sistem care publică fiabil, constant, cu conținut variat și relevant, fără să ceară timp zilnic de la nimeni.",

    nextTitle: "Ce urmează",
    nextText:
      "Lucrăm la extinderea sistemului cu conținut video generat/dublat cu AI, publicat tot automat — următorul pas pentru aceleași pagini.",

    faqTitle: "Întrebări directe",
    faq1q: "Cine scrie textele postărilor?",
    faq1a: "Un agent AI, configurat de noi cu reguli clare: fără cifre inventate, fără testimoniale false, fără pretenții pe care nu le putem demonstra dacă cineva întreabă.",
    faq2q: "Ce se întâmplă dacă generarea imaginii eșuează?",
    faq2a: "Sistemul trece automat pe un al doilea furnizor de generare imagini, fără intervenție manuală. Din octombrie 2026, nicio postare nu a mai ieșit fără imagine.",
    faq3q: "Pot avea și eu acest sistem pentru afacerea mea?",
    faq3a: "Da — e exact serviciul descris la „Automatizare postări Facebook & Instagram cu AI”, de la 150 €/lună.",

    ctaTitle: "Vrei același sistem pentru paginile tale?",
    ctaButton: "Vezi serviciul de automatizare social media",
  },
  en: {
    eyebrow: "Case study",
    title: "What our own Facebook and Instagram pages actually look like",
    subtitle:
      "This isn't a study about an external client — it's the system we run ourselves, daily, since late September 2026. We're showing it exactly as it is, including the part where it broke and had to be fixed.",
    proofNote:
      "You can verify everything here directly on the public pages — these aren't edited screenshots.",
    fbLabel: "Facebook page",
    igLabel: "Instagram page",

    problemTitle: "The problem we started with",
    problemText:
      "A small business doesn't have time to write posts daily, find ideas, create a matching image and publish at the right time, 3 times a week, consistently. It usually ends with an abandoned page after 2-3 posts.",

    whatTitle: "What we built",
    whatText:
      "An AI agent that runs automatically on Monday, Wednesday and Friday mornings: checks what's currently relevant in AI/digitalization, writes a post in Romanian (varying content type — practical tip, curiosity, scenario, question, myth-busting, checklist), generates a matching image and publishes directly to Facebook and Instagram. 20 minutes later, it adds a different follow-up comment each time.",

    feature1: "Varied content, not a repeated template — 6 post types that rotate automatically",
    feature2: "AI-generated image for each post, on a different theme than the last 2-3",
    feature3: "Automatic publishing to Facebook and Instagram, no manual steps",
    feature4: "Follow-up comment added automatically after ~20 minutes, different text every time",

    realityTitle: "The real part: what broke and how we fixed it",
    realityText:
      "At one point, the account used for image generation ran out of credit and posts started going out without an image on Facebook. The fix wasn't simply adding more credit — we built an automatic fallback: if the primary provider fails, the system switches on its own to a second provider, with no manual intervention. Since then, the success rate has been 100%.",

    honestTitle: "What we're NOT claiming",
    honestText:
      "We're not saying this page has thousands of followers or that automation alone brings customers overnight — that depends on promotion, budget and audience, not just posting consistently. What we're showing here is the technical part: a system that publishes reliably, consistently, with varied and relevant content, without requiring daily time from anyone.",

    nextTitle: "What's next",
    nextText:
      "We're extending the system with AI-generated/dubbed video content, also published automatically — the next step for the same pages.",

    faqTitle: "Direct questions",
    faq1q: "Who writes the post text?",
    faq1a: "An AI agent, configured by us with clear rules: no invented numbers, no fake testimonials, no claims we couldn't back up if someone asked.",
    faq2q: "What happens if image generation fails?",
    faq2a: "The system automatically switches to a second image-generation provider, with no manual intervention. Since October 2026, no post has gone out without an image.",
    faq3q: "Can I get this system for my own business?",
    faq3a: "Yes — it's exactly the service described under \"AI Facebook & Instagram post automation\", starting from €150/month.",

    ctaTitle: "Want the same system for your pages?",
    ctaButton: "See the social media automation service",
  },
  ru: {
    eyebrow: "Кейс",
    title: "Как на самом деле выглядят наши собственные страницы Facebook и Instagram",
    subtitle:
      "Это не кейс о внешнем клиенте — это система, которую мы сами используем ежедневно с конца сентября 2026 года. Показываем её такой, какая она есть, включая момент, когда она сломалась и её пришлось чинить.",
    proofNote:
      "Всё написанное здесь можно проверить прямо на публичных страницах — это не отредактированные скриншоты.",
    fbLabel: "Страница Facebook",
    igLabel: "Страница Instagram",

    problemTitle: "Проблема, с которой мы начали",
    problemText:
      "У малого бизнеса нет времени ежедневно писать посты, искать идеи, создавать подходящее изображение и публиковать в нужное время, 3 раза в неделю, стабильно. Обычно всё заканчивается заброшенной страницей после 2-3 постов.",

    whatTitle: "Что мы построили",
    whatText:
      "AI-агент, который автоматически запускается по понедельникам, средам и пятницам утром: проверяет, что сейчас актуально в сфере AI/цифровизации, пишет пост на румынском (чередуя тип контента — практический совет, любопытный факт, сценарий, вопрос, разоблачение мифа, чек-лист), генерирует подходящее изображение и публикует напрямую в Facebook и Instagram. Через 20 минут сам добавляет комментарий — каждый раз разный.",

    feature1: "Разнообразный контент, а не повторяющийся шаблон — 6 типов постов, чередующихся автоматически",
    feature2: "AI-изображение для каждого поста, на тему, отличную от последних 2-3",
    feature3: "Автоматическая публикация в Facebook и Instagram, без ручных шагов",
    feature4: "Комментарий добавляется автоматически примерно через 20 минут, текст каждый раз разный",

    realityTitle: "Реальная часть: что сломалось и как мы это починили",
    realityText:
      "В какой-то момент на аккаунте, используемом для генерации изображений, закончился баланс, и посты на Facebook стали выходить без изображения. Решением было не просто пополнить баланс — мы построили систему с автоматическим резервом: если основной провайдер даёт сбой, система сама переключается на второго, без какого-либо вмешательства вручную. С тех пор успешность — 100%.",

    honestTitle: "Чего мы НЕ утверждаем",
    honestText:
      "Мы не говорим, что у этой страницы тысячи подписчиков или что одна автоматизация приносит клиентов за ночь — это зависит от продвижения, бюджета и аудитории, а не только от стабильных публикаций. Здесь мы показываем техническую часть: систему, которая публикует надёжно, стабильно, с разнообразным и релевантным контентом, не требуя ничьего ежедневного времени.",

    nextTitle: "Что дальше",
    nextText:
      "Мы расширяем систему видео-контентом, созданным/дублированным с помощью AI, также публикуемым автоматически — следующий шаг для тех же страниц.",

    faqTitle: "Прямые вопросы",
    faq1q: "Кто пишет тексты постов?",
    faq1a: "AI-агент, настроенный нами с чёткими правилами: никаких выдуманных цифр, никаких фальшивых отзывов, никаких заявлений, которые мы не смогли бы подтвердить, если бы кто-то спросил.",
    faq2q: "Что происходит, если генерация изображения не удаётся?",
    faq2a: "Система автоматически переключается на второго провайдера генерации изображений, без ручного вмешательства. С октября 2026 года ни один пост не вышел без изображения.",
    faq3q: "Можно ли получить такую систему для своего бизнеса?",
    faq3a: "Да — это именно услуга «Автоматизация постов в Facebook и Instagram с AI», от 150 €/месяц.",

    ctaTitle: "Хотите такую же систему для своих страниц?",
    ctaButton: "Посмотреть услугу автоматизации соцсетей",
  },
} as const

const FB_URL = "https://www.facebook.com/tinka.ai"
const IG_URL = "https://www.instagram.com/tinka.ai"

export default function CaseStudiesClient() {
  const { locale } = useLocale() as any
  const t = (TEXT as any)[locale] ?? TEXT.ro

  const features = [t.feature1, t.feature2, t.feature3, t.feature4]
  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="brand-chip-amber">
              {t.eyebrow}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.subtitle}
            </p>
            <p className="text-sm text-muted-foreground italic">{t.proofNote}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href={FB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
              >
                {t.fbLabel} ↗
              </Link>
              <Link
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
              >
                {t.igLabel} ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <Reveal>
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-6 space-y-2">
                <h2 className="font-bold text-foreground text-lg">{t.problemTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.problemText}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <h2 className="font-bold text-foreground text-lg">{t.whatTitle}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.whatText}</p>
                <div className="grid md:grid-cols-2 gap-3 pt-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground leading-snug text-sm">{f}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="bg-amber-500/5 border-amber-500/20">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-6 w-6 text-amber-500" />
                  <h2 className="font-bold text-foreground text-lg">{t.realityTitle}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.realityText}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="bg-card/80 border-border">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-sky-400" />
                  <h2 className="font-bold text-foreground text-lg">{t.honestTitle}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.honestText}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="bg-violet-500/5 border-violet-500/20">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-violet-400" />
                  <h2 className="font-bold text-foreground text-lg">{t.nextTitle}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.nextText}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-foreground">{t.faqTitle}</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-semibold text-foreground">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="pt-8 text-center space-y-3">
              <h2 className="text-2xl font-bold text-foreground">{t.ctaTitle}</h2>
              <Link href="/solutions/automatizare-social-media">
                <span className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-semibold transition-colors">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {t.ctaButton}
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
