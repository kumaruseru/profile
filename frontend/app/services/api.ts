import type { PortfolioData } from "~/types/api";

const API_BASE_URL = "http://localhost:8000/api";

// Helper function: Tự động xử lý response
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!res.ok) {
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }
  
  const data = await res.json();

  // --- QUAN TRỌNG: Tự động bóc tách dữ liệu phân trang ---
  // Nếu API trả về object có chứa 'results' là array, ta chỉ lấy 'results'
  if (data && typeof data === 'object' && 'results' in data && Array.isArray(data['results'])) {
    return data['results'] as T;
  }

  return data as T;
}

// 1. Home Page & General Data
export async function getPortfolioData(): Promise<PortfolioData> {
  return fetchAPI<PortfolioData>("/portfolio/home/");
}

// 2. Projects Page
export async function getProjects() {
  return fetchAPI<any[]>("/projects/");
}

// 3. Blog List Page
export async function getPosts() {
  return fetchAPI<any[]>("/blog/posts/");
}

// 4. Blog Detail Page
export async function getPostBySlug(slug: string) {
  // Slug detail không bao giờ phân trang, nên trả về trực tiếp
  return fetchAPI<any>(`/blog/posts/${slug}/`);
}

// 5. Resume Page (Lấy từ API tổng hợp Home cho đồng bộ)
export async function getResume() {
  // Mẹo: Dùng lại dữ liệu resume từ API Home để đảm bảo đầy đủ cấu trúc
  const data = await getPortfolioData();
  return data.resume;
}

// 6. Contact Page
export async function sendContactMessage(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || JSON.stringify(errorData) || "Không thể gửi tin nhắn");
  }

  return res.json();
}