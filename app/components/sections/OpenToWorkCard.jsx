import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const OpenToWorkCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="relative overflow-hidden bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/50 group flex flex-col items-center justify-center text-center p-6 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-500">
      
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-transparent dark:from-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon Container with Pulse Effect */}
        <div className="relative mb-4">
            <div className="absolute inset-0 bg-emerald-400/30 rounded-full animate-ping opacity-20" />
            <div className="relative p-3.5 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-700/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Sparkles size={24} className="group-hover:animate-pulse" />
            </div>
            
            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
                <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-100 dark:fill-emerald-900" />
            </div>
        </div>

        {/* Text Content */}
        <div className="space-y-1">
            <h3 className="font-bold text-slate-800 dark:text-emerald-100 text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {data.profile.cta}
            </h3>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900/40 border border-emerald-100 dark:border-emerald-800/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                    {data.profile.availability}
                </span>
            </div>
        </div>
      </div>
    </Card>
  );
};