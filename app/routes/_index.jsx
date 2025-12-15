// app/routes/_index.jsx
import { Controls } from "~/components/Controls";
import { ProfileSection } from "~/components/sections/ProfileSection";
import { LocationCard } from "~/components/sections/LocationCard";
import { GithubCard } from "~/components/sections/GithubCard";
import { TechStack } from "~/components/sections/TechStack";
import { ExperienceCard } from "~/components/sections/ExperienceCard";
import { EducationCard } from "~/components/sections/EducationCard";
import { OpenToWorkCard } from "~/components/sections/OpenToWorkCard";
import { ProjectShowcase } from "~/components/sections/ProjectShowcase";
import { ContactCard } from "~/components/sections/ContactCard";
// Import component mới
import { HarvardCV } from "~/components/cv/HarvardCV";

export const meta = () => {
  return [
    { title: "Hoang Trong Nghia - Full Stack Developer Portfolio" },
    { name: "description", content: "Portfolio của Hoàng Trọng Nghĩa - Full Stack Developer chuyên về C#, .NET, Python, Node.js và React" },
  ];
};

export default function Index() {
  return (
    // Thêm class print:p-0 print:bg-white để reset giao diện khi in
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300 p-4 md:p-8 font-sans print:p-0 print:bg-white print:overflow-visible">
      
      {/* Ẩn các hiệu ứng background khi in */}
      <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 print:max-w-none print:w-full">
        
        {/* Ẩn nút điều khiển khi in */}
        <div className="print:hidden">
          <Controls />
        </div>

        {/* Ẩn toàn bộ giao diện Web Portfolio khi in */}
        <main className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min pb-12 print:hidden">
          {/* Row 1 & 2 */}
          <ProfileSection />
          <LocationCard />
          <ExperienceCard />
          <TechStack />
          
          {/* Row 3 */}
          <GithubCard />
          <ProjectShowcase />
          
          {/* Row 4 */}
          <EducationCard />
          <OpenToWorkCard />
          <ContactCard />
        </main>

        {/* Ẩn footer khi in */}
        <footer className="text-center text-slate-400 text-sm pb-8 print:hidden">
          <p>© 2025 Hoang Trong Nghia. Built with React & Tailwind.</p>
        </footer>

        {/* Phần CV Harvard sẽ chỉ hiện ra khi in */}
        <HarvardCV />

      </div>
    </div>
  );
}