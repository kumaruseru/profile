import { Mail, Phone, MapPin, Terminal } from 'lucide-react';
import { Card, Badge } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';
import { Typewriter } from 'react-simple-typewriter';

export const ProfileSection = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:col-span-2 md:row-span-2" className="justify-between">
      <div className="absolute top-0 right-0 w-full h-full bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-40 h-40 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl shadow-blue-500/20 bg-white dark:bg-slate-900">
            <img
              src="/avatar.png"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          {data.profile.name}
        </h1>
        <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6 flex items-center gap-2">
          <Terminal size={20} />
          <Typewriter
            words={[data.profile.role]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mb-8">
          {data.profile.summary}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4">
        <a 
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.profile.email}`}
          target="_blank"
          rel="noopener noreferrer" 
          className="group/btn flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
        >
          <div className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm text-blue-500 group-hover/btn:text-blue-600">
            <Mail size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Email</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[120px] md:max-w-none">
              {data.profile.email}
            </span>
          </div>
        </a>
        
        <a href={`tel:${data.profile.phone}`} className="group/btn flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm text-emerald-500 group-hover/btn:text-emerald-600">
            <Phone size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Phone</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {data.profile.phone}
            </span>
          </div>
        </a>
      </div>
    </Card>
  );
};
