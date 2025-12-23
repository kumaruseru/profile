import { useLoaderData } from "react-router";
import type { Route } from "./+types/post";
import { getPostBySlug } from "~/services/api"; 
// Bạn nên cài thêm: npm install react-markdown
import ReactMarkdown from "react-markdown"; 

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  if (!post) throw new Response("Not Found", { status: 404 });
  return { post };
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10 text-center">
        <span className="text-blue-600 font-medium">{post.category?.name}</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">{post.title}</h1>
        <p className="text-gray-500">{new Date(post.published_at).toLocaleDateString()}</p>
      </header>
      
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="w-full h-auto rounded-xl shadow-lg mb-12" />
      )}

      {/* Content Markdown Style */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}