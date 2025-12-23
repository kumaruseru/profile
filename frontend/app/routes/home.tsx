import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { getPortfolioData } from "~/services/api";
import type { PortfolioData, Project, SkillCategory } from "~/types/api";

// --- CONSTANTS ---
const R2_DOMAIN = "https://cdn.owls.asia";

// --- HELPER: Xử lý hiển thị ảnh (Fix lỗi đường dẫn) ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "";
  // Nếu path đã bắt đầu bằng http (như link R2 tuyệt đối từ API) thì trả về luôn
  if (path.startsWith("http")) return path;
  // Xử lý dấu gạch chéo để tránh double slash
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${R2_DOMAIN}/${cleanPath}`;
};

// --- SEO METADATA ---
export function meta({ data }: Route.MetaArgs) {
  const profile = (data as PortfolioData)?.profile;
  return [
    { title: profile?.full_name ? `${profile.full_name} | Portfolio` : "Portfolio" },
    { name: "description", content: profile?.headline || "Fullstack Developer Portfolio" },
    { property: "og:image", content: getImageUrl(profile?.avatar_url) },
  ];
}

export async function loader() {
  return await getPortfolioData();
}

export default function Home() {
  const data = useLoaderData() as PortfolioData;
  const { profile, resume, projects } = data;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 animate-pulse">Đang kết nối dữ liệu...</p>
        </div>
      </div>
    );
  }

  const skills = resume?.skills || [];
  const featuredProjects = projects || [];
  const socialLinks = profile.social_links || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center z-10 space-y-10">
          {/* Animated Avatar */}
          {(profile.avatar_url || profile.avatar) && (
             <div className="relative inline-flex group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-40 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <img
                  src={getImageUrl(profile.avatar_url || profile.avatar)}
                  alt={profile.full_name}
                  className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
             </div>
          )}

          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight italic uppercase">
               <span className="block text-gray-900 dark:text-white">I'm {profile.full_name?.split(' ').pop()}</span>
               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                  {profile.headline}
               </span>
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              {profile.bio || "Crafting high-performance web applications with precision and passion."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/projects" 
              className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
            >
              Let's Talk
            </Link>
          </div>

          {/* Social Links Bar */}
          <div className="flex justify-center items-center gap-8 pt-4">
            {socialLinks.map((link: any, idx) => (
               <a 
                 key={idx} 
                 href={link.url} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all transform hover:-translate-y-1"
               >
                 <span className="text-sm font-bold uppercase tracking-widest">{link.platform}</span>
               </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS: BENTO STYLE --- */}
      {skills.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Expertise</h2>
                <div className="h-2 w-24 bg-blue-600 rounded-full" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">My specialized technical toolkit.</p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category: SkillCategory, idx) => (
              <div 
                key={idx} 
                className="group p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                  <span className="w-8 h-px bg-current opacity-30" />
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                        key={sIdx} 
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold border border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- PROJECTS: MODERN CARDS --- */}
      {featuredProjects.length > 0 && (
        <section className="py-24 px-6 bg-white dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Selected Works</h2>
                <Link to="/projects" className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-8">
                   All Projects
                </Link>
             </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.slice(0, 3).map((project: Project) => (
                <article key={project.id} className="group relative flex flex-col space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
                     <img 
                        src={getImageUrl(project.thumbnail)} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-0 group-hover:blur-[2px]" 
                     />
                     {/* Overlay on hover */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                         {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold shadow-xl">Live</a>}
                         {project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer" className="px-6 py-2 bg-gray-900 text-white border border-gray-600 rounded-full font-bold shadow-xl">Code</a>}
                     </div>
                  </div>
                  
                  <div className="px-2 space-y-2">
                    <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed font-medium">
                        {project.short_description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 bg-blue-600 dark:bg-blue-700 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
           
           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Have a project in mind?</h2>
              <p className="text-blue-100 max-w-xl mx-auto text-lg font-medium opacity-90">
                 I'm currently available for freelance work and full-time positions. Let’s build something incredible together.
              </p>
              <Link to="/contact" className="inline-block px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-gray-100 transition-transform active:scale-95 shadow-xl">
                 GET IN TOUCH
              </Link>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-gray-100 dark:border-gray-900 text-center">
         <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {profile.full_name} • Built with Passion
         </p>
      </footer>

    </div>
  );
}