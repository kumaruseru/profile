// Frontend API client
const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

async function fetchJson(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    credentials: "include",
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText} ${text}`);
  }
  const data = await res.json().catch(() => null);
  // If DRF-style pagination, unwrap `results`
  if (data && typeof data === "object" && "results" in data && Array.isArray((data as any).results)) {
    return (data as any).results;
  }
  return data;
}

export async function getPortfolioData() {
  const [config, profile, resume, projects] = await Promise.all([
    fetchJson("/api/config/"),
    fetchJson("/api/profile/"),
    fetchJson("/api/resume/"),
    fetchJson("/api/projects/"),
  ]);

  const projectsList = projects && Array.isArray(projects) ? projects : projects?.results || [];

  return { config, profile, resume, projects: projectsList };
}

export async function getProjects() {
  const res = await fetchJson("/api/projects/");
  return res && Array.isArray(res) ? res : res?.results || [];
}

export async function getPosts() {
  const res = await fetchJson("/api/blog/posts/");
  return res && Array.isArray(res) ? res : res?.results || [];
}

export async function getPostBySlug(slug: string) {
  return fetchJson(`/api/blog/posts/${slug}/`);
}

export async function getResume() {
  const data = await getPortfolioData();
  return data.resume;
}

export async function sendContactMessage(payload: Record<string, any>) {
  const res = await fetch(`${API_BASE}/api/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to send contact");
  return res.json();
}

export default { getPortfolioData, getProjects, getPosts, getPostBySlug, getResume, sendContactMessage };