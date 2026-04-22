import { createContext, useContext, useState } from 'react'
import { translations } from './i18n.js'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')
  const t = translations[lang]
  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')
  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
