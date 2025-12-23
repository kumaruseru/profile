import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/services/api";
import type { BlogPost } from "~/types/api";

// --- Loader ---
export async function loader() {
  const posts = await getPosts();
  // Sắp xếp bài viết mới nhất lên đầu (nếu API chưa sắp xếp)
  const sortedPosts = Array.isArray(posts) 
    ? posts.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    : [];
  return { posts: sortedPosts };
}

// --- Component ---
export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc bài viết theo từ khóa tìm kiếm
  const filteredPosts = (posts as BlogPost[]).filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Bài viết & Chia sẻ
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Những góc nhìn, kỹ thuật lập trình và câu chuyện về hành trình phát triển phần mềm.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-8 relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* --- Content Section --- */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  // Placeholder nếu không có ảnh
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Category Badge (Floating) */}
                {post.category && (
                  <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 shadow-sm">
                    {post.category.name}
                  </span>
                )}
              </Link>

              {/* Content Body */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.published_at).toLocaleDateString("vi-VN", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </div>

                <Link to={`/blog/${post.slug}`} className="group-hover:text-blue-600 transition-colors">
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Đọc tiếp <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        // --- Empty State ---
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
             </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Không tìm thấy bài viết</h3>
          <p className="text-gray-500 mt-1">
            {posts.length === 0 
              ? "Chưa có bài viết nào được xuất bản." 
              : `Không có kết quả nào cho "${searchQuery}".`
            }
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:underline font-medium"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          )}
        </div>
      )}
    </div>
  );
}