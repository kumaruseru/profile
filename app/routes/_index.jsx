import { Controls } from "~/components/Controls";
import { ProfileSection } from "~/components/sections/ProfileSection";
import { LocationCard } from "~/components/sections/LocationCard";
import { GithubCard } from "~/components/sections/GithubCard";
import { TechStack } from "~/components/sections/TechStack";
import { ExperienceCard } from "~/components/sections/ExperienceCard";
import { EducationCard } from "~/components/sections/EducationCard";
import { OpenToWorkCard } from "~/components/sections/OpenToWorkCard";
import { ProjectShowcase } from "~/components/sections/ProjectShowcase";

export const meta = () => {
  return [
    { title: "Hoang Trong Nghia - Full Stack Developer Portfolio" },
    { name: "description", content: "Portfolio của Hoàng Trọng Nghĩa - Full Stack Developer chuyên về C#, .NET, Python, Node.js và React" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300 p-4 md:p-8 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Controls />

        <main className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min pb-12">
          <ProfileSection />
          <LocationCard />
          <GithubCard />
          <TechStack />
          <ExperienceCard />
          <EducationCard />
          <OpenToWorkCard />
          <ProjectShowcase />
        </main>

        <footer className="text-center text-slate-400 text-sm pb-8">
          <p>© 2025 Hoang Trong Nghia. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}
