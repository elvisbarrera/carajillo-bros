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

function InstagramIcon({className}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}

function FacebookIcon({className}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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

  const [finalImage, setFinalImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Use a callback ref for secure video stream attachment
  const startCamera = async () => {
    setCapturedImages([])
    setFinalImage(null)
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Localhost secure context error: navigator.mediaDevices no está disponible.")
      }
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      } catch(e) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      }
      streamRef.current = stream
      setShowWebcam(true)
    } catch (err) {
      console.warn("Camera failed:", err)
      const fallbackInput = document.getElementById('cameraCapture')
      if (fallbackInput) fallbackInput.click()
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setShowWebcam(false)
  }

  const processMasterImage = async (imageUrl) => {
    setIsProcessing(true)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    const padding = 40
    const imgWidth = 800
    const imgHeight = 600
    const textSpace = 160
    
    canvas.width = imgWidth + (padding * 2)
    canvas.height = imgHeight + (padding * 2) + textSpace

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.src = imageUrl
    await new Promise(r => img.onload = r)
    
    const aspect = img.width / img.height
    let sx = 0, sy = 0, sw = img.width, sh = img.height
    if (aspect > (4/3)) {
      sw = img.height * (4/3)
      sx = (img.width - sw) / 2
    } else {
      sh = img.width * (3/4)
      sy = (img.height - sh) / 2
    }
    
    ctx.drawImage(img, sx, sy, sw, sh, padding, padding, imgWidth, imgHeight)

    const currentY = padding + imgHeight + padding

    ctx.fillStyle = '#cba677'
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('TU EVENTO', canvas.width / 2, currentY + 30)

    ctx.fillStyle = '#171717'
    ctx.font = '70px "Cormorant", serif'
    ctx.fillText('Carajillo Bros', canvas.width / 2, currentY + 110)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setFinalImage(dataUrl)
    setIsProcessing(false)
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(videoRef.current, 0, 0)
      const url = canvas.toDataURL('image/jpeg')
      
      setCapturedImages([url])
      stopCamera()
      processMasterImage(url)
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 1)
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setCapturedImages([url])
      processMasterImage(url)
    }
  }
  const forceDownload = () => {
    if (!finalImage) return
    const a = document.createElement('a')
    a.href = finalImage
    a.download = 'carajillo_bros_photobooth.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const shareToApp = (scheme) => {
    forceDownload()
    setTimeout(() => {
      window.location.href = scheme
    }, 600)
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

      {/* Final Polarid Rendering & Action Buttons */}
      {!showWebcam && (isProcessing || finalImage) && (
        <div className="px-4 py-12 max-w-sm mx-auto animate-fade-up">
          {finalImage ? (
            <div className="flex flex-col items-center">
              <img 
                src={finalImage} 
                alt="Photobooth Polaroid" 
                className="w-full h-auto bg-white rounded shadow-2xl -rotate-2 transform hover:rotate-0 transition-transform duration-500 pointer-events-auto" 
              />
              <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-[#cba677] font-bold animate-pulse">
                Mantén presionado para guardar en Fotos
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <span className="text-[#cba677] font-mono uppercase tracking-widest text-xs animate-pulse">Procesando...</span>
            </div>
          )}

          {/* Social Share Buttons */}
          {finalImage && (
            <div className="flex flex-wrap justify-center gap-3 mt-10 mb-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => shareToApp("fb://")} className="flex items-center gap-2 bg-[#1877F2] text-white px-5 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform text-sm">
                <FacebookIcon className="w-5 h-5"/> Facebook
              </button>
              <button onClick={() => shareToApp("instagram://app")} className="flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-5 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform text-sm">
                <InstagramIcon className="w-5 h-5"/> Instagram
              </button>
              <button onClick={forceDownload} className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-5 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform text-sm">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Descargar
              </button>
            </div>
          )}
        </div>
      )}

      {/* WebRTC Camera Modal Overlay */}
      {showWebcam && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex flex-col items-center justify-center animate-fade-in touch-none">
          <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
            <div className="bg-black/60 backdrop-blur text-white px-4 py-1.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase">
              1 Click Polaroid
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
            <div className="w-16"></div>
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
