// Định nghĩa cấu hình trang web
export type SiteConfig = {
  site_name?: string;
  maintenance_mode?: boolean;
  footer_text?: string;
};

// Định nghĩa thông tin cá nhân (Profile)
export type UserProfile = {
  id?: number;
  full_name?: string;
  headline?: string;
  bio?: string;
  avatar?: string;       // Sửa lại cho khớp với API trả về (thường là avatar hoặc avatar_url tùy serializer)
  avatar_url?: string;   // Giữ cả 2 để an toàn
  cv_pdf?: string;
  cv_pdf_url?: string;
  public_email?: string;
  location?: string;
  social_links?: SocialLink[];
};

export type SocialLink = {
  platform: string;
  url: string;
  icon_class?: string;
};

// Định nghĩa Kỹ năng
export type Skill = { 
  name: string; 
  icon?: string; 
  proficiency?: number 
};

export type SkillCategory = { 
  name: string; 
  skills: Skill[] 
};

// Định nghĩa Kinh nghiệm & Học vấn (Thay thế any[])
export type WorkExperience = {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  technologies_used?: string;
  logo?: string;
};

export type Education = {
  id: number;
  school_name: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string | null;
  grade?: string;
  description?: string;
  logo?: string;
};

export type ResumeData = {
  experience?: WorkExperience[]; // Đã thay thế any[]
  education?: Education[];       // Đã thay thế any[]
  skills?: SkillCategory[];
};

// Định nghĩa Dự án
export type ProjectTag = {
  name: string;
};

export type Project = {
  id: number;
  title: string;
  short_description?: string;
  thumbnail?: string;
  demo_url?: string;
  repo_url?: string;
  tags: ProjectTag[];
};

// Định nghĩa Bài viết Blog (Thêm mới cho trang Blog)
export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string; // Markdown content
  cover_image?: string;
  published_at: string;
  category?: { name: string; slug: string };
};

// Kiểu dữ liệu tổng hợp cho trang Home
export type PortfolioData = {
  config?: SiteConfig;
  profile?: UserProfile;
  resume?: ResumeData;
  projects?: Project[];
};

