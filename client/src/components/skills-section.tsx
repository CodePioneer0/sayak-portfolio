import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
  color: string;
}

export default function SkillsSection() {
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: "fas fa-code",
      color: "cyan",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
      ],
    },
    {
      title: "Backend Development",
      icon: "fas fa-server",
      color: "emerald",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 82 },
        { name: "Express.js", level: 85 },
        { name: "Django", level: 75 },
      ],
    },
    {
      title: "Database & Cloud",
      icon: "fas fa-database",
      color: "yellow",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 78 },
        { name: "AWS", level: 72 },
        { name: "Docker", level: 80 },
      ],
    },
    {
      title: "Tools & Workflow",
      icon: "fas fa-tools",
      color: "purple",
      skills: [
        { name: "Git/GitHub", level: 92 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 75 },
        { name: "Agile/Scrum", level: 83 },
      ],
    },
    {
      title: "Mobile Development",
      icon: "fas fa-mobile-alt",
      color: "red",
      skills: [
        { name: "React Native", level: 78 },
        { name: "Flutter", level: 65 },
        { name: "Expo", level: 80 },
        { name: "PWA", level: 85 },
      ],
    },
    {
      title: "Machine Learning",
      icon: "fas fa-robot",
      color: "indigo",
      skills: [
        { name: "TensorFlow", level: 70 },
        { name: "scikit-learn", level: 75 },
        { name: "Pandas", level: 80 },
        { name: "NumPy", level: 85 },
      ],
    },
  ];

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        const allSkills = skillCategories.flatMap((category) =>
          category.skills.map((skill) => `${category.title}-${skill.name}`)
        );
        setAnimatedSkills(new Set(allSkills));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  const SkillBar = ({ skill, categoryTitle, color }: { skill: Skill; categoryTitle: string; color: string }) => {
    const skillKey = `${categoryTitle}-${skill.name}`;
    const isAnimated = animatedSkills.has(skillKey);
    
    return (
      <div className="skill-item">
        <div className="flex justify-between mb-1">
          <span className="text-white-300">{skill.name}</span>
          <span className="text-accent-primary">{skill.level}%</span>
        </div>
        <div className="w-full bg-black-600 rounded-full h-2">
          <div
            className="bg-accent-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: isAnimated ? `${skill.level}%` : "0%",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-black-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Technical <span className="text-accent-primary">Skills</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="glass-effect p-6 rounded-xl border border-black-600 hover:border-accent-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="flex items-center mb-4">
                  <i className={`${category.icon} text-accent-primary text-2xl mr-3`}></i>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      categoryTitle={category.title}
                      color={category.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
