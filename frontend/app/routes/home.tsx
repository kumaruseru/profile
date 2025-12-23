import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { getPortfolioData } from "~/services/api"; // Lưu ý đường dẫn import
import type { PortfolioData } from "~/types/api";

// 1. Meta Tags (SEO)
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.profile?.full_name || "My Portfolio" },
    { name: "description", content: data?.profile?.headline || "Welcome to my portfolio" },
  ];
}

// 2. Loader (Chạy trên Server/Client để lấy dữ liệu trước khi render)
export async function loader() {
  const data = await getPortfolioData();
  return data;
}

// 3. Main Component
export default function Home() {
  const { config, profile, resume, projects } = useLoaderData() as PortfolioData;

  // Xử lý khi API chưa có dữ liệu hoặc lỗi
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Đang tải dữ liệu từ Backend...</p>
        <p className="text-sm text-gray-500 mt-2">(Hãy đảm bảo Django server đang chạy tại port 8000)</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* --- HEADER / HERO SECTION --- */}
      <header className="max-w-4xl mx-auto py-20 px-6 text-center space-y-6">
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-100 shadow-lg"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight">{profile.full_name}</h1>
        <p className="text-xl text-gray-600">{profile.headline}</p>
        <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">{profile.bio}</p>
        
        <div className="flex justify-center gap-4 pt-4">
            {profile.cv_pdf_url && (
                <a href={profile.cv_pdf_url} target="_blank" rel="noreferrer" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                    Tải CV
                </a>
            )}
            <a href="#contact" className="border border-black px-6 py-2 rounded-full hover:bg-gray-50 transition">
                Liên hệ
            </a>
        </div>
      </header>

      {/* --- SKILLS SECTION --- */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Kỹ năng chuyên môn</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resume?.skills?.map((category, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 text-lg border-b pb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Dự án nổi bật</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.map((project) => (
              <div key={project.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition group">
                 {project.thumbnail && (
                    <div className="h-48 overflow-hidden">
                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                 )}
                 <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.short_description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4 text-sm font-medium">
                        {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="hover:underline">Live Demo ↗</a>}
                        {project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t py-8 text-center text-sm text-gray-500" id="contact">
        <p>{config?.footer_text || "© 2024 Built with React Router & Django"}</p>
      </footer>
    </div>
  );
}