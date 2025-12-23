import { createContext, useContext, useState } from 'react';
import { DATA_VI, DATA_EN, SKILLS_COMMON } from '~/data/portfolio';

type LanguageContextType = {
  lang: string;
  language: string;
  toggleLang: () => void;
  data: any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState('vi');
  const toggleLang = () => setLang(prev => (prev === 'vi' ? 'en' : 'vi'));
  
  const content = lang === 'vi' ? DATA_VI : DATA_EN;
  const data = { ...content, skills: SKILLS_COMMON };

  return (
    <LanguageContext.Provider value={{ lang, language: lang, toggleLang, data }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
