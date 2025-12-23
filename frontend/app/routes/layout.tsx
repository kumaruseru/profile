import { Link, Outlet, useLocation } from "react-router";

export default function Layout() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter hover:text-blue-600 transition">
            KumarUseru<span className="text-blue-500">.</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.path ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button (Placeholder) */}
          <button className="md:hidden text-gray-600 dark:text-gray-300">
             Menu
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} KumarUseru. Built with React Router 7 & Django.</p>
        </div>
      </footer>
    </div>
  );
}