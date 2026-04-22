import { useState } from 'react'
import { useLang } from './LangContext.jsx'

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="group">
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-2">
        {label}{required && <span className="text-beige-dark ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5
          font-body text-sm text-neutral-900 placeholder-neutral-300
          outline-none transition-all duration-200
          focus:border-beige-dark focus:ring-2 focus:ring-beige/30
          hover:border-neutral-300
        "
      />
    </div>
  )
}

function SelectField({ label, id, value, onChange, options, required }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-2">
        {label}{required && <span className="text-beige-dark ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="
            w-full appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-3.5
            font-body text-sm text-neutral-900 outline-none transition-all duration-200
            focus:border-beige-dark focus:ring-2 focus:ring-beige/30
            hover:border-neutral-300 cursor-pointer
          "
        >
          <option value="" disabled>Selecciona una opción</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" fill="currentColor" className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-beige-dark pointer-events-none">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5
          font-body text-sm text-neutral-900 placeholder-neutral-300
          outline-none transition-all duration-200 resize-none
          focus:border-beige-dark focus:ring-2 focus:ring-beige/30
          hover:border-neutral-300
        "
      />
    </div>
  )
}

function SuccessScreen({ onReset, c }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-beige/20 border border-beige-dark flex items-center justify-center mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-beige-dark">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>
      </div>
      <h3 className="font-display font-bold text-2xl text-neutral-900 mb-2">{c.successTitle}</h3>
      <p className="font-body text-sm text-neutral-400 font-light leading-relaxed max-w-xs">{c.successBody}</p>
      <button
        onClick={onReset}
        className="mt-8 font-mono text-[11px] tracking-[0.2em] uppercase text-beige-dark border border-beige-dark/40 px-6 py-2.5 rounded-full hover:bg-beige/10 transition-colors"
      >
        {c.successReset}
      </button>
    </div>
  )
}

export default function ContactPage() {
  const { t } = useLang()
  const c = t.contact

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    eventType: '', eventDate: '', guests: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch("https://formsubmit.co/ajax/carajillobrosllc@outlook.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nombre: form.name,
          Teléfono: form.phone,
          Correo: form.email,
          Tipo_Evento: form.eventType,
          Fecha: form.eventDate,
          Invitados: form.guests,
          Mensaje: form.message,
          _subject: "Nueva solicitud de cotización - Carajillo Bros",
          _template: "table"
        })
      })
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

        {/* Decorative corner ornaments (bottom only to make room for generic safe area & LangToggle) */}
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-beige-dark/30" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-beige-dark/30" />

        <div className="h-0.5 bg-gradient-to-r from-transparent via-beige-dark to-transparent" />

        <div className="relative px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-12 text-center max-w-xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/img/logo.png" alt="Carajillo Bros" className="w-40 sm:w-52 object-contain" />
          </div>

          {/* Divider line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-beige-dark opacity-40" />
            <span className="text-beige-dark opacity-50 text-sm">✦</span>
            <div className="h-px w-10 bg-beige-dark opacity-40" />
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-3">
            {c.heroHeadline1}<br />
            <span className="text-gradient-gold">{c.heroHeadline2}</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
            {c.heroTagline}
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {[
              { icon: '🍸', label: c.badge1 },
              { icon: '🔥', label: c.badge2 },
              { icon: '🎉', label: c.badge3 },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-base">{b.icon}</span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-beige-dark to-transparent" />
      </div>

      {/* ── Form card ── */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">

        {/* Section label */}
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-beige-dark uppercase mb-2">
            {c.formOverline}
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900">
            {c.formTitle}
          </h2>
        </div>

        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden card-shadow">
          <div className="h-0.5 bg-gradient-to-r from-beige-dark via-beige to-beige-dark" />

          {submitted ? (
            <SuccessScreen c={c} onReset={() => { setSubmitted(false); setForm({ name:'', phone:'', email:'', eventType:'', eventDate:'', guests:'', message:'' }) }} />
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">

              <InputField label={c.labelName} id="name" placeholder={c.placeholderName}
                value={form.name} onChange={set('name')} required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label={c.labelPhone} id="phone" type="tel" placeholder={c.placeholderPhone}
                  value={form.phone} onChange={set('phone')} required />
                <InputField label={c.labelEmail} id="email" type="email" placeholder={c.placeholderEmail}
                  value={form.email} onChange={set('email')} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField label={c.labelEventType} id="eventType"
                  value={form.eventType} onChange={set('eventType')}
                  options={c.eventTypes} required />
                <InputField label={c.labelDate} id="eventDate" type="date"
                  value={form.eventDate} onChange={set('eventDate')} required />
              </div>

              <InputField label={c.labelGuests} id="guests" type="number" placeholder={c.placeholderGuests}
                value={form.guests} onChange={set('guests')} required />

              <TextareaField label={c.labelMessage} id="message" placeholder={c.placeholderMessage}
                value={form.message} onChange={set('message')} />

              <div className="pt-2">
                <button type="submit" disabled={loading}
                  className="w-full relative overflow-hidden bg-neutral-900 text-white font-mono text-[11px] tracking-[0.25em] uppercase px-6 py-4 rounded-xl transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      {c.submitting}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      {c.submitBtn}
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-beige-dark">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                      </svg>
                    </span>
                  )}
                </button>
                <p className="text-center font-body text-[11px] text-neutral-400 mt-3">{c.replyNote}</p>
              </div>

            </form>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-beige/60 to-transparent" />
        </div>

        {/* Bottom trust note */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-8 bg-beige-dark opacity-30" />
          <p className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
            {c.bottomNote}
          </p>
          <div className="h-px w-8 bg-beige-dark opacity-30" />
        </div>
      </div>

    </div>
  )
}
