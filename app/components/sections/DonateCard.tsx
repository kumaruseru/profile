import { Card } from "~/components/ui/Card";
import { ExternalLink, Sparkles } from "lucide-react";
import { useLoaderData } from "@remix-run/react";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import { DATA_EN, DATA_VI } from "~/data/portfolio";

// Định nghĩa lại kiểu dữ liệu thay vì dùng any
// Using framer-motion's Variants type instead of a custom shape.

const AnimatedCoffee = () => {
  const steamVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: [0, 0.6, 0], // Giảm độ đậm một chút để tinh tế hơn
      y: -20,
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: [0.45, 0, 0.55, 1] as any,
        delay: i * 0.3,
      },
    }),
  };

  return (
    <div className="relative w-14 h-14 flex items-center justify-center drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-amber-400"
      >
        {/* Cốc cà phê */}
        <path
          d="M19 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fill-amber-500/10"
        />
        <path
          d="M4 6H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Khói cà phê */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${8.5 + i * 3.5} 2C${8.5 + i * 3.5} 2 ${7.5 + i * 3.5} 4 ${8.5 + i * 3.5} 5`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={i}
            variants={steamVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </svg>
    </div>
  );
};

export function DonateCard() {
  const { language } = useLanguage();
  const t = language === 'vi' ? DATA_VI.labels : DATA_EN.labels;
  
  // Type safety cho loader data
  const data = useLoaderData<{ donate?: string }>(); 
  const donateUrl = data?.donate || "https://buymeacoffee.com/nghiaht281003";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full w-full group relative"
    >
      <a
        href={donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {/* Glow effect phía sau card */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl opacity-20 group-hover:opacity-60 blur-lg transition duration-500" />

        <Card className="h-full relative overflow-hidden bg-slate-950/90 dark:bg-black/90 backdrop-blur-xl border-amber-500/20 group-hover:border-amber-500/50 transition-colors duration-500">
          
          {/* Background Noise & Lighting */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Spotlight Gradient - Ánh sáng chiếu từ trên xuống */}
          <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-amber-500/20 blur-[80px] rounded-full group-hover:bg-amber-500/30 transition-all duration-700" />

          {/* Shine Effect chạy qua khi hover */}
          <div className="absolute inset-0 -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-amber-200/5 to-transparent skew-x-12 pointer-events-none z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full p-6 text-center">
            
            {/* Icon Wrapper */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 shadow-inner shadow-amber-500/10 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCoffee />
                {/* Sparkle Icon trang trí */}
                <motion.div 
                  className="absolute -top-1 -right-1 text-amber-200"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={12} />
                </motion.div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2 group-hover:text-amber-400 transition-colors duration-300">
                {t.donateTitle}
                <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
              </h3>
              
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors max-w-[200px] mx-auto leading-relaxed">
                {t.donateDesc}
              </p>
            </div>

            {/* Button giả lập (Call to action visual) */}
            <div className="mt-5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-500 uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
               Support me
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}