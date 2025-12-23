// app/routes/_index.tsx
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
import { DonateCard } from "~/components/sections/DonateCard";

// Import data
import { portfolioData } from "~/data/portfolio";

// Logic fix: Định kiểu cho loader để useLoaderData hiểu data trả về
export const loader = async () => {
  return json(portfolioData);
};

// Logic fix: Sử dụng data thực tế cho SEO thay vì hardcode
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.profile?.name 
    ? `${data.profile.name} | Portfolio` 
    : "Portfolio";

  return [
    { title: title },
    { name: "description", content: data?.profile?.summary || "My Personal Portfolio" },
  ];
};

export default function Index() {
  // Logic fix: Thêm generic type để TS gợi ý code
  const data = useLoaderData<typeof loader>();

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
          <DonateCard />

          {/* --- HÀNG CUỐI --- */}
          <div className="md:col-span-2">
            {/* Logic fix: Truyền subject để form tự điền chủ đề khi load */}
            <ContactCard initialSubject={data.profile.cta} />
          </div>

          <div className="md:col-span-1">
             <LocationCard />
          </div>

        </div>
      </div>
    </div>
  );
}