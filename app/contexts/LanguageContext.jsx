import { createContext, useContext, useState } from 'react';
import { DATA_VI, DATA_EN, SKILLS_COMMON } from '~/data/portfolio';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('vi');
  const toggleLang = () => setLang(prev => prev === 'vi' ? 'en' : 'vi');
  
  const content = lang === 'vi' ? DATA_VI : DATA_EN;
  const data = { ...content, skills: SKILLS_COMMON };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, data }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
