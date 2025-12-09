import { useLanguage } from '~/contexts/LanguageContext';

export const HarvardCV = () => {
  const { data } = useLanguage();

  return (
    <div className="harvard-cv hidden print:block bg-white text-black p-0 m-0 max-w-none w-full">
      {/* 1. Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider mb-2">
          {data.profile.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-serif">
          <span>{data.profile.phone}</span>
          <span>•</span>
          <span>{data.profile.email}</span>
          <span>•</span>
          <span>{data.profile.location}</span>
          <span>•</span>
          <a href="https://github.com/nghiaht2810" className="underline">github.com/nghiaht2810</a>
        </div>
      </div>

      {/* 2. Education */}
      <section className="mb-6">
        <h2 className="text-lg font-serif font-bold uppercase border-b border-black mb-3">
          {data.labels.education}
        </h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between font-serif">
              <span className="font-bold">{edu.school}</span>
              <span className="italic">{edu.period}</span>
            </div>
            <div className="flex justify-between font-serif">
              <span>{edu.degree}</span>
              {/* Nếu GPA tốt thì hiển thị, không thì thôi */}
              <span>GPA: {edu.gpa}</span> 
            </div>
          </div>
        ))}
      </section>

      {/* 3. Technical Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-serif font-bold uppercase border-b border-black mb-3">
          {data.labels.techStack}
        </h2>
        <div className="font-serif text-sm leading-relaxed">
          <p><span className="font-bold">Frontend:</span> {data.skills.frontend.join(", ")}</p>
          <p><span className="font-bold">Backend:</span> {data.skills.backend.join(", ")}</p>
          <p><span className="font-bold">Tools:</span> {data.skills.tools.join(", ")}</p>
        </div>
      </section>

      {/* 4. Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-serif font-bold uppercase border-b border-black mb-3">
          {data.labels.experience}
        </h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-serif mb-1">
              <span className="font-bold">{exp.company}</span>
              <span className="italic">{exp.period}</span>
            </div>
            <div className="font-serif italic mb-1">{exp.role}</div>
            <ul className="list-disc ml-5 font-serif text-sm space-y-1">
              {/* Giả sử description là một câu dài, ta có thể tách nếu cần, ở đây hiển thị trực tiếp */}
              <li>{exp.description}</li>
            </ul>
          </div>
        ))}
      </section>

      {/* 5. Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-serif font-bold uppercase border-b border-black mb-3">
          {data.labels.projects}
        </h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-4">
             <div className="flex justify-between font-serif mb-1">
              <span className="font-bold">{proj.name}</span>
              <span className="italic">{proj.period}</span>
            </div>
            <p className="font-serif text-sm mb-1 italic">
               {proj.role} | Tech: {proj.tech.join(", ")}
            </p>
            <ul className="list-disc ml-5 font-serif text-sm">
               <li>{proj.desc}</li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};