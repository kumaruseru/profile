import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigation } from "react-router";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // Mặc định là light, sẽ update sau khi mount
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Danh sách menu
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  // 1. Xử lý Dark Mode
  useEffect(() => {
    // Kiểm tra theme trong localStorage hoặc system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // 2. Xử lý hiệu ứng Scroll Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Đóng mobile menu khi chuyển trang
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* --- PROGRESS BAR (Loading Indicator) --- */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-blue-100">
          <div className="h-full bg-blue-600 animate-pulse w-2/3 transition-all duration-300"></div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 shadow-sm" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter hover:text-blue-600 transition flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span>KumarUseru<span className="text-blue-500">.</span></span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 hover:text-blue-600 relative py-1 ${
                    isActive 
                      ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600" 
                      : "text-gray-600 dark:text-gray-400 after:w-0"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Theme Toggle Button (Desktop) */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-400"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
          </div>
          
          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
             {/* Theme Toggle (Mobile) */}
             <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400">
                {theme === "light" ? (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
             </button>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 p-1"
            >
               {isMobileMenuOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
               )}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <div 
           className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
             isMobileMenuOpen ? "max-h-96 opacity-100 shadow-lg" : "max-h-0 opacity-0"
           }`}
        >
           <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 ${
                      isActive ? "text-blue-600 pl-2 border-l-2 border-l-blue-600" : "text-gray-600 dark:text-gray-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
           </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      {/* Thêm padding-top để tránh content bị che bởi fixed navbar */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Brand Info */}
              <div className="space-y-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm">K</div>
                    KumarUseru
                 </h3>
                 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Fullstack Developer chuyên xây dựng các ứng dụng web hiện đại, hiệu suất cao với Django và React.
                 </p>
              </div>

              {/* Links */}
              <div>
                 <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Điều hướng</h4>
                 <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    {navItems.map(item => (
                       <li key={item.path}><Link to={item.path} className="hover:text-blue-600 transition">{item.name}</Link></li>
                    ))}
                 </ul>
              </div>

              {/* Contact Short */}
              <div>
                 <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Liên hệ nhanh</h4>
                 <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>Ho Chi Minh City, Vietnam</li>
                    <li>contact@example.com</li>
                 </ul>
              </div>
           </div>

           <div className="border-t border-gray-100 dark:border-gray-800 pt-8 text-center text-sm text-gray-400 dark:text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} KumarUseru. All rights reserved.</p>
              <div className="flex gap-4">
                 <a href="#" className="hover:text-blue-600 transition">GitHub</a>
                 <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
                 <a href="#" className="hover:text-blue-600 transition">Twitter</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}