import { Briefcase } from 'lucide-react';
import { Card, SectionTitle } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const ExperienceCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:row-span-2" className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <SectionTitle icon={Briefcase} title={data.labels.experience} />
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 py-2">
        {data.experience.map((exp, i) => (
          <div key={i} className="relative pl-6">
            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
            <div className="flex flex-col gap-1 mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white">{exp.role}</h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{exp.company}</span>
              <span className="text-xs font-mono text-slate-400">{exp.period}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
