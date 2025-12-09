import { GraduationCap } from 'lucide-react';
import { Card, Badge, SectionTitle } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const EducationCard = () => {
  const { data } = useLanguage();
  
  return (
    <Card className="group">
      <SectionTitle icon={GraduationCap} title={data.labels.education} />
      {data.education.map((edu, i) => (
        <div key={i} className="mt-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-200">{edu.school}</h4>
          <div className="flex justify-between items-end mt-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">{edu.degree}</p>
            <Badge variant="outline" className="font-mono text-[10px]">
              GPA: {edu.gpa}
            </Badge>
          </div>
        </div>
      ))}
    </Card>
  );
};
