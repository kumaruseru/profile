import { useLoaderData } from "react-router";
// Giả sử bạn đã có hàm gọi API tương ứng
import { getProjects } from "~/services/api";

export async function loader() {
  const projects = await getProjects(); // Fetch từ Django API /api/projects/
  return { projects };
}

export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Dự án tiêu biểu</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Những sản phẩm tôi đã xây dựng, từ ý tưởng đến triển khai thực tế.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <article key={project.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
            {project.thumbnail && (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                {project.tags?.map((tag: any) => (
                  <span key={tag.id} className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                    {tag.name}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {project.short_description}
              </p>
              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {project.demo_url && <a href={project.demo_url} target="_blank" className="text-sm font-medium hover:underline">Live Demo</a>}
                {project.repo_url && <a href={project.repo_url} target="_blank" className="text-sm font-medium hover:underline">Source Code</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}