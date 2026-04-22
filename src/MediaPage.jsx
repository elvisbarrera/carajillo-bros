import { useEffect, useRef, useState } from 'react'
import { useLang } from './LangContext.jsx'

function CameraIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
    </svg>
  )
}

function PackageCard({ 
  title, 
  description, 
  price, 
  details, 
  isPopular = false,
  badgeText = ''
}) {
  return (
    <article className={`
      relative bg-white border rounded-2xl overflow-hidden
      transition-all duration-300 card-shadow
      ${isPopular ? 'border-beige-dark shadow-[0_8px_30px_rgba(203,166,119,0.15)]' : 'border-neutral-100'}
    `}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-neutral-900 text-beige text-[10px] font-mono font-bold tracking-[0.2em] px-4 py-1.5 uppercase rounded-bl-xl z-10">
          {badgeText || 'Popular'}
        </div>
      )}

      {/* Top accent line */}
      <div className={`h-1 w-full bg-gradient-to-r ${isPopular ? 'from-beige-dark via-beige to-beige-dark' : 'from-stone-300 via-beige-light to-stone-300'}`} />

      <div className="p-6 sm:p-8">
        <h3 className="font-display font-bold text-2xl text-neutral-900 mb-2">{title}</h3>
        <p className="font-body text-sm text-neutral-500 italic mb-6 min-h-[40px]">{description}</p>
        
        <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-neutral-100">
          <span className="font-mono text-sm text-beige-dark font-medium">$</span>
          <span className="font-display font-bold text-4xl text-neutral-900">{price}</span>
          <span className="font-mono text-xs text-neutral-400 font-medium tracking-wider">USD</span>
        </div>

        <ul className="space-y-4">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-beige-dark mt-0.5 shrink-0">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                </svg>
              </span>
              <span className="font-body text-sm sm:text-base text-neutral-700">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function MediaPage({ setPage }) {
  const { t } = useLang()
  const [capturedImages, setCapturedImages] = useState([])
  const [showWebcam, setShowWebcam] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      // Cleanup camera on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // We no longer need the useEffect because we will use a callback ref directly on the video
  const startCamera = async () => {
    setCapturedImages([]) // Reset for a new session
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Localhost secure context error: navigator.mediaDevices no está disponible.")
      }

      let stream;
      try {
        // Try requesting front camera (iPhone/Mobile preference)
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      } catch(e) {
        // Fallback for Desktop/Mac if 'user' isn't recognized or available
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
      }

      streamRef.current = stream
      setShowWebcam(true)
    } catch (err) {
      console.warn("Camera failed:", err)
      alert("Error de cámara: " + err.message + "\n\nAsegúrate de haber dado permisos y estar en localhost.")
      const fallbackInput = document.getElementById('cameraCapture')
      if (fallbackInput) fallbackInput.click()
    }
  }

  const takePhoto = () => {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    // Draw the reflected video so it resembles the preview
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

    setCapturedImages(prev => {
      const newArr = [...prev, dataUrl]
      if (newArr.length >= 3) stopCamera()
      return newArr
    })
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    streamRef.current = null
    setShowWebcam(false)
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3)
    if (files.length > 0) {
      const urls = files.map(f => URL.createObjectURL(f))
      setCapturedImages(urls)
    }
  }

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Hidden file input to trigger native camera */}
      <input 
        id="cameraCapture"
        type="file" 
        accept="image/*" 
        capture="user" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      {/* Hero Section */}
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

          <div className="flex flex-col items-center mb-8 relative">
            <button 
              type="button"
              onClick={startCamera}
              className="relative inline-flex items-center justify-center p-4 rounded-full bg-neutral-900 border border-[#cba677]/30 text-[#cba677] hover:scale-110 active:scale-95 transition-all cursor-pointer group shadow-[0_0_20px_rgba(203,166,119,0.1)]"
              aria-label="Take a selfie"
            >
               {/* Pulsing ring for attention */}
               <span className="absolute inset-0 rounded-full border border-[#cba677] animate-ping opacity-20 duration-1000"></span>
               <CameraIcon className="w-8 h-8 pointer-events-none" />
            </button>
            <span className="mt-3 font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase flex items-center gap-1.5 animate-pulse">
               {t.nav.menu === 'Menu' ? 'TAP HERE TO START' : 'TOCA AQUÍ PARA INICIAR'}
            </span>
          </div>

          <p className="font-mono text-[10px] tracking-[0.3em] text-[#cba677] uppercase mb-4">
            {t.media.heroOverline}
          </p>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            {t.media.heroHeadline1}<br/>
            <span className="text-[#cba677] italic font-light">{t.media.heroHeadline2}</span>
          </h1>

          <p className="font-body text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
            {t.media.heroTagline}
          </p>
        </div>
        
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#cba677] to-transparent" />
      </div>

      {/* Photobooth Strip Frame */}
      {!showWebcam && capturedImages.length > 0 && (
        <div className="px-6 pt-12 pb-4 max-w-sm mx-auto animate-fade-up">
          <div className="bg-white p-3 pb-8 rounded shadow-[0_10px_40px_rgba(0,0,0,0.15)] -rotate-2 transform hover:rotate-0 transition-transform duration-500 max-w-[280px] mx-auto flex flex-col gap-3">
            {capturedImages.map((src, i) => (
              <img 
                key={i}
                src={src} 
                alt={`Photo ${i+1}`} 
                className="w-full aspect-[4/3] object-cover bg-neutral-100 rounded-sm" 
              />
            ))}
            <div className="mt-4 flex flex-col items-center">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#cba677] uppercase mb-1">Tu Evento</span>
              <p className="font-display font-medium text-center text-2xl text-neutral-900" style={{ fontFamily: '"Cormorant", serif' }}>
                Carajillo Bros
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WebRTC Camera Modal Overlay */}
      {showWebcam && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex flex-col items-center justify-center animate-fade-in touch-none">
          <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
            <div className="bg-black/60 backdrop-blur text-white px-4 py-1.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase">
              Foto {capturedImages.length + 1} de 3
            </div>
          </div>
          <video 
            ref={(el) => {
              videoRef.current = el
              if (el && streamRef.current && el.srcObject !== streamRef.current) {
                el.srcObject = streamRef.current
                el.play().catch(() => {})
              }
            }}
            playsInline 
            autoPlay 
            muted
            className="w-full h-full max-w-md object-cover rounded-xl mt-safe bg-neutral-900 border border-neutral-800"
            style={{ transform: "scaleX(-1)" }} 
          />
          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-6 px-6">
            <button onClick={stopCamera} className="text-white hover:text-neutral-300 font-mono text-[10px] tracking-widest uppercase transition-colors">
              Cancelar
            </button>
            <button onClick={takePhoto} className="w-16 h-16 rounded-full border-4 border-white/50 relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
               <span className="w-12 h-12 bg-white rounded-full"></span>
            </button>
            {capturedImages.length > 0 ? (
              <button onClick={stopCamera} className="w-16 h-16 rounded-full border-4 border-[#cba677] relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform bg-neutral-900 shadow-xl">
                 <span className="font-mono text-[9px] tracking-widest uppercase text-[#cba677] font-bold">Listos</span>
              </button>
            ) : (
              <div className="w-16"></div>
            )}
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <main className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          <PackageCard 
            title={t.media.tier1Name}
            description={t.media.tier1Desc}
            price={t.media.tier1Price}
            details={t.media.tier1Details}
          />

          <PackageCard 
            title={t.media.tier2Name}
            description={t.media.tier2Desc}
            price={t.media.tier2Price}
            details={t.media.tier2Details}
          />

          <PackageCard 
            title={t.media.tier3Name}
            description={t.media.tier3Desc}
            price={t.media.tier3Price}
            details={t.media.tier3Details}
            isPopular={true}
            badgeText="MOST POPULAR"
          />

          <PackageCard 
            title={t.media.tier4Name}
            description={t.media.tier4Desc}
            price={t.media.tier4Price}
            details={t.media.tier4Details}
          />

        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-stone-50 rounded-3xl p-8 sm:p-12 border border-neutral-100">
          <h3 className="font-display font-bold text-2xl text-neutral-900 mb-3">
            {t.media.ctaTitle}
          </h3>
          <p className="font-body text-neutral-600 mb-8 max-w-sm mx-auto">
            {t.media.ctaDetail}
          </p>
          <button 
            onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="bg-neutral-900 hover:bg-black text-white font-mono text-[11px] font-bold tracking-widest uppercase px-8 py-4 rounded-xl transition-all hover:shadow-lg active:scale-95"
          >
            {t.media.ctaBtn}
          </button>
        </div>
      </main>
    </div>
  )
}
