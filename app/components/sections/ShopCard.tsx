import React from 'react';
import { Globe, ArrowUpRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const ShopCard = () => {
  const { data } = useLanguage();
  
  const domains = data.domains || [];

  return (
    <Card span="md:row-span-2" className="relative overflow-hidden bg-[#0B1121] border border-slate-800 rounded-[32px] p-0 shadow-2xl">
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col p-6">
        
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5 mb-2 text-purple-400">
                <ShoppingBag size={18} />
            </div>
            <h2 className="text-2xl font-black text-white leading-tight tracking-tight">
              {data.labels.domainsTitle || "Tên miền"} <br />
              <span className="text-slate-400">
                {data.labels.domainsAction || "Mua tên miền số chất lượng cao"}
              </span>
            </h2>
          </div>
          
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
            {data.labels.domainsSubtitle || "Tài sản số"}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar pb-2">
          {domains.map((domain: any, i: number) => (
            <div key={i} className="group relative p-4 rounded-[24px] bg-[#151a2d] border border-white/5 hover:border-purple-500/30 hover:bg-[#1a1f35] transition-all duration-300 shadow-lg">
                
                <div className="flex gap-4">
                    <div className="shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-[#2a2640] flex items-center justify-center text-purple-400 border border-white/5 group-hover:scale-105 group-hover:text-pink-400 transition-all shadow-inner">
                            <Globe size={20} strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        
                        <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white tracking-tight truncate pr-2 group-hover:text-purple-200 transition-colors">
                                {domain.name}
                            </h3>
                            
                            <div className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                                {domain.price}
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed mb-3">
                            {domain.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold bg-slate-900/50 px-2 py-1 rounded-md">
                                <Sparkles size={10} className="text-yellow-500" />
                                <span className="truncate max-w-[100px]">{domain.tagline}</span>
                            </div>

                            <div className="flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-pink-400 cursor-pointer transition-colors group/btn">
                                <span>{data.labels.buyNow || "Mua ngay"}</span>
                                <ArrowUpRight size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
