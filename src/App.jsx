import { useState, useEffect, useRef } from 'react'
import ContactPage from './ContactPage.jsx'
import PackagesPage from './PackagesPage.jsx'
import MediaPage from './MediaPage.jsx'
import { LangProvider, useLang } from './LangContext.jsx'

// ─── Data ────────────────────────────────────────────────────────────────────

const CARAJILLOS = [
  {
    id: 1,
    name: 'CARAJILLO CLÁSICO',
    tagline: 'El original. El legendario.',
    badge: 'SIGNATURE',
    badgeColor: 'bg-neutral-900 text-beige',
    icon: '☕',
    accentLine: 'from-beige-dark via-beige to-beige-dark',
  },
  {
    id: 2,
    name: 'CARAJILLO CLOUD',
    tagline: 'Suave. Cremoso. Adictivo.',
    description: 'El Licor 43 encuentra al RumChata en una unión que produce un carajillo con textura aterciopelada y notas de canela y vainilla.',
    badge: 'CREMOSO',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '☁️',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
  {
    id: 3,
    name: 'MEXICAN CARAJILLO',
    tagline: 'Pura identidad mexicana.',
    description: 'Donde el sabor de México se funde con la elegancia española. El mazapán triturado añade una textura única e irresistible.',
    badge: 'ESTRELLA',
    badgeColor: 'bg-neutral-900 text-beige',
    icon: '🌵',
    accentLine: 'from-beige-dark via-beige to-beige-dark',
  },
  {
    id: 4,
    name: 'CARAJILLO CLOVER',
    tagline: 'Fortuna en cada sorbo.',
    description: 'La riqueza irlandesa del Baileys se une al Licor 43 y a un espresso intenso. Equilibrio perfecto entre lo dulce y lo fuerte.',
    badge: 'FAVORITO',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '🍀',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
]

const COCKTAILS = [
  {
    id: 1,
    name: 'CARAJILLO ESPRESSO MARTINI',
    tagline: 'El carajillo que se viste de gala.',
    description: 'Una evolución del clásico. La fuerza del vodka se mezcla con el dulzor distintivo del Licor 43 y un espresso intenso.',
    badge: 'ESPECIAL',
    badgeColor: 'bg-neutral-900 text-beige',
    icon: '🍸',
    accentLine: 'from-beige-dark via-beige to-beige-dark',
  },
  {
    id: 2,
    name: 'SPICY MANGO MARGARITA',
    tagline: 'Dulce, picante e irresistible.',
    description: 'Un viaje audaz. Puré de mango natural resaltado con toques de chile, tequila blanco vibrante y un aro de Tajín.',
    badge: 'PICANTE',
    badgeColor: 'bg-neutral-900 text-beige',
    icon: '🥭',
    accentLine: 'from-beige-dark via-beige to-beige-dark',
  },
  {
    id: 3,
    name: 'PINEAPPLE COCONUT MOJITO',
    tagline: 'Un trago tropical de otro nivel.',
    description: 'Paraíso en tu copa. Ron caribeño, hojas frescas de menta machacada y el balance exótico entre la piña y la crema de coco.',
    badge: 'TROPICAL',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '🍍',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
  {
    id: 4,
    name: 'CUCUMBER GIN SPRITZ',
    tagline: 'Fresco, herbal y elegante.',
    description: 'Sumamente refrescante. Ginebra botánica potenciada con limones frescos y pepino machacado, terminada con agua mineral.',
    badge: 'REFRESCANTE',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '🥒',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
  {
    id: 5,
    name: 'PALOMA',
    tagline: 'Verano en cada sorbo.',
    description: 'El sabor brillante del verano. Tequila blanco combinado con jugo fresco de sandía y la tradicional efervescencia de toronja.',
    badge: 'VERANO',
    badgeColor: 'bg-neutral-900 text-beige',
    icon: '🕊️',
    accentLine: 'from-beige-dark via-beige to-beige-dark',
  },
  {
    id: 6,
    name: 'CLASSIC MARGARITA',
    tagline: 'La clásica que nunca falla.',
    description: 'Nuestra receta maestra. Tequila de agave azul, la acidez perfecta del jugo de limón fresco y el sutil dulzor del licor de naranja.',
    badge: 'CLÁSICO',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '🍋',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
  {
    id: 7,
    name: 'MOJITO TRADICIONAL',
    tagline: 'La frescura de siempre.',
    description: 'Un clásico cubano atemporal. Ron envuelto en aromas de menta recién machacada, equilibrado con limón y un final refrescante.',
    badge: 'CLÁSICO',
    badgeColor: 'bg-stone-200 text-neutral-800',
    icon: '🌿',
    accentLine: 'from-stone-300 via-beige-light to-stone-300',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-flicker">
      <path d="M12 2C9 7 6 9 6 13a6 6 0 0012 0c0-4-3-6-6-11zm0 16a4 4 0 01-4-4c0-2.5 2-4 4-7 2 3 4 4.5 4 7a4 4 0 01-4 4z"/>
    </svg>
  )
}

function CoffeeBeanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-30 12 12)"/>
      <path d="M8.5 10.5 Q12 12 15.5 13.5" strokeLinecap="round"/>
    </svg>
  )
}

function Divider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-beige-dark to-transparent opacity-60" />
      <CoffeeBeanIcon />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-beige-dark to-transparent opacity-60" />
    </div>
  )
}

