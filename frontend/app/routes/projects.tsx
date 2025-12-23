import { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/projects";
import { getProjects } from "~/services/api";
import type { Project } from "~/types/api";

// --- 1. Meta Tags (SEO) ---
export function meta() {
  return [
    { title: "Dự án | Portfolio" },
    { name: "description", content: "Danh sách các dự án phần mềm và sản phẩm tôi đã xây dựng." },
  ];
}

// --- 2. Loader ---
export async function loader() {
  const projects = await getProjects();
  // Đảm bảo projects luôn là mảng
  return { projects: Array.isArray(projects) ? projects : [] };
}

// --- 3. Component ---
export default function Projects() {
  const { projects } = useLoaderData<typeof loader>() as { projects: Project[] };
  
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Tự động lấy danh sách các Tags duy nhất từ tất cả dự án
  const allTags = useMemo(() => {
    const tags = new Set<string>(["All"]);
    projects.forEach(p => p.tags.forEach(t => tags.add(t.name)));
    return Array.from(tags);
  }, [projects]);

  // Logic lọc dự án
  const filteredProjects = projects.filter((project) => {
    const matchesTag = activeTag === "All" || project.tags.some(t => t.name === activeTag);
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dự án tiêu biểu
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Những sản phẩm tôi đã xây dựng, từ ý tưởng đến triển khai thực tế, giải quyết các vấn đề cụ thể.
        </p>
      </div>

      {/* --- CONTROLS (Search & Filter) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        
        {/* Filter Tags (Scrollable on mobile) */}
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTag === tag
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Tìm kiếm dự án..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <svg className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* --- PROJECTS GRID --- */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                     <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                
                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                   {project.demo_url && (
                     <a 
                       href={project.demo_url} 
                       target="_blank" 
                       rel="noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-blue-50 transition transform hover:scale-105"
                     >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       Demo
                     </a>
                   )}
                   {project.repo_url && (
                     <a 
                       href={project.repo_url} 
                       target="_blank" 
                       rel="noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-full font-bold text-sm hover:bg-black transition transform hover:scale-105"
                     >
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                       Code
                     </a>
                   )}
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags?.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                  {project.short_description}
                </p>

                {/* Footer Link (Mobile fallback) */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800 flex justify-between md:hidden">
                    {project.demo_url ? (
                        <a href={project.demo_url} className="text-sm font-semibold text-blue-600">Xem Demo</a>
                    ) : <span></span>}
                     {project.repo_url && (
                        <a href={project.repo_url} className="text-sm font-semibold text-gray-600 dark:text-gray-400">Source Code</a>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        // --- EMPTY STATE ---
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           </div>
           <h3 className="text-lg font-medium text-gray-900 dark:text-white">Không tìm thấy dự án</h3>
           <p className="text-gray-500 mt-1">
             {searchQuery ? `Không có kết quả nào cho "${searchQuery}"` : "Hiện tại chưa có dự án nào trong danh mục này."}
           </p>
           {(searchQuery || activeTag !== "All") && (
             <button 
               onClick={() => { setSearchQuery(""); setActiveTag("All"); }}
               className="mt-4 text-blue-600 hover:underline font-medium"
             >
               Xóa bộ lọc
             </button>
           )}
        </div>
      )}
    </div>
  );
}