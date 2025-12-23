// app/routes/_index.tsx
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// Import các component
import { ProfileSection } from "~/components/sections/ProfileSection";
import { ShopCard } from "~/components/sections/ShopCard"; 
import { TechStack } from "~/components/sections/TechStack";
import { LocationCard } from "~/components/sections/LocationCard";
import { GithubCard } from "~/components/sections/GithubCard";
import { ContactCard } from "~/components/sections/ContactCard";
import { EducationCard } from "~/components/sections/EducationCard";
import { OpenToWorkCard } from "~/components/sections/OpenToWorkCard";
import { ProjectShowcase } from "~/components/sections/ProjectShowcase";
import { DonateCard } from "~/components/sections/DonateCard"; // <--- Import mới

// Import data
import { portfolioData } from "~/data/portfolio";

export const loader = async () => {
  return json(portfolioData);
};

export const meta = () => {
  return [
    { title: "Portfolio" },
    { name: "description", content: "My Personal Portfolio" },
  ];
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
          
          {/* --- HÀNG 1: PROFILE & SHOP --- */}
          <div className="md:col-span-2 md:row-span-2 h-full [&>div]:h-full">
            <ProfileSection />
          </div>
          <ShopCard />

          {/* --- CÁC HÀNG TIẾP THEO --- */}
          <div className="md:col-span-3">
             <ProjectShowcase />
          </div>

          {/* Các card nhỏ */}
          {/* Sắp xếp: Github | OpenToWork | TechStack */}
          <GithubCard />
          <OpenToWorkCard />
          <TechStack /> 
          
          {/* Hàng tiếp theo: Education | Donate | ... */}
          <EducationCard />
          <DonateCard /> {/* <--- Đặt DonateCard ngay sau EducationCard */}

          {/* --- HÀNG CUỐI --- */}
          <div className="md:col-span-2">
            <ContactCard />
          </div>

          <div className="md:col-span-1">
             <LocationCard />
          </div>

        </div>
      </div>
    </div>
  );
}
