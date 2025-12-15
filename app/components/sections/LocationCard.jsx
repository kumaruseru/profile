import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Clock, Navigation } from 'lucide-react';
import { Card } from '../ui/Card'; 
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/portfolio';

export const LocationCard = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [time, setTime] = useState('');

  // Lấy địa điểm từ portfolioData hoặc dùng giá trị mặc định
  const location = portfolioData?.profile?.location || "Ho Chi Minh City, Vietnam";
  
  // URL Google Maps Embed
  const mapUrl = "https://maps.google.com/maps?q=108%2F8%20Nguy%E1%BB%85n%20Th%C3%A1i%20S%C6%A1n%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const texts = {
    en: {
      title: "Base of Operations",
      viewMap: "View on Google Maps",
      localTime: "Local Time",
      getDirections: "Get Directions",
    },
    vi: {
      title: "Địa điểm làm việc",
      viewMap: "Xem trên Google Maps",
      localTime: "Giờ địa phương",
      getDirections: "Chỉ đường",
    }
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    // Cập nhật đồng hồ theo múi giờ Việt Nam
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative h-full min-h-[300px] p-0 overflow-hidden group border-0 shadow-lg bg-gray-100 dark:bg-gray-800">
      
      {/* Map Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-0" /> 
        <iframe 
          width="100%" 
          height="100%" 
          title="map"
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0 dark:invert-[0.85] dark:hue-rotate-180 dark:contrast-125 dark:hover:invert-[0.85] dark:hover:grayscale-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 dark:opacity-80 transition-opacity duration-300" />
      </div>

      {/* Floating Header (Time) */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            <Clock size={14} className="text-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-gray-800 dark:text-gray-100">
                {time} GMT+7
            </span>
        </div>
      </div>

      {/* Bottom Content Panel */}
      <div className="absolute bottom-0 left-0 w-full p-5 z-20">
        <div className="flex flex-col gap-3">
            {/* Location Badge */}
            <div className="flex items-start justify-between">
                <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-red-500/20 rounded-full">
                            <MapPin size={16} className="text-red-500 fill-red-500/20" />
                        </div>
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            {t.title}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                        {location}
                    </h3>
                </div>
            </div>

            {/* Action Buttons - Slide up on hover */}
            <div className="flex items-center gap-3 pt-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <a 
                    href="https://maps.google.com/maps?q=108%2F8%20Nguy%E1%BB%85n%20Th%C3%A1i%20S%C6%A1n%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg"
                >
                    <Navigation size={14} />
                    {t.getDirections}
                </a>
                <a 
                    href="https://maps.google.com/maps?q=108%2F8%20Nguy%E1%BB%85n%20Th%C3%A1i%20S%C6%A1n%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/10 transition-colors"
                    title={t.viewMap}
                >
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
      </div>
    </Card>
  );
};