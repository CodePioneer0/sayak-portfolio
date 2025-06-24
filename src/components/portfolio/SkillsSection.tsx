import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SkillsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [animatedSkills, setAnimatedSkills] = useState<{
    [key: string]: number;
  }>({});

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        {
          name: "React/Next.js",
          level: 90,
          color: "from-blue-500 to-cyan-500",
        },
        { name: "TypeScript", level: 85, color: "from-blue-600 to-blue-400" },
        { name: "Tailwind CSS", level: 88, color: "from-teal-500 to-cyan-500" },
        {
          name: "Three.js/WebGL",
          level: 75,
          color: "from-purple-500 to-pink-500",
        },
        {
          name: "Framer Motion",
          level: 80,
          color: "from-pink-500 to-purple-500",
        },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        {
          name: "Node.js/Express",
          level: 82,
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "Python/Django",
          level: 78,
          color: "from-yellow-500 to-orange-500",
        },
        { name: "PostgreSQL", level: 75, color: "from-blue-500 to-indigo-500" },
        { name: "MongoDB", level: 80, color: "from-green-600 to-green-400" },
        { name: "GraphQL", level: 70, color: "from-pink-500 to-rose-500" },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git/GitHub", level: 85, color: "from-gray-600 to-gray-400" },
        { name: "Docker", level: 72, color: "from-blue-500 to-blue-600" },
        {
          name: "AWS/Vercel",
          level: 68,
          color: "from-orange-500 to-yellow-500",
        },
        {
          name: "Figma/Design",
          level: 75,
          color: "from-purple-500 to-indigo-500",
        },
        { name: "Testing/Jest", level: 70, color: "from-red-500 to-pink-500" },
      ],
    },
    {
      title: "Currently Learning",
      skills: [
        { name: "Rust", level: 45, color: "from-orange-600 to-red-600" },
        {
          name: "Machine Learning",
          level: 40,
          color: "from-indigo-500 to-purple-500",
        },
        {
          name: "Blockchain/Web3",
          level: 35,
          color: "from-yellow-500 to-orange-500",
        },
        { name: "React Native", level: 50, color: "from-blue-500 to-cyan-500" },
      ],
    },
  ];
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const animated: { [key: string]: number } = {};
        skillCategories.forEach((category) => {
          category.skills.forEach((skill) => {
            animated[skill.name] = skill.level;
          });
        });
        setAnimatedSkills(animated);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, skillCategories]);

  return (
    <section id="skills" ref={ref} className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-16 max-w-3xl mx-auto"
        >
          A comprehensive overview of my technical expertise and ongoing
          learning journey
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: categoryIndex * 0.2 + skillIndex * 0.1,
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400">
                        {animatedSkills[skill.name] || 0}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={{
                          width: inView
                            ? `${animatedSkills[skill.name] || 0}%`
                            : 0,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Skill Constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Current Focus Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Full Stack Development",
                "AI/ML Integration",
                "3D Web Experiences",
                "Performance Optimization",
              ].map((focus, index) => (
                <motion.span
                  key={focus}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-white border border-blue-500/30 hover:border-blue-400 transition-all duration-300 cursor-pointer"
                >
                  {focus}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
