import React from 'react';
import { Layout, ArrowUpRight, ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { Card, Badge, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const ProjectShowcase = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:col-span-2" className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 overflow-hidden group/container">
      {/* Ambient Background Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-100 dark:border-slate-800/50">
          <SectionTitle icon={Layout} title={data.labels.projects} className="!mb-0" />
          <Badge variant="primary" className="animate-pulse shadow-sm">
            {data.labels.featured}
          </Badge>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {data.projects.map((project, i) => (
            <div key={i} className="group relative grid md:grid-cols-12 gap-8 items-start">
              
              {/* Left Content: Info */}
              <div className="md:col-span-7 flex flex-col h-full justify-center order-2 md:order-1 relative z-10">
                <div className="flex items-center gap-3 mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                        <FolderGit2 size={12} />
                        {project.period}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2 cursor-pointer">
                  {project.name}
                  {/* Icon mũi tên chỉ hiện khi hover */}
                  <ArrowUpRight size={22} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-base">
                  {project.desc}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700 text-xs font-semibold font-mono hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-sm transition-all duration-200 cursor-default">
                      {t}
                    </span>
                  ))}
                </div>

                {/* --- Action Buttons (Source Code & Live Demo) --- */}
                <div className="flex items-center gap-4 pt-2">
                    {/* Source Code Button */}
                    <a 
                      href={project.sourceUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors group/btn"
                    >
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover/btn:bg-slate-200 dark:group-hover/btn:bg-slate-700 transition-colors">
                          <Github size={18} />
                        </div>
                        <span>Source Code</span>
                    </a>

                    {/* Live Demo Button */}
                    <a 
                      href={project.demoUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors group/btn"
                    >
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover/btn:bg-blue-50 dark:group-hover/btn:bg-blue-900/30 transition-colors">
                          <ExternalLink size={18} />
                        </div>
                        <span>Live Demo</span>
                    </a>
                </div>
              </div>
              
              {/* Right Content: Visual Mockup */}
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2 sm:p-3 border border-slate-200 dark:border-slate-700 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500 ease-out">
                  
                  {/* Glass Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent z-20 pointer-events-none rounded-xl" />

                  {/* Browser Window Structure */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-inner overflow-hidden border border-slate-200/50 dark:border-slate-800">
                    
                    {/* Window Header */}
                    <div className="h-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center px-3 justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                        </div>
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full opacity-50"></div>
                    </div>

                    {/* Window Content (Abstract UI) */}
                    <div className="p-4 relative min-h-[160px] bg-slate-50/50 dark:bg-slate-900/50">
                        {/* Abstract UI Elements */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/20 shrink-0 animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                             <div className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <span className="text-xs text-slate-400 font-mono">UI Preview</span>
                             </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                             <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 text-xs font-bold text-slate-700 dark:text-slate-200">
                                View Details
                             </div>
                        </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative blob behind the image */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};