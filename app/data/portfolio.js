// app/data/portfolio.js

export const DATA_VI = {
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
      gpa: "6.5/10",
      period: "2021 - Hiện tại",
    }
  ],
  // Dữ liệu Experience cũ (giữ lại để tham khảo hoặc nếu muốn dùng lại)
  experience: [
    {
      company: "Công ty TNHH TM & DV NINA",
      role: "Web Developer",
      period: "11/2023 - 08/2025",
      description: "Phát triển ứng dụng React.js, tối ưu hóa E-commerce (tăng 40% tương tác), tích hợp bản đồ số và thực tế ảo."
    }
  ],
  // --- DỮ LIỆU MỚI CHO DOMAIN SALES ---
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
    experience: "Kinh nghiệm", // Có thể đổi thành "Tài sản số" nếu muốn
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
    // Label mới cho component Domain
    domainsTitle: "Tên miền đang bán",
    domainsSubtitle: "Tài sản số",
    buyNow: "Mua ngay"
  }
};

export const DATA_EN = {
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
  // --- NEW DOMAIN DATA ---
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
    // New labels for Domain component
    domainsTitle: "Domains For Sale",
    domainsSubtitle: "Digital Assets",
    buyNow: "Buy Now"
  }
};

export const SKILLS_COMMON = {
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Lavarel"],
  backend: ["C# / .NET Core", "Node.js", "Python", "MongoDB"],
  tools: ["Git", "Docker", "Figma", "VS Code"],
};

export const portfolioData = {
  ...DATA_EN,
  skills: SKILLS_COMMON,
  github: {
    username: "33nghia2001" 
  },
  social: {
    github: "https://github.com/33nghia2001",
    linkedin: "https://linkedin.com/in/nghiaht2810",
    facebook: "https://www.facebook.com/nghiaht28102003"
  }
};