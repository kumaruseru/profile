import { Code2 } from 'lucide-react';
import { Card, Badge, SectionTitle } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const TechStack = () => {
  const { data } = useLanguage();
  
  return (
    <Card span="md:col-span-1" className="!p-0 overflow-visible">
      <div className="p-6 pb-2">
        <SectionTitle icon={Code2} title={data.labels.techStack} />
      </div>
      <div className="px-6 pb-6 space-y-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">{data.labels.frontend}</div>
          <div className="flex flex-wrap gap-2">
            {data.skills.frontend.map(skill => (
              <Badge key={skill} variant="primary">{skill}</Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">{data.labels.backend}</div>
          <div className="flex flex-wrap gap-2">
            {data.skills.backend.map(skill => (
              <Badge key={skill} variant="default">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
