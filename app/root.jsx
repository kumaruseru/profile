import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
  useLocation,
} from "@remix-run/react";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import styles from "~/styles/global.css?url";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, Suspense, lazy, useRef } from "react";
import Lenis from "lenis";

// Lazy load component 3D (giữ nguyên từ bước trước)
const SpaceScene = lazy(() => import("~/components/canvas/SpaceScene"));

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

// --- COMPONENT: SMOOTH SCROLL WRAPPER ---
// Thiết lập Lenis để cuộn trang mượt như lụa
function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Thời gian trượt
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Hàm vật lý
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// --- COMPONENT: SCROLL PROGRESS BAR ---
// Thanh tiến trình chạy ngang trên đầu trang
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
}

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
        {/* Bọc toàn bộ app trong SmoothScroll */}
        <SmoothScroll>
          <ProgressBar />
          {children}
        </SmoothScroll>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation(); // Lấy thông tin trang hiện tại để làm key cho animation

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* AnimatePresence giúp tạo hiệu ứng khi component Outlet thay đổi (chuyển trang) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // Key thay đổi -> kích hoạt animation
            initial={{ opacity: 0, y: 20 }} // Trạng thái bắt đầu: mờ và thấp hơn 20px
            animate={{ opacity: 1, y: 0 }}  // Trạng thái kết thúc: rõ và về vị trí gốc
            exit={{ opacity: 0, y: -20 }}   // Trạng thái thoát: mờ và bay lên 20px
            transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian chuyển: 0.5s
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// --- GIỮ NGUYÊN PHẦN ERROR BOUNDARY (TRANG 404 3D) ---
export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center">
        {mounted && (
          <Suspense fallback={<div className="absolute inset-0 bg-slate-900" />}>
            <SpaceScene />
          </Suspense>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-3xl px-6"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-purple-500/20 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_5s_infinite]" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 inline-block"
            >
              <h1 className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                {is404 ? "404" : "Error"}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                {is404 ? "Lạc Lối Trong Không Gian Số?" : "Sự Cố Hệ Thống"}
              </h2>
              
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto font-light leading-relaxed">
                {is404 
                  ? "Trang bạn tìm kiếm có thể đã bị hố đen nuốt chửng hoặc chưa từng tồn tại trong vũ trụ này." 
                  : "Có vẻ như động cơ phản lực của chúng tôi đang gặp trục trặc kỹ thuật."}
              </p>

              {!is404 && (
                <div className="mb-8 p-4 bg-red-950/30 border border-red-500/30 rounded-lg text-left text-xs font-mono text-red-300 overflow-auto max-h-32">
                  <div className="flex items-center gap-2 mb-2 font-bold text-red-400">
                    <AlertTriangle size={14} /> Error Log:
                  </div>
                  {error instanceof Error ? error.message : "Unknown Error"}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3.5 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Home size={20} /> Quay Về Trạm Chính
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold backdrop-blur-md transition-colors flex items-center gap-2 hover:border-white/40"
                >
                  <RefreshCcw size={18} /> Thử Kết Nối Lại
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-8 text-white/20 text-xs text-center font-mono"
          >
            INTERACTIVE 3D ENVIRONMENT • RENDERED WITH WEBGL
          </motion.p>
        </motion.div>
      </div>
    </Layout>
  );
}