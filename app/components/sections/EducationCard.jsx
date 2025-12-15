import React from 'react';
import { GraduationCap, Award, School } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const EducationCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col h-full">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 dark:bg-orange-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10 flex-1">
        <SectionTitle icon={GraduationCap} title={data.labels.education} className="mb-6" />
        
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div 
                key={i} 
                className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-amber-200 dark:hover:border-amber-500/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4">
                {/* Icon Box */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <School size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1">
                    {edu.school}
                  </h3>

                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 leading-snug">
                    {edu.degree}
                  </p>
                  
                  {edu.gpa && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 group-hover:border-amber-200 dark:group-hover:border-amber-800/50 transition-colors">
                        <Award size={12} className="text-amber-500" />
                        <span>GPA: {edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};