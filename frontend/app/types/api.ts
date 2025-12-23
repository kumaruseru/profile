export type SiteConfig = {
  site_name?: string;
  maintenance_mode?: boolean;
  footer_text?: string;
};

export type UserProfile = {
  id?: number;
  full_name?: string;
  headline?: string;
  bio?: string;
  avatar_url?: string;
  cv_pdf_url?: string;
};

export type Skill = { name: string };
export type SkillCategory = { name: string; skills: Skill[] };

export type ResumeData = {
  experience?: any[];
  education?: any[];
  skills?: SkillCategory[];
};

export type Project = {
  id: number;
  title: string;
  short_description?: string;
  thumbnail?: string;
  demo_url?: string;
  repo_url?: string;
  tags: { name: string }[];
};

export type PortfolioData = {
  config?: SiteConfig;
  profile?: UserProfile;
  resume?: ResumeData;
  projects?: Project[];
};

export default PortfolioData;
