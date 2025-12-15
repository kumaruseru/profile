import React from 'react';
import { Mail, MessageCircle, Terminal, ArrowUpRight, Sparkles } from 'lucide-react'; // Đổi Phone -> MessageCircle
import { Card } from '../ui/Card'; 
import { useLanguage } from '../../contexts/LanguageContext';
import { Typewriter } from 'react-simple-typewriter';

export const ProfileSection = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:col-span-2 md:row-span-2" className="relative p-8 flex flex-col justify-between overflow-hidden group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      {/* Decorative Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none transition-all duration-700 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Header: Avatar & Status */}
        <div className="flex items-start justify-between mb-8">
            <div className="relative group/avatar">
                {/* Glow Effect behind Avatar */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-20 group-hover/avatar:opacity-50 blur-lg transition duration-500" />
                
                {/* Avatar Image */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10">
                    <img
                        src="/avatar.png"
                        alt={data.profile.name}
                        className="w-full h-full object-cover transform group-hover/avatar:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>
                
                {/* Online/Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1.5 rounded-full ring-1 ring-slate-100 dark:ring-slate-800 shadow-sm z-20">
                      <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                    </span>
                </div>
            </div>

            {/* Quick Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                <Sparkles size={14} className="text-yellow-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Open to work</span>
            </div>
        </div>

        {/* Info Section */}
        <div className="mb-8 flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                {data.profile.name}
            </h1>
            
            <div className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-bold font-mono mb-6 flex items-center gap-3 min-h-[2rem]">
                <Terminal size={24} className="opacity-70" />
                <span>
                    <Typewriter
                        words={[data.profile.role]}
                        loop={1}
                        cursor
                        cursorStyle="_"
                        typeSpeed={50}
                        deleteSpeed={30}
                        delaySpeed={2000}
                    />
                </span>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {data.profile.summary}
            </p>
        </div>

        {/* Contact Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
             {/* Email Action */}
            <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300"
            >
                <div className="p-3 bg-white dark:bg-slate-700/50 text-blue-500 dark:text-blue-400 rounded-xl shadow-sm group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300">
                    <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Email Me</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{data.profile.email}</p>
                </div>
                <ArrowUpRight size={18} className="text-slate-300 dark:text-slate-600 group-hover/card:text-blue-500 transition-colors transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
            </a>

            {/* Zalo Action */}
            <a 
                href={`https://zalo.me/${data.profile.phone.replace(/[^0-9]/g, '')}`} // Link Zalo chuẩn, xóa ký tự lạ khỏi SĐT
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300"
            >
                <div className="p-3 bg-white dark:bg-slate-700/50 text-blue-500 dark:text-blue-400 rounded-xl shadow-sm group-hover/card:scale-110 group-hover/card:-rotate-3 transition-transform duration-300">
                    {/* Dùng icon MessageCircle đại diện cho Chat/Zalo */}
                    <MessageCircle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Chat Zalo</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{data.profile.phone}</p>
                </div>
                 <ArrowUpRight size={18} className="text-slate-300 dark:text-slate-600 group-hover/card:text-blue-500 transition-colors transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
            </a>
        </div>
      </div>
    </Card>
  );
};