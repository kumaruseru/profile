import { MapPin } from 'lucide-react';
import { Card } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const LocationCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="relative !p-0 overflow-hidden group min-h-[200px] border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
      <div className="absolute inset-0 w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" /> 
      <iframe 
        width="100%" 
        height="100%" 
        title="map"
        src="https://maps.google.com/maps?q=108%2F8%20Nguy%E1%BB%85n%20Th%C3%A1i%20S%C6%A1n%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 w-full h-full border-0 transition-all duration-700 opacity-90 group-hover:opacity-100 grayscale hover:grayscale-0 dark:invert dark:hue-rotate-180 dark:brightness-75 dark:contrast-125"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <MapPin size={14} className="text-red-500 shrink-0 fill-red-500/20" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
              {data.profile.location}
            </span>
        </div>
      </div>
    </Card>
  );
};
