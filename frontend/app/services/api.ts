// Lightweight API client for frontend to fetch portfolio data from Django backend
const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

async function fetchJson(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Accept": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Fetch error ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPortfolioData() {
  const endpoints = [
    fetchJson("/api/v1/config/"),
    fetchJson("/api/v1/profile/"),
    fetchJson("/api/v1/resume/"),
    fetchJson("/api/v1/projects/"),
  ];

  const [config, profile, resume, projects] = await Promise.all(endpoints);

  return {
    config,
    profile,
    resume,
    projects,
  };
}

export async function postContact(formData: Record<string, any>) {
  const res = await fetch(`${API_BASE}/api/v1/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to send contact");
  return res.json();
}

export default { getPortfolioData, postContact };
