import React from 'react';
import { type LucideIcon } from 'lucide-react';

// --- 1. Component Card ---
// Kế thừa HTMLAttributes để hỗ trợ onClick, id, style...
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  span?: string; // Dùng cho grid column span (vd: col-span-2)
}

export const Card = ({ children, className = "", span = "", ...props }: CardProps) => (
  <div 
    className={`
      relative overflow-hidden group rounded-3xl p-6 transition-all duration-300
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
      border border-slate-200 dark:border-slate-800
      hover:border-blue-500/50 dark:hover:border-blue-400/50
      shadow-lg shadow-slate-200/50 dark:shadow-none
      flex flex-col
      ${span} ${className}
    `}
    {...props} // Spread các props còn lại (vd: onClick)
  >
    {/* Hiệu ứng nền gradient ẩn, hiện lên khi hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </div>
);

// --- 2. Component Badge ---
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  className?: string; // <--- Thêm dòng này để hỗ trợ custom style
}

export const Badge = React.memo(({ children, variant = "default", className = "" }: BadgeProps) => {
  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    outline: "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

// --- 3. Component SectionTitle ---
interface SectionTitleProps {
  // Hỗ trợ cả Lucide Icon hoặc bất kỳ Component Icon nào khác
  icon: LucideIcon | React.ElementType; 
  title: string | React.ReactNode;
  className?: string;
}

export const SectionTitle = ({ icon: Icon, title, className = "" }: SectionTitleProps) => (
  <div className={`flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100 font-bold ${className}`}>
    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
      {/* Icon size cố định 18px để đồng bộ */}
      <Icon size={18} />
    </div>
    <span>{title}</span>
  </div>
);

export default Card;