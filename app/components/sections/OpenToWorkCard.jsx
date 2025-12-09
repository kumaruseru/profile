import { Sparkles } from 'lucide-react';
import { Card } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const OpenToWorkCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="justify-center items-center bg-emerald-50 dark:bg-emerald-900/20 !border-emerald-100 dark:!border-emerald-900">
      <div className="text-center">
        <div className="inline-flex p-3 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 mb-2">
          <Sparkles size={20} />
        </div>
        <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">{data.profile.cta}</div>
        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">{data.profile.availability}</div>
      </div>
    </Card>
  );
};
