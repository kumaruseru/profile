import { Layout, ArrowUpRight } from 'lucide-react';
import { Card, Badge, SectionTitle } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const ProjectShowcase = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:col-span-2" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle icon={Layout} title={data.labels.projects} className="!mb-0" />
          <Badge variant="primary">
            {data.labels.featured}
          </Badge>
        </div>

        {data.projects.map((project, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                {project.name}
                <ArrowUpRight size={18} className="text-slate-400" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-mono border dark:border-slate-700 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {project.period}
                </div>
              </div>
            </div>
            
            <div className="relative h-48 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-2 group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-transparent dark:from-slate-800 dark:via-slate-800/50 dark:to-transparent z-10"></div>
              <div className="h-full w-full bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700/50 overflow-hidden relative shadow-sm">
                <div className="h-6 border-b border-slate-200 dark:border-slate-800 flex items-center px-2 gap-1.5 bg-slate-50 dark:bg-slate-950">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2">
                  <div className="col-span-1 h-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="col-span-2 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    <div className="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded mt-2 border border-dashed border-slate-200 dark:border-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
