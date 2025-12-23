import { useLoaderData } from "react-router";
import { getResume } from "~/services/api";
import type { ResumeData, WorkExperience, Education, SkillCategory } from "~/types/api";
import ReactMarkdown from "react-markdown"; // Cần cài: npm install react-markdown

// --- Helper: Format ngày tháng (YYYY-MM-DD -> Month Year) ---
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// --- Loader ---
export async function loader() {
  // getResume() trả về ResumeData (bao gồm experience, education, skills)
  const resume = await getResume();
  return { resume };
}

// --- Main Component ---
export default function Resume() {
  const { resume } = useLoaderData<typeof loader>();
  
  // Cast kiểu dữ liệu để TypeScript hỗ trợ
  const { experience = [], education = [], skills = [] } = resume as ResumeData;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
      
      {/* Header cho trang Resume (Optional) */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hồ sơ năng lực
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Tổng hợp quá trình làm việc, học vấn và kỹ năng chuyên môn.
        </p>
      </div>

      {/* --- SECTION 1: KINH NGHIỆM LÀM VIỆC --- */}
      <section>
        <div className="flex items-center gap-4 mb-12">
           <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
           </div>
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Kinh nghiệm làm việc</h2>
        </div>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-16">
          {experience.map((job: WorkExperience) => (
            <div key={job.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <span className={`absolute -left-[9px] top-2 h-5 w-5 rounded-full border-4 border-white dark:border-gray-950 ${job.is_current ? 'bg-green-500' : 'bg-blue-600'}`}></span>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                  <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {job.company_name}
                  </div>
                </div>
                <div className="flex-shrink-0 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
                  {formatDate(job.start_date)} — {job.is_current ? "Hiện tại" : formatDate(job.end_date)}
                </div>
              </div>

              {/* Description w/ Markdown support */}
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-4">
                 <ReactMarkdown>{job.description}</ReactMarkdown>
              </div>

              {/* Technologies Tags */}
              {job.technologies_used && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.technologies_used.split(',').map((tech, i) => (
                    <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: KỸ NĂNG (Đã thêm mới) --- */}
      {skills.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Kỹ năng chuyên môn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category: SkillCategory, idx: number) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: any, sIdx: number) => (
                    <div key={sIdx} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                      {skill.icon && <img src={skill.icon} alt="" className="w-5 h-5 object-contain" />}
                      <span className="text-sm font-medium">{skill.name}</span>
                      {/* Optional: Hiển thị mức độ nếu có */}
                      {/* {skill.proficiency > 0 && <span className="text-xs text-gray-400">({skill.proficiency}%)</span>} */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- SECTION 3: HỌC VẤN --- */}
      <section>
        <div className="flex items-center gap-4 mb-10">
           <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
           </div>
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Học vấn</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
           {education.map((edu: Education) => (
             <div key={edu.id} className="flex gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex-shrink-0">
                 {edu.logo ? (
                   <img src={edu.logo} className="w-16 h-16 object-contain bg-white rounded-lg p-1 border" alt={edu.school_name}/>
                 ) : (
                   <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v9"/></svg>
                   </div>
                 )}
               </div>
               <div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.school_name}</h3>
                 <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.degree}</p>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{edu.field_of_study}</p>
                 <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-1 rounded">
                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                 </span>
                 {edu.description && (
                   <p className="mt-3 text-sm text-gray-500 line-clamp-2">{edu.description}</p>
                 )}
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}