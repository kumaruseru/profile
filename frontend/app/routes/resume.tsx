import { useLoaderData } from "react-router";
import { getResume } from "~/services/api";

export async function loader() {
  const resume = await getResume();
  return { resume };
}

export default function Resume() {
  const { resume } = useLoaderData<typeof loader>();
  const { experience, education, skills } = resume;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      
      {/* Kinh nghiệm làm việc */}
      <section>
        <h2 className="text-3xl font-bold mb-10 border-b pb-4">Kinh nghiệm làm việc</h2>
        <div className="space-y-12 border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-8 relative">
          {experience.map((job: any) => (
            <div key={job.id} className="relative">
              {/* Timeline dot */}
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-950"></span>
              
              <h3 className="text-xl font-bold">{job.role}</h3>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                {job.company_name}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {job.start_date} - {job.is_current ? "Hiện tại" : job.end_date}
              </div>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {job.description}
              </p>
              {job.technologies_used && (
                 <div className="mt-3 flex flex-wrap gap-2">
                    {job.technologies_used.split(',').map((tech: string, i: number) =>(
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{tech.trim()}</span>
                    ))}
                 </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Học vấn */}
      <section>
        <h2 className="text-3xl font-bold mb-10 border-b pb-4">Học vấn</h2>
         <div className="space-y-8">
            {education.map((edu: any) => (
                <div key={edu.id} className="flex gap-4 items-start">
                    {edu.logo && <img src={edu.logo} className="w-12 h-12 object-contain" alt="school logo"/>}
                    <div>
                        <h3 className="text-xl font-bold">{edu.school_name}</h3>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{edu.degree}, {edu.field_of_study}</p>
                        <p className="text-sm text-gray-500">{edu.start_date} - {edu.end_date || "Present"}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}