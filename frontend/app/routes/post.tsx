import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/post";
import { getPostBySlug } from "~/services/api";
import ReactMarkdown from "react-markdown";

// 1. Cấu hình SEO (Dynamic Title & Description)
export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Bài viết không tồn tại" }];
  }
  return [
    { title: `${data.post.title} | Blog` },
    { name: "description", content: data.post.excerpt || "Chi tiết bài viết" },
  ];
}

// 2. Loader
export async function loader({ params }: Route.LoaderArgs) {
  // params.slug được lấy từ URL /blog/:slug
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) throw new Response("Not Found", { status: 404 });
    return { post };
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

// 3. Main Component
export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20 transition-colors duration-300">
      
      {/* --- Header Image Backdrop (Optional styling) --- */}
      <div className="w-full h-64 md:h-80 lg:h-96 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10"></div>
         {post.cover_image ? (
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-full object-cover blur-sm opacity-50 dark:opacity-30" 
            />
         ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-900"></div>
         )}
      </div>

      <article className="max-w-3xl mx-auto px-6 -mt-32 md:-mt-40 relative z-20">
        
        {/* --- Navigation --- */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-full w-fit shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Quay lại Blog
        </Link>

        {/* --- Post Header --- */}
        <header className="mb-10 text-center md:text-left space-y-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
             {post.category && (
               <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                 {post.category.name}
               </span>
             )}
             <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
               {new Date(post.published_at).toLocaleDateString("vi-VN", { day: 'numeric', month: 'long', year: 'numeric' })}
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          {/* Author Info (Mockup nếu API chưa có user data chi tiết) */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
             </div>
             <div className="text-left">
               <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Admin</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">Tác giả</p>
             </div>
          </div>
        </header>
        
        {/* --- Main Cover Image --- */}
        {post.cover_image && (
          <figure className="mb-12">
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800" 
            />
            {/* Nếu có caption ảnh thì thêm ở đây */}
          </figure>
        )}

        {/* --- Content Markdown Style --- */}
        {/* 'prose' là class của @tailwindcss/typography giúp format văn bản tự động */}
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-lg
          prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
        ">
          <ReactMarkdown
            components={{
              // Tùy chỉnh hiển thị Code Block
              code({node, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm text-pink-600 font-mono`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-600 font-mono" {...props}>
                    {children}
                  </code>
                )
              },
              // Tùy chỉnh hiển thị Blockquote
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-1 italic bg-gray-50 dark:bg-gray-900/50 rounded-r-lg text-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* --- Footer / Share Section --- */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Chia sẻ bài viết này</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition">
              Twitter
            </button>
            <button 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Đã sao chép liên kết!");
              }}
            >
              Sao chép Link
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}