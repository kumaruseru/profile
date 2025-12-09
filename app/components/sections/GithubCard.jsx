import { Github } from 'lucide-react';
import { Card } from '~/components/ui/Card';

export const GithubCard = () => {
  return (
    <div className="md:row-span-1">
      <a 
        href="https://github.com/nghiaht2810" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full group/github"
      >
        <Card className="h-full justify-center items-center gap-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white !border-slate-200 dark:!border-slate-800 hover:!border-blue-500/50 transition-colors cursor-pointer">
           <Github size={32} className="text-slate-900 dark:text-white" />
           <div className="text-sm font-mono text-slate-500 dark:text-slate-400 group-hover/github:text-blue-500 transition-colors">@nghiaht2810</div>
        </Card>
      </a>
    </div>
  );
};
