import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Layout chung cho toàn bộ trang public
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),           // Trang chủ
    route("projects", "routes/projects.tsx"), // Danh sách dự án
    route("blog", "routes/blog.tsx"),         // Danh sách bài viết
    route("blog/:slug", "routes/post.tsx"),   // Chi tiết bài viết
    route("resume", "routes/resume.tsx"),     // CV / Kinh nghiệm
    route("contact", "routes/contact.tsx"),   // Liên hệ
  ]),
] satisfies RouteConfig;