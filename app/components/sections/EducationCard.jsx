import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const EducationCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="p-6 flex flex-col h-full relative z-10">
        <SectionTitle icon={GraduationCap} title={data.labels.education} className="mb-6" />
        
        {/* Timeline Container */}
        <div className="flex-1 space-y-0 relative">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700/50" />

            {data.education.map((edu, i) => (
                <div key={i} className="relative pl-8 pb-8 last:pb-0 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-white dark:border-slate-900 bg-amber-400 dark:bg-amber-500 z-10 shadow-sm transition-transform duration-300 group-hover:scale-110" />

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {edu.school}
                            </h3>
                        </div>

                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {edu.degree}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            {/* Period Badge */}
                            <div className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                <Calendar size={10} />
                                <span>{edu.period || "2016 - 2020"}</span>
                            </div>

                            {/* GPA Badge (if exists) */}
                            {edu.gpa && (
                                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-800/30">
                                    <Award size={10} />
                                    <span>GPA: {edu.gpa}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Decorative Gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 dark:to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
    </Card>
  );
};