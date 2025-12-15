import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Users, Book, ExternalLink, MapPin, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card'; 
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

  // Lấy username từ portfolioData hoặc fallback
  const username = portfolioData?.github?.username || portfolioData?.social?.github?.split('/').pop() || 'nghiaht2810';

  const texts = {
    en: {
      title: "GitHub Activity",
      viewProfile: "View GitHub Profile",
      repositories: "Repositories",
      followers: "Followers",
      following: "Following",
      topRepos: "Top Repositories",
      noDescription: "No description available",
      loading: "Loading GitHub data...",
      error: "Could not load GitHub data"
    },
    vi: {
      title: "Hoạt động GitHub",
      viewProfile: "Xem hồ sơ GitHub",
      repositories: "Kho lưu trữ",
      followers: "Người theo dõi",
      following: "Đang theo dõi",
      topRepos: "Kho lưu trữ nổi bật",
      noDescription: "Chưa có mô tả",
      loading: "Đang tải dữ liệu GitHub...",
      error: "Không thể tải dữ liệu GitHub"
    }
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        
        // Sort by stars and take top 6
        const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
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

  // Màu sắc cho các ngôn ngữ lập trình phổ biến
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Java: '#b07219',
      'C#': '#178600',
      PHP: '#4F5D95',
      Vue: '#41b883',
      React: '#61dafb',
      Dart: '#00B4AB',
      Swift: '#ffac45',
      Go: '#00ADD8',
    };
    return colors[lang] || '#8b949e';
  };

  if (loading) {
    return (
      <Card className="flex items-center justify-center p-12 min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p>{t.loading}</p>
        </div>
      </Card>
    );
  }

  if (error || !profile) {
    return (
      <Card className="p-8 text-center text-red-500">
        <Github className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>{t.error}</p>
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {t.viewProfile}
        </a>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 shadow-xl">
      {/* Header Section with Banner effect */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900">
        <div className="absolute -bottom-12 left-8">
          <div className="relative">
            <img 
              src={profile.avatar_url} 
              alt={profile.name} 
              className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-900 shadow-lg object-cover bg-white"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" title="Available for hire"></div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
           <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all text-sm font-medium border border-white/10"
          >
            <Github size={18} />
            <span className="hidden sm:inline">Follow</span>
          </a>
        </div>
      </div>

      <div className="pt-16 px-8 pb-8">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {profile.name || username}
              <span className="text-gray-400 text-base font-normal">@{profile.login}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl text-base leading-relaxed">
              {profile.bio || t.noDescription}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {profile.location}
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-1.5">
                  <LinkIcon size={16} />
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline transition-colors truncate max-w-[200px]">
                    {profile.blog}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 w-full md:w-auto min-w-[300px]">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.public_repos}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.repositories}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.followers}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.followers}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.following}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.following}</div>
            </div>
          </div>
        </div>

        {/* Contribution Graph - Styled Image */}
        <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-green-500" />
                Contributions
            </h3>
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 p-2 sm:p-4 hover:border-blue-500/30 transition-colors">
                 <img 
                    src={`https://ghchart.rshah.org/${theme === 'dark' ? '40c463' : '216e39'}/${username}`} 
                    alt="Github Contributions"
                    className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                 />
            </div>
        </div>

        {/* Top Repositories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Book size={20} className="text-blue-500" />
            {t.topRepos}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline truncate pr-4">
                    {repo.name}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-xs shrink-0">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="group-hover:text-yellow-500 transition-colors" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={14} className="group-hover:text-blue-500 transition-colors" />
                      {repo.forks_count}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow h-10">
                  {repo.description || t.noDescription}
                </p>

                <div className="flex justify-between items-center mt-auto text-xs">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-200/50 dark:bg-gray-700/50">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{repo.language}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.viewProfile} <ExternalLink size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
            <a 
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
            >
                View all repositories
                <ExternalLink size={16} />
            </a>
        </div>
      </div>
    </Card>
  );
};