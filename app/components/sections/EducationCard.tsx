import React from 'react';
import { GraduationCap, Award, Calendar, ExternalLink, BookOpen, Star } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const EducationCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-shadow hover:shadow-md">
      <div className="p-6 flex flex-col h-full relative z-10">
        
        <div className="flex items-center justify-between mb-5">
          <SectionTitle icon={GraduationCap} title={data.labels.education} className="mb-0" />
          <GraduationCap className="absolute top-6 right-6 w-12 h-12 text-slate-100 dark:text-slate-800/50 -rotate-12 pointer-events-none" />
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {data.education.map((edu: any, i: number) => (
            <div 
              key={i} 
              className="group relative p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    {edu.degree}
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Calendar size={11} className="text-amber-500" />
                    <span>{edu.period || "2016 - 2020"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 border-dashed">
                {edu.gpa && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/30">
                    <Award size={12} />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                )}

                {edu.major && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800/30">
                    <BookOpen size={12} />
                    <span>{edu.major}</span>
                  </div>
                )}

                {edu.honors && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-800/30">
                    <Star size={12} />
                    <span>{edu.honors}</span>
                  </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
