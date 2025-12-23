import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Clock, Navigation, Cloud, Sun, CloudRain, CloudLightning, CloudSnow } from 'lucide-react';
import { Card } from '../ui/Card'; 
import { useLanguage } from '../../contexts/LanguageContext';

// --- 1. Định nghĩa Types ---
interface Translations {
  title: string;
  viewMap: string;
  localTime: string;
  getDirections: string;
}

interface WeatherData {
  temp: number;
  isDay: number; // 1 = ngày, 0 = đêm
  code: number;  // Mã thời tiết WMO
}

export const LocationCard: React.FC = () => {
  const { language } = useLanguage();
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // --- 2. Cấu hình Địa điểm ---
  // Tọa độ 108/8 Nguyễn Thái Sơn, Gò Vấp
  const LAT = 10.820986;
  const LNG = 106.687483;
  const addressDisplay = "108/8 Nguyễn Thái Sơn, Gò Vấp, TP.HCM";
  
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.857631336338!2d106.68529431474936!3d10.821160992290945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e5496d03cf%3A0xa5b8e7a6a7c3b0a6!2zMTA4LzggTmd1eeG7hW4gVGjDoWkgU8ahbiwgUGjGsOG7nW5nIDMsIEfDsiBW4bqlcCwgVGjDoW5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s";
  const mapsLink = "https://maps.app.goo.gl/qfGW47ghvYUWu6nf7";

  const texts: Record<string, Translations> = {
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

  // --- 3. Logic: Time & Weather ---
  
  // Hàm lấy icon dựa trên mã WMO của Open-Meteo
  const getWeatherIcon = (code: number, isDay: number) => {
    // 0: Clear sky, 1-3: Cloud
    if (code === 0 || code === 1) return isDay ? <Sun size={14} className="text-yellow-500" /> : <Sun size={14} className="text-blue-200" />;
    if (code === 2 || code === 3) return <Cloud size={14} className="text-gray-400" />;
    // 51-67, 80-82: Rain
    if (code >= 51 && code <= 67) return <CloudRain size={14} className="text-blue-400" />;
    if (code >= 80 && code <= 82) return <CloudRain size={14} className="text-blue-500 animate-bounce-slow" />;
    // 95-99: Thunderstorm
    if (code >= 95) return <CloudLightning size={14} className="text-purple-500 animate-pulse" />;
    
    return <Sun size={14} className="text-orange-400" />; // Default
  };

  useEffect(() => {
    // 3a. Time Loop
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        hour: '2-digit', minute: '2-digit', hour12: false 
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 3b. Fetch Weather (Open-Meteo API - Free, No Key)
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,is_day,weather_code&timezone=auto`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          isDay: data.current.is_day,
          code: data.current.weather_code
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
        // Fallback nhẹ nếu lỗi mạng: setWeather({ temp: 30, isDay: 1, code: 1 }); 
      }
    };
    
    fetchWeather();
    // Refresh thời tiết mỗi 30 phút
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000); 

    return () => {
      clearInterval(interval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <Card className="relative h-full min-h-[300px] p-0 overflow-hidden group border-0 shadow-lg bg-gray-100 dark:bg-gray-800">
      
      {/* --- LAYER 1: MAP BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-0" /> 
        <iframe 
          width="100%" height="100%" title="map"
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0 dark:invert-[0.85] dark:hue-rotate-180 dark:contrast-125 dark:hover:invert-[0.9] dark:hover:grayscale-0"
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          style={{ pointerEvents: 'none' }} 
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
      </div>

      {/* --- LAYER 2: FLOATING HEADER (TIME & WEATHER) --- */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full shadow-lg border border-white/20 transition-transform group-hover:scale-105">
            
            {/* Weather Section (Chỉ hiện khi đã load được dữ liệu) */}
            {weather && (
              <>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  {getWeatherIcon(weather.code, weather.isDay)}
                  <span className="text-xs font-bold font-mono">{weather.temp}°C</span>
                </div>
                {/* Divider */}
                <div className="w-[1px] h-3 bg-gray-400/50" />
              </>
            )}

            {/* Time Section */}
            <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">
                    {time}
                </span>
            </div>
        </div>
      </div>

      {/* --- LAYER 3: BOTTOM CONTENT PANEL --- */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <div className="flex flex-col gap-4">
            
            {/* Location Info */}
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 bg-red-500 rounded-full shadow-lg shadow-red-500/30 animate-bounce-slow">
                            <MapPin size={14} className="text-white fill-white" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                            {t.title}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-lg max-w-[90%]">
                          {addressDisplay}
                      </h3>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-[1fr,auto] gap-3 pt-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <a 
                    href={mapsLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/40 active:scale-95"
                >
                    <Navigation size={16} />
                    {t.getDirections}
                </a>
                
                <a 
                    href={mapsLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl border border-white/10 transition-colors active:scale-95"
                    title={t.viewMap}
                >
                    <ExternalLink size={20} />
                </a>
            </div>
        </div>
      </div>
    </Card>
  );
};