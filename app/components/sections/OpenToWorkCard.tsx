import React from 'react';
import { Sparkles, Briefcase, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const OpenToWorkCard = () => {
  const { data } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full group relative"
    >
      {/* Glow effect phía sau card (Backlight) */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-3xl opacity-20 blur-lg group-hover:opacity-50 transition duration-500" />

      <Card className="h-full relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors duration-500 p-0">
        
        {/* === Background Decor === */}
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Gradient Mesh */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-50" />
        
        {/* Animated Radar Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 h-full">
          
          {/* === Icon & Badge Area === */}
          <div className="relative mb-5">
             {/* Rotating Ring */}
             <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30 animate-[spin_10s_linear_infinite]" />
             
             <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-700/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300">
                <Briefcase size={24} className="text-emerald-600 dark:text-emerald-400" />
                
                {/* Status Dot Absolute */}
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </div>
             </div>
          </div>

          {/* === Content Area === */}
          <div className="space-y-3 w-full">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <Sparkles size={12} className="text-emerald-500 animate-pulse" />
               <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  {data.profile.availability}
               </span>
            </div>

            {/* Main CTA Text */}
            <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              {data.profile.cta}
            </h3>

            {/* Subtle "Hire Me" visual cue */}
            <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
               <span className="text-xs font-medium text-slate-400 flex items-center justify-center gap-1">
                 Contact me <ArrowRight size={12} />
               </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};