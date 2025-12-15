import React from 'react';
import { Code2, Server, Layout, Database, Terminal, Cpu, Globe } from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const TechStack = () => {
  const { data } = useLanguage();

  // Helper để chọn icon và màu sắc dựa trên category
  const getCategoryStyle = (type) => {
    if (type === 'frontend') {
      return {
        icon: Layout,
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-100 dark:border-blue-800'
      };
    }
    return {
      icon: Server,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-100 dark:border-emerald-800'
    };
  };

  return (
    <Card span="md:col-span-1" className="relative !p-0 overflow-hidden group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

      <div className="p-6 relative z-10 h-full flex flex-col">
        <SectionTitle icon={Code2} title={data.labels.techStack} className="mb-6" />

        <div className="space-y-8 flex-1">
          {/* Frontend Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Globe size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    {data.labels.frontend}
                </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.skills.frontend.map((skill, index) => (
                <div 
                  key={skill}
                  className="group/tag relative px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default overflow-hidden"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/tag:text-slate-900 dark:group-hover/tag:text-white flex items-center gap-1.5">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

          {/* Backend Section */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <Database size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    {data.labels.backend}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.skills.backend.map((skill, index) => (
                <div 
                  key={skill}
                  className="group/tag relative px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default overflow-hidden"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                   {/* Subtle hover gradient background */}
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/tag:text-slate-900 dark:group-hover/tag:text-white flex items-center gap-1.5">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer decoration */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono opacity-60">
            <Terminal size={12} />
            <span>Always learning...</span>
        </div>
      </div>
    </Card>
  );
};