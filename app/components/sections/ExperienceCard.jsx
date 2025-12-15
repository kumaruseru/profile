import React from 'react';
import { Briefcase, Calendar, Building2, ArrowRight } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const ExperienceCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:row-span-2" className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 dark:bg-slate-800/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col">
        <SectionTitle icon={Briefcase} title={data.labels.experience} className="mb-6" />
        
        <div className="flex-1 relative pl-2">
          {/* Timeline Line */}
          <div className="absolute left-[11px] top-2 bottom-4 w-px bg-gradient-to-b from-blue-500 via-slate-200 dark:via-slate-700 to-transparent" />

          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="group relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute left-[3px] top-[5px] w-[17px] h-[17px] rounded-full border-[3px] border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300 z-10 shadow-sm">
                   <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-0 group-hover:opacity-100" />
                </div>
                
                {/* Content Card */}
                <div className="relative p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-blue-100 dark:hover:border-blue-500/30 transition-all duration-300">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                            <Building2 size={14} className="text-slate-400" />
                            <span>{exp.company}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 w-fit whitespace-nowrap">
                        <Calendar size={12} />
                        {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3 mt-1">
                    {exp.description}
                  </p>
                  
                  {/* Decorative Arrow on Hover */}
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-blue-500">
                     <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};