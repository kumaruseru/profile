import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import styles from "~/styles/global.css?url";
import { Home, RefreshCcw } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

export function Layout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </ThemeProvider>
  );
}

// --- TRANG 404 CAO CẤP VỚI HIỆU ỨNG 3D ---

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  // --- Logic xử lý 3D Mouse Parallax ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Làm mượt chuyển động chuột (spring physics)
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Biến đổi tọa độ chuột thành góc xoay 3D (-20 độ đến 20 độ)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);

  // Hiệu ứng ánh sáng di chuyển theo chuột
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  function handleMouseMove(event) {
    // Lấy tọa độ chuột chuẩn hóa từ -0.5 đến 0.5
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Layout>
      <div 
        className="relative min-h-screen w-full overflow-hidden bg-[#0f172a] text-white flex items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* --- Background Animated Orbs (Các khối màu trôi nổi) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px]" 
          />
        </div>

        {/* --- Floating Particles (Hạt bụi không gian) --- */}
        <Particles />

        {/* --- 3D Card Container --- */}
        <div 
          className="relative z-10 w-full max-w-2xl p-8" 
          style={{ perspective: 1000 }} // Tạo chiều sâu 3D
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              filter: `brightness(${brightness})`,
              transformStyle: "preserve-3d", // Quan trọng để các element con cũng 3D
            }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl shadow-black/50 text-center"
          >
            {/* Hiệu ứng chiều sâu cho chữ (translateZ) */}
            <motion.div 
              style={{ transform: "translateZ(60px)" }}
              className="relative"
            >
              <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 via-purple-400 to-emerald-400 drop-shadow-2xl select-none">
                {is404 ? "404" : "500"}
              </h1>
              
              {/* Bóng đổ giả lập dưới chân chữ */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/40 blur-xl rounded-full" />
            </motion.div>

            <motion.div 
              style={{ transform: "translateZ(40px)" }}
              className="mt-6 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                {is404 ? "Lạc vào hư vô?" : "Hệ thống gặp sự cố"}
              </h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                {is404 
                  ? "Trang bạn đang tìm kiếm dường như đã trôi dạt vào vũ trụ khác hoặc không còn tồn tại."
                  : "Đã có lỗi xảy ra từ phía chúng tôi. Vui lòng thử lại sau."}
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg transition-all"
                  >
                    <Home size={20} />
                    Trở về Trái Đất
                  </motion.button>
                </Link>
                
                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <RefreshCcw size={20} />
                  Thử lại
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

// Component tạo hiệu ứng hạt bụi bay lơ lửng
function Particles() {
  // Chỉ render ở client để tránh lỗi hydration mismatch vì random
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Tạo mảng 20 hạt ngẫu nhiên
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -100], // Bay lên
            opacity: [0, Math.random() * 0.5 + 0.2, 0], // Hiện rồi ẩn
          }}
          transition={{
            duration: Math.random() * 10 + 10, // 10-20s
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
          }}
        />
      ))}
    </div>
  );
}