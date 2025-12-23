import React from 'react';
import { Layers, Code2, Database, Terminal, Cpu, type LucideIcon } from 'lucide-react';
import { Card, Badge, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

// Định nghĩa kiểu cho các key của skills (dựa trên data portfolio)
type SkillCategoryKey = 'frontend' | 'backend' | 'tools';

// Định nghĩa cấu trúc cho cấu hình hiển thị danh mục
interface CategoryDef {
  key: SkillCategoryKey;
  icon: LucideIcon;
  color: string;
  label: string;
}

export const TechStack: React.FC = () => {
  const { data } = useLanguage();

  // --- Safe Guard ---
  // Kiểm tra dữ liệu để tránh crash
  if (!data || !data.skills) {
    return (
      <Card className="h-full flex items-center justify-center p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <span className="text-slate-400 text-sm">Loading skills...</span>
      </Card>
    );
  }

  // Cấu hình danh sách hiển thị
  const categories: CategoryDef[] = [
    {
      key: 'frontend',
      icon: Code2,
      color: 'text-blue-500',
      // Sử dụng optional chaining và fallback an toàn
      label: data.labels?.frontend || 'Frontend'
    },
    {
      key: 'backend',
      icon: Database,
      color: 'text-emerald-500',
      label: data.labels?.backend || 'Backend'
    },
    {
      key: 'tools',
      icon: Terminal,
      color: 'text-orange-500',
      label: 'Tools & DevOps'
    }
  ];

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="p-6 flex flex-col h-full relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <SectionTitle 
            icon={Layers} 
            title={data.labels?.techStack || "Tech Stack"} 
            className="mb-0" 
          />
          <Cpu className="w-10 h-10 text-slate-100 dark:text-slate-800 pointer-events-none absolute top-6 right-6 opacity-50" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {categories.map((cat) => {
            // Lấy danh sách skill, ép kiểu về string[] để an toàn
            const skills = (data.skills[cat.key] as string[]) || []; 

            if (skills.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  <cat.icon size={16} className={cat.color} />
                  <span>{cat.label}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index}>
                        {/* Lưu ý: Nếu Badge component của bạn chưa hỗ trợ className, 
                            bạn có thể bọc ngoài hoặc cập nhật Badge.tsx để nhận props className */}
                        <Badge variant="outline">
                            {skill}
                        </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};