function DrinkCard({ drink, index }) {
  const { t } = useLang()
  const [visible, setVisible]   = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={cardRef}
      style={{ transitionDelay: visible ? '0ms' : '0ms' }}
      className={`
        relative bg-white border border-neutral-100 rounded-2xl overflow-hidden
        transition-all duration-500 ease-out card-shadow
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}
      `}
    >
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(232,213,183,0.06) 50%, transparent 60%)' }}
      />

      {/* Top accent line — animates width on visible */}
      <div className={`h-[3px] bg-gradient-to-r ${drink.accentLine} origin-left transition-transform duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`} />

      <div className="p-6 sm:p-8">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            {/* Badge — pops in after card */}
            <span
              className={`inline-block text-[10px] font-mono font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-3 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${drink.badgeColor}`}
              style={{ transitionDelay: visible ? '150ms' : '0ms' }}
            >
              {drink.badge}
            </span>

            <h2
              className={`font-display font-bold text-xl sm:text-2xl text-neutral-900 leading-tight mb-1.5 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: visible ? '200ms' : '0ms' }}
            >
              {drink.name}
            </h2>

            <p
              className={`font-body text-sm text-neutral-400 italic font-light transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: visible ? '250ms' : '0ms' }}
            >
              {drink.tagline}
            </p>
          </div>

          {/* Icon */}
          <div
            className={`flex flex-col items-end gap-1 shrink-0 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            style={{ transitionDelay: visible ? '180ms' : '0ms' }}
          >
            <span className="text-3xl leading-none">{drink.icon}</span>
            <span className="font-mono text-xs text-beige-dark font-bold tracking-widest">
              0{drink.id}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`flex items-center gap-3 mt-5 mb-4 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: visible ? '300ms' : '0ms' }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-beige-dark to-transparent opacity-60" />
          <CoffeeBeanIcon />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-beige-dark to-transparent opacity-60" />
        </div>

        {/* Short Description */}
        {drink.description && (
          <p
            className={`font-body text-sm sm:text-base text-neutral-600 leading-relaxed italic text-center transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: visible ? '350ms' : '0ms' }}
          >
            {drink.description}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-beige/60 to-transparent" />
    </article>
  )
}

function LangToggle() {
  const { t, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="
        absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50
        flex items-center gap-1.5
        bg-white/5 hover:bg-white/10 active:scale-95
        border border-white/10 hover:border-beige-dark/40
        text-beige-dark hover:text-beige
        font-mono text-[10px] tracking-[0.2em] uppercase
        px-3 py-1.5 rounded-full
        transition-all duration-200
      "
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-70">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
      </svg>
      {t.langSwitch}
    </button>
  )
}

function Header() {
  const { t } = useLang()
  return (
    <header className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />
      <div className="h-0.5 bg-gradient-to-r from-transparent via-beige-dark to-transparent" />

      <div className="relative px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-14 text-center max-w-2xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.35em] text-beige-dark uppercase mb-6 animate-fade-up">
          {t.header.overline}
        </p>

        <div className="animate-fade-up flex justify-center mb-4" style={{ animationDelay: '0.1s' }}>
          <img
            src="/img/logo.png"
            alt="Carajillo Bros"
            className="w-56 sm:w-72 object-contain"
          />
        </div>

        <p
          className="font-body text-sm sm:text-base text-neutral-400 font-light tracking-wide mt-2 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t.header.tagline}
        </p>

        <div className="flex items-center justify-center gap-3 mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="h-px w-12 bg-beige-dark opacity-50" />
          <span className="text-beige-dark opacity-70 text-lg">✦</span>
          <div className="h-px w-12 bg-beige-dark opacity-50" />
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-beige-dark to-transparent" />
    </header>
  )
}

function SectionHeading({ overline, title, subtitle }) {
  return (
    <div className="text-center px-6 pt-12 pb-2">
      <p className="font-mono text-[10px] tracking-[0.3em] text-beige-dark uppercase mb-3">
        {overline}
      </p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-sm text-neutral-400 mt-2 font-light">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-neutral-900 mt-16 relative overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-beige-dark to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" aria-hidden="true" />
      <div className="relative px-6 py-10 text-center max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-beige-dark opacity-40" />
          <span className="text-beige-dark opacity-60">✦</span>
          <div className="h-px w-10 bg-beige-dark opacity-40" />
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-beige-dark uppercase mb-2">
          Carajillo Bros
        </p>
        <p className="font-body text-xs text-neutral-500 font-light leading-relaxed">
          {t.footer.tagline}
        </p>
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <p className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
            {t.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstallBanner() {
  const { t } = useLang()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-neutral-900 border border-beige/30 rounded-2xl p-4 card-shadow-hover flex items-center gap-4">
        <span className="text-2xl shrink-0">☕</span>
        <div className="flex-1 min-w-0">
          <p className="font-body text-xs font-semibold text-white leading-snug">{t.install.title}</p>
          <p className="font-body text-[10px] text-neutral-400 mt-0.5">{t.install.subtitle}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setVisible(false)} className="text-neutral-500 hover:text-neutral-300 transition-colors p-1" aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
            </svg>
          </button>
          <button onClick={handleInstall} className="bg-beige hover:bg-beige-dark text-neutral-900 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg transition-colors">
            {t.install.button}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Bottom Nav ──────────────────────────────────────────────────────────────

function BottomNav({ page, setPage }) {
  const { t } = useLang()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-neutral-800">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">

        <button
          onClick={() => { setPage('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex flex-col items-center gap-1.5 py-2 relative"
          aria-label={t.nav.menu}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
            stroke={page === 'menu' ? '#E8D5B7' : '#6b7280'}
            className="w-5 h-5 transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>
          </svg>
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${page === 'menu' ? 'text-beige-dark' : 'text-neutral-500'}`}>
            {t.nav.menu}
          </span>
          {page === 'menu' && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-beige-dark" />}
        </button>

        <button
          onClick={() => { setPage('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex flex-col items-center gap-1.5 py-2 relative"
          aria-label={t.nav.packages}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
            stroke={page === 'packages' ? '#E8D5B7' : '#6b7280'}
            className="w-5 h-5 transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
          </svg>
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${page === 'packages' ? 'text-beige-dark' : 'text-neutral-500'}`}>
            {t.nav.packages}
          </span>
          {page === 'packages' && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-beige-dark" />}
        </button>

        <button
          onClick={() => { setPage('media'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex flex-col items-center gap-1.5 py-2 relative"
          aria-label={t.nav.media}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
            stroke={page === 'media' ? '#E8D5B7' : '#6b7280'}
            className="w-5 h-5 transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
          </svg>
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${page === 'media' ? 'text-beige-dark' : 'text-neutral-500'}`}>
            {t.nav.media}
          </span>
          {page === 'media' && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-beige-dark" />}
        </button>

        <button
          onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex flex-col items-center gap-1.5 py-2 relative"
          aria-label={t.nav.contact}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
            stroke={page === 'contact' ? '#E8D5B7' : '#6b7280'}
            className="w-5 h-5 transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${page === 'contact' ? 'text-beige-dark' : 'text-neutral-500'}`}>
            {t.nav.contact}
          </span>
          {page === 'contact' && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-beige-dark" />}
        </button>

      </div>
    </nav>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

function AppInner() {
  const { t } = useLang()
  const [page, setPage] = useState('menu')

  const carajillos = CARAJILLOS.map((d, i) => ({ ...d, ...t.carajillos[i] }))
  const cocktails  = COCKTAILS.map((d, i)  => ({ ...d, ...t.cocktails[i] }))

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      <LangToggle />

      {page === 'menu' && (
        <>
          <Header />
          <main className="max-w-2xl mx-auto">
            <SectionHeading
              overline={t.sections.carajillos.overline}
              title={t.sections.carajillos.title}
              subtitle={t.sections.carajillos.subtitle}
            />
            <Divider className="px-8 my-8" />
            <div className="px-4 sm:px-6 pb-4 grid grid-cols-1 gap-5 sm:gap-6">
              {carajillos.map((drink, idx) => (
                <DrinkCard key={drink.id} drink={drink} index={idx} />
              ))}
            </div>
            <div className="px-6 py-8 text-center">
              <p className="font-mono text-[10px] tracking-[0.25em] text-beige-dark uppercase">
                {t.sections.carajillos.note}
              </p>
            </div>

            <div className="mx-4 sm:mx-6 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

            <SectionHeading
              overline={t.sections.cocktails.overline}
              title={t.sections.cocktails.title}
              subtitle={t.sections.cocktails.subtitle}
            />
            <Divider className="px-8 my-8" />
            <div className="px-4 sm:px-6 pb-4 grid grid-cols-1 gap-5 sm:gap-6">
              {cocktails.map((drink, idx) => (
                <DrinkCard key={drink.id} drink={drink} index={idx + CARAJILLOS.length} />
              ))}
            </div>
            <div className="px-6 py-8 text-center">
              <p className="font-mono text-[10px] tracking-[0.25em] text-beige-dark uppercase">
                {t.sections.cocktails.note}
              </p>
            </div>
          </main>
          <Footer />
        </>
      )}

      {page === 'packages' && <PackagesPage setPage={setPage} />}
      {page === 'media' && <MediaPage setPage={setPage} />}
      {page === 'contact' && <ContactPage />}

      <BottomNav page={page} setPage={setPage} />
      <InstallBanner />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
