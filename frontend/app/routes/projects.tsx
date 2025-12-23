import { useLoaderData } from "react-router";
import { fetch as rrFetch } from "react-router";
import { getPortfolioData } from "~/services/api";
import type { Project } from "~/types/api";

export async function loader() {
  // Fetch only projects endpoint to keep payload small
  const res = await fetch((import.meta.env.VITE_API_BASE as string) || "http://localhost:8000" + "/api/v1/projects/");
  if (!res.ok) return { projects: [] };
  const projects = await res.json();
  return { projects };
}

export default function Projects() {
  const { projects } = useLoaderData() as { projects: Project[] };

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Các dự án</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {projects?.map((p) => (
            <article key={p.id} className="border rounded-lg overflow-hidden">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{p.short_description}</p>
                <div className="mt-4 flex gap-2">
                  {p.demo_url && (<a href={p.demo_url} className="text-sm text-blue-600">Live ↗</a>)}
                  {p.repo_url && (<a href={p.repo_url} className="text-sm text-blue-600">Repo ↗</a>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
