import { useLang } from './LangContext.jsx'

function PackageCard({ name, desc, price, details, popular = false }) {
  return (
    <div className={`relative p-6 sm:p-8 bg-white border border-neutral-100 rounded-2xl overflow-hidden card-shadow flex flex-col h-full ${popular ? 'ring-2 ring-[#cba677] ring-offset-[3px] bg-neutral-50/50' : ''}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#cba677] text-white text-[9px] font-mono font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-b-lg shadow-sm">
          Más Popular
        </div>
      )}
      <div className={`mb-4 ${popular ? 'mt-4' : ''}`}>
        <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 mb-1">{name}</h3>
        <p className="font-body text-sm text-neutral-500">{desc}</p>
      </div>
      <div className="mb-6">
        <span className="font-display font-black text-3xl sm:text-4xl text-neutral-900">{price}</span>
        <span className="font-body text-sm text-neutral-400 ml-2 font-semibold">USD</span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#cba677]/40 to-transparent w-full mb-6" />
      <ul className="space-y-3.5 flex-1 pb-2">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#cba677] shrink-0 pt-0.5">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.815a.75.75 0 011.05-.145z" clipRule="evenodd" />
            </svg>
            <span className="font-body text-sm text-neutral-800">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PackagesPage({ setPage }) {
  const { t } = useLang()
  const p = t.packages

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />
        
        {/* Decorative corner ornaments (bottom only to make room for generic safe area & LangToggle) */}
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#cba677]/30" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#cba677]/30" />

        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#cba677] to-transparent" />

        <div className="relative px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-12 text-center max-w-xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/img/logo.png" alt="Carajillo Bros" className="w-40 sm:w-52 object-contain" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#cba677] opacity-40" />
            <span className="text-[#cba677] opacity-50 text-sm">✦</span>
            <div className="h-px w-10 bg-[#cba677] opacity-40" />
          </div>

          {/* Heading */}
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#cba677] uppercase mb-4 animate-fade-up">
            {p.heroOverline}
          </p>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-3">
            {p.heroHeadline1}<br />
            <span className="text-gradient-gold">{p.heroHeadline2}</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
            {p.heroTagline}
          </p>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#cba677] to-transparent" />
      </div>

      {/* Packages Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          <PackageCard 
            name={p.tier1Name} desc={p.tier1Desc} 
            price={p.tier1Price} details={p.tier1Details} 
          />
          <PackageCard 
            name={p.tier2Name} desc={p.tier2Desc} 
            price={p.tier2Price} details={p.tier2Details} 
            popular={true}
          />
          <PackageCard 
            name={p.tier3Name} desc={p.tier3Desc} 
            price={p.tier3Price} details={p.tier3Details} 
          />
          <PackageCard 
            name={p.tier4Name} desc={p.tier4Desc} 
            price={p.tier4Price} details={p.tier4Details} 
          />
        </div>

        {/* CTA */}
        <div className="mt-12 mb-8 bg-white border border-neutral-100 rounded-2xl p-8 text-center card-shadow overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(135deg, transparent 40%, #cba677 50%, transparent 60%)' }} />
          <div className="relative z-10">
            <h3 className="font-display font-bold text-2xl text-neutral-900 mb-2">{p.ctaTitle}</h3>
            <p className="font-body text-sm text-neutral-500 mb-6">{p.ctaDetail}</p>
            <button 
              onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-mono text-[11px] tracking-[0.25em] uppercase px-8 py-4 rounded-xl transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99]"
            >
              {p.ctaBtn}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#cba677]">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
