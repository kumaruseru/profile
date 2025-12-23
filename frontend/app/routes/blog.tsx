import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/services/api"; // Cần implement hàm này gọi /api/blog/posts/

export async function loader() {
  const posts = await getPosts();
  return { posts };
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Bài viết</h1>
      <div className="space-y-12">
        {posts.map((post: any) => (
          <article key={post.id} className="flex flex-col md:flex-row gap-8 items-start">
             {post.cover_image && (
               <img src={post.cover_image} alt={post.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
             )}
             <div className="flex-1">
               <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                 <span>{new Date(post.published_at).toLocaleDateString()}</span>
                 {post.category && <span className="text-blue-600">• {post.category.name}</span>}
               </div>
               <Link to={`/blog/${post.slug}`} className="group">
                 <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">{post.title}</h2>
               </Link>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                 {post.excerpt}
               </p>
               <Link to={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                 Đọc tiếp →
               </Link>
             </div>
          </article>
        ))}
      </div>
    </div>
  );
}