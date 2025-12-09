import { Download, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '~/contexts/ThemeContext';
import { useLanguage } from '~/contexts/LanguageContext';

export const Controls = () => {
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, data } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex gap-2">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
        >
          <Download size={16} />
          <span className="hidden sm:inline">{data.labels.savePdf}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium text-sm shadow-sm"
        >
          <Globe size={16} />
          <span>{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 hover:scale-105 transition-transform"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};
