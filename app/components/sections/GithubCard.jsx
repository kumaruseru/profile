import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Users, Book, ExternalLink, MapPin, Link as LinkIcon, Loader2, Trophy, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { portfolioData } from '../../data/portfolio';

export const GithubCard = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy username từ data config
  const username = portfolioData?.github?.username || portfolioData?.social?.github?.split('/').pop() || 'nghiaht2810';

  const texts = {
    en: {
      viewProfile: "View GitHub",
      repositories: "Repositories",
      followers: "Followers",
      following: "Following",
      topRepos: "Top Repositories",
      noDescription: "No description provided",
      loading: "Loading profile...",
      error: "Unable to load data",
      contributions: "Contributions",
      viewAll: "View all"
    },
    vi: {
      viewProfile: "Xem GitHub",
      repositories: "Kho lưu trữ",
      followers: "Người theo dõi",
      following: "Đang theo dõi",
      topRepos: "Kho lưu trữ nổi bật",
      noDescription: "Chưa có mô tả",
      loading: "Đang tải dữ liệu...",
      error: "Không thể tải dữ liệu",
      contributions: "Hoạt động đóng góp",
      viewAll: "Xem tất cả"
    }
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // 2. Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=owner`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        
        // Sắp xếp theo star và lấy top 4
        const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);
        setRepos(sortedRepos);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
      Python: '#3572A5', Java: '#b07219', 'C#': '#178600', PHP: '#4F5D95',
      Vue: '#41b883', React: '#61dafb', Dart: '#00B4AB', Swift: '#ffac45', Go: '#00ADD8',
    };
    return colors[lang] || '#8b949e';
  };

  // --- STATE: LOADING ---
  if (loading) {
    return (
      <div className="col-span-1 md:col-span-2 flex items-center justify-center p-12 min-h-[400px] bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // --- STATE: ERROR ---
  if (error || !profile) {
      return (
        <div className="col-span-1 md:col-span-2 p-8 text-center text-red-500 border border-red-100 rounded-2xl bg-white dark:bg-gray-900">
            <p>{t.error}</p>
        </div>
      )
  }

  return (
    <div className="col-span-1 md:col-span-2 group overflow-hidden border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-[#0d1117] shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* ================================================================================== */}
        {/* CỘT TRÁI: PROFILE INFO (Fixed Width ~280px) */}
        {/* ================================================================================== */}
        <div className="w-full lg:w-[280px] shrink-0 bg-gradient-to-b from-gray-50/80 to-white dark:from-[#161b22] dark:to-[#0d1117] border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-gray-800 p-6 flex flex-col relative z-10">
          
          {/* Avatar & Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative group/avatar mb-4">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-green-500 rounded-full opacity-40 group-hover/avatar:opacity-80 blur transition duration-500"></div>
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="relative w-24 h-24 rounded-full border-4 border-white dark:border-[#0d1117] shadow-md object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{profile.name || username}</h2>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-blue-500 transition-colors font-medium">
              @{profile.login}
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 border-y border-gray-200 dark:border-gray-800 py-4 mb-6">
            <div className="flex flex-col items-center px-1">
                <span className="font-bold text-gray-900 dark:text-white">{profile.public_repos}</span>
                <span className="text-[10px] uppercase text-gray-500 mt-1">Repos</span>
            </div>
            <div className="flex flex-col items-center px-1">
                <span className="font-bold text-gray-900 dark:text-white">{profile.followers}</span>
                <span className="text-[10px] uppercase text-gray-500 mt-1">Fans</span>
            </div>
            <div className="flex flex-col items-center px-1">
                <span className="font-bold text-gray-900 dark:text-white">{profile.following}</span>
                <span className="text-[10px] uppercase text-gray-500 mt-1">Follow</span>
            </div>
          </div>

          {/* Location & Blog */}
          <div className="space-y-3 flex-grow text-sm text-gray-600 dark:text-gray-400">
             {profile.location && (
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <MapPin size={14} className="shrink-0 text-gray-400" />
                  <span className="truncate">{profile.location}</span>
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <LinkIcon size={14} className="shrink-0 text-gray-400" />
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-500 hover:underline transition-colors">
                    Website
                  </a>
                </div>
              )}
          </div>

          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-xl transition-all shadow-lg hover:shadow-xl font-bold text-xs uppercase tracking-wider">
            <Github size={16} /> {t.viewProfile}
          </a>
        </div>

        {/* ================================================================================== */}
        {/* CỘT PHẢI: CONTENT DASHBOARD (Flexible Width) */}
        {/* ================================================================================== */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#0d1117] p-5 lg:p-6 overflow-hidden min-w-0">
          
          {/* 1. CONTRIBUTIONS GRAPH */}
          <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-green-500" /> {t.contributions}
                </h3>
            </div>
            <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
                 {/* Thêm ?t=... để tránh cache ảnh cũ */}
                 <img 
                    src={`https://ghchart.rshah.org/${theme === 'dark' ? '2ea043' : '216e39'}/${username}?t=${new Date().getTime()}`} 
                    alt="Github Contributions" 
                    className="h-24 min-w-[600px] w-full object-cover rounded opacity-85 hover:opacity-100 transition-opacity"
                 />
            </div>
             <p className="text-[10px] text-gray-400 mt-1 text-right italic">*Chart updates may delay up to 24h</p>
          </div>

          {/* 2. TOP REPOSITORIES (LIST VIEW - 1 Column) */}
          <div className="flex-grow flex flex-col min-w-0">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Book size={14} className="text-blue-500" /> {t.topRepos}
                </h3>
                <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group/link">
                    {t.viewAll} <ExternalLink size={10} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
            </div>
            
            {/* GRID 1 CỘT - Đảm bảo không bao giờ bị tràn chữ */}
            <div className="grid grid-cols-1 gap-3">
              {repos.map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-[#161b22]/40 hover:bg-white dark:hover:bg-[#161b22] hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 gap-3"
                >
                  {/* Left Side: Name + Desc */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Book size={15} className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {repo.name}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate pl-6 opacity-80">
                         {repo.description || <span className="italic opacity-50">{t.noDescription}</span>}
                    </p>
                  </div>

                  {/* Right Side: Stats */}
                  <div className="flex items-center gap-3 sm:gap-4 pl-6 sm:pl-0 text-[11px] shrink-0">
                        {repo.language && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                                {repo.language}
                            </span>
                        )}
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                             <span className="flex items-center gap-1 group-hover:text-yellow-600 transition-colors">
                                <Star size={12} className={repo.stargazers_count > 0 ? "text-yellow-500 fill-yellow-500" : ""} /> 
                                {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                                <GitFork size={12} />
                                {repo.forks_count}
                            </span>
                        </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};