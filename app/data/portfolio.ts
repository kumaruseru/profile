// app/data/portfolio.ts

// --- 1. Định nghĩa Types (Interfaces) ---

export interface Profile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  addressFull: string;
  summary: string;
  cta: string;
  availability: string;
  avatarInitials?: string; // Optional vì bản VI không có field này trong data gốc
}

export interface Education {
  school: string;
  degree: string;
  gpa: string;
  period: string;
  major?: string; // Optional
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Domain {
  name: string;
  tagline: string;
  price: string;
  status: string;
  description: string;
  features: string[];
}

export interface Project {
  name: string;
  role: string;
  period: string;
  tech: string[];
  desc: string;
  highlight: boolean;
  sourceUrl: string;
  demoUrl: string;
}

export interface Labels {
  techStack: string;
  experience: string;
  education: string;
  projects: string;
  featured: string;
  savePdf: string;
  copy: string;
  copied: string;
  frontend: string;
  backend: string;
  contact: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
  domainsTitle: string;
  domainsSubtitle: string;
  buyNow: string;
  contactSubject?: string; // Thêm field này nếu dùng trong form
  donateTitle: string;
  donateDesc: string;
}

// Interface tổng cho dữ liệu ngôn ngữ
export interface PortfolioContent {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  domains: Domain[];
  projects: Project[];
  labels: Labels;
}

// Interface cho Skills
export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

// Interface cho toàn bộ data export
export interface FullPortfolioData extends PortfolioContent {
  skills: Skills;
  github: {
    username: string;
  };
  social: {
    github: string;
    linkedin: string;
    facebook: string;
    twitter: string;
  };
  donate: string;
}

// --- 2. Dữ liệu ---

export const DATA_VI: PortfolioContent = {
  profile: {
    name: "Hoàng Trọng Nghĩa",
    role: "Full Stack Developer",
    email: "nghiaht281003@gmail.com",
    phone: "+84-888 037 360",
    location: "Gò Vấp, TP.HCM",
    addressFull: "108/8 Nguyễn Thái Sơn, Gò Vấp, TP.HCM",
    summary: "Lập trình viên chuyên về C#, .NET, Python, Node.js và React. Có kinh nghiệm xây dựng các ứng dụng web thực tế phục vụ hơn 50 người dùng. Đam mê tối ưu hóa hiệu suất và nâng cao trải nghiệm người dùng.",
    cta: "Sẵn sàng làm việc",
    availability: "Có thể làm việc ngay"
  },
  education: [
    {
      school: "University of Greenwich",
      degree: "Cử nhân CNTT",
      gpa: "7.5/10",
      period: "2021 - Hiện tại",
      major: "Kỹ thuật phần mềm"
    }
  ],
  experience: [
    {
      company: "Công ty TNHH TM & DV NINA",
      role: "Web Developer",
      period: "11/2023 - 08/2025",
      description: "Phát triển ứng dụng React.js, tối ưu hóa E-commerce (tăng 40% tương tác), tích hợp bản đồ số và thực tế ảo."
    }
  ],
  domains: [
    {
      name: "owls.digital",
      tagline: "Agency & Tech Startup",
      price: "Liên Hệ",
      status: "Premium",
      description: "Tên miền hoàn hảo cho các Digital Agency, công ty công nghệ hoặc Portfolio sáng tạo. Ngắn gọn, dễ nhớ và chuyên nghiệp.",
      features: ["u/owls", "Digital Ext", "Brandable"]
    },
    {
      name: "cown.name.vn",
      tagline: "Thương hiệu cá nhân",
      price: "Liên hệ",
      status: "Available",
      description: "Tên miền độc đáo cho thương hiệu cá nhân. Ngắn (4 ký tự), phát âm dễ dàng, phù hợp làm blog hoặc CV online.",
      features: ["Ngắn gọn", "Cá nhân", "Độc đáo"]
    }
  ],
  projects: [
    {
      name: "Owls",
      role: "Lead Developer",
      period: "12/2025 - 02/2026",
      tech: ["Python", "Django", "Nextjs", "React", "Tailwind CSS"],
      desc: "Một nền tảng thương mại điện tử đa nhà cung cấp hiện đại, an toàn và có khả năng mở rộng cao, kết nối hiệu quả người bán và người mua.",
      highlight: true,
      sourceUrl: "https://github.com/33nghia2001/owls",
      demoUrl: "https://owls.asia"
    }
  ],
  labels: {
    techStack: "Kỹ năng Công nghệ",
    experience: "Kinh nghiệm", 
    education: "Học vấn",
    projects: "Dự án Nổi bật",
    featured: "Nổi bật",
    savePdf: "Lưu PDF",
    copy: "Sao chép",
    copied: "Đã chép!",
    frontend: "Giao diện",
    backend: "Hệ thống",
    contact: "Liên hệ",
    contactName: "Tên của bạn",
    contactEmail: "Email",
    contactMessage: "Lời nhắn",
    send: "Gửi tin nhắn",
    sending: "Đang gửi...",
    sent: "Đã gửi thành công!",
    error: "Có lỗi xảy ra!",
    domainsTitle: "Tên miền đang bán",
    domainsSubtitle: "Tài sản số",
    buyNow: "Mua ngay",
    donateTitle: "Donate",
    donateDesc: "Mời tôi ly cà phê"
  }
};

export const DATA_EN: PortfolioContent = {
  profile: {
    name: "Hoang Trong Nghia",
    role: "Full Stack Developer",
    email: "nghiaht281003@gmail.com",
    phone: "+84-336783780",
    location: "Ho Chi Minh City, VN",
    addressFull: "108/8 Nguyen Thai Son, Go Vap, HCMC",
    summary: "Specializing in C#, .NET, Python, Node.js, and React. Experienced in building robust web applications serving over 50 users. Committed to optimizing performance and enhancing user experience.",
    avatarInitials: "N",
    cta: "Open to Work",
    availability: "Available immediately"
  },
  education: [
    {
      school: "University of Greenwich",
      degree: "Bachelor's, Information Technology",
      gpa: "6.5/10",
      period: "2021 - Present",
    }
  ],
  experience: [
    {
      company: "Nina Trading & Service Co.",
      role: "Web Developer",
      period: "11/2023 - 08/2025",
      description: "Spearheaded React.js app development, optimized E-commerce platform (40% engagement boost), integrated Google Maps API and virtual tours."
    }
  ],
  domains: [
    {
      name: "owls.digital",
      tagline: "Agency & Tech Startup",
      price: "Make Offer",
      status: "Premium",
      description: "Perfect domain for Digital Agencies, Tech Startups or Creative Portfolios. Short, memorable, and professional.",
      features: ["u/owls", "Digital Ext", "Brandable"]
    },
    {
      name: "cown.name.vn",
      tagline: "Personal Identity",
      price: "Contact",
      status: "Available",
      description: "Unique domain for personal branding. Short (4 chars), easy to pronounce, suitable for blogs or online CVs.",
      features: ["Short", "Personal", "Unique"]
    }
  ],
  projects: [
    {
      name: "Owls",
      role: "Lead Developer",
      period: "12/2025 - 02/2026",
      tech: ["Python", "Django", "Nextjs", "React", "Tailwind CSS"],
      desc: "A modern, secure, and highly scalable multi-vendor e-commerce platform that effectively connects sellers and buyers.",
      highlight: true,
      sourceUrl: "https://github.com/33nghia2001/owls",
      demoUrl: "https://owls.asia"
    }
  ],
  labels: {
    techStack: "Tech Stack",
    experience: "Experience",
    education: "Education",
    projects: "Featured Projects",
    featured: "Featured",
    savePdf: "Save PDF",
    copy: "Copy",
    copied: "Copied!",
    frontend: "Frontend",
    backend: "Backend",
    contact: "Contact Me",
    contactName: "Your Name",
    contactEmail: "Email Address",
    contactMessage: "Message",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message Sent!",
    error: "Something went wrong!",
    domainsTitle: "Domains For Sale",
    domainsSubtitle: "Digital Assets",
    buyNow: "Buy Now",
    donateTitle: "Donate",
    donateDesc: "Buy me a coffee"
  }
};

export const SKILLS_COMMON: Skills = {
  // Sửa lỗi chính tả: Lavarel -> Laravel
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Laravel"],
  backend: ["C# / .NET Core", "Node.js", "Python", "MongoDB"],
  tools: ["Git", "Docker", "Figma", "VS Code"],
};

export const portfolioData: FullPortfolioData = {
  ...DATA_EN,
  skills: SKILLS_COMMON,
  github: {
    username: "kumaruseru" 
  },
  social: {
    github: "https://github.com/kumaruseru",
    linkedin: "https://linkedin.com/in/nghiaht2810",
    facebook: "https://www.facebook.com/nghiaht28102003",
    twitter: "https://twitter.com/nghiaht281003"
  },
  donate: "https://buymeacoffee.com/nghiaht281003"
};