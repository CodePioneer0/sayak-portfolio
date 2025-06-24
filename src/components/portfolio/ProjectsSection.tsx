import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard2D from "./ProjectCard2D";
import SimpleCodeMatrix from "./SimpleCodeMatrix";

const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and secure payment processing.",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      liveDemo: "#",
      github: "#",
    },
    {
      id: 2,
      title: "AI Task Manager",
      description:
        "Intelligent task management app with ML-powered priority suggestions and productivity analytics.",
      image: "/placeholder.svg",
      tech: ["React", "Python", "TensorFlow", "FastAPI"],
      category: "AI/ML",
      liveDemo: "#",
      github: "#",
    },
    {
      id: 3,
      title: "3D Portfolio Website",
      description:
        "Interactive portfolio showcasing 3D animations and immersive user experiences.",
      image: "/placeholder.svg",
      tech: ["Three.js", "React", "GSAP", "WebGL"],
      category: "Frontend",
      liveDemo: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Real-time Chat App",
      description:
        "Modern chat application with video calls, file sharing, and end-to-end encryption.",
      image: "/placeholder.svg",
      tech: ["Socket.io", "React", "Node.js", "WebRTC"],
      category: "Full Stack",
      liveDemo: "#",
      github: "#",
    },
    {
      id: 5,
      title: "Data Visualization Dashboard",
      description:
        "Interactive dashboard for complex data analysis with real-time charts and insights.",
      image: "/placeholder.svg",
      tech: ["D3.js", "React", "PostgreSQL", "Express"],
      category: "Data Science",
      liveDemo: "#",
      github: "#",
    },
    {
      id: 6,
      title: "Mobile Weather App",
      description:
        "Beautiful weather app with location-based forecasts and animated weather icons.",
      image: "/placeholder.svg",
      tech: ["React Native", "Redux", "OpenWeather API"],
      category: "Mobile",
      liveDemo: "#",
      github: "#",
    },
  ];

  const filters = [
    "All",
    "Full Stack",
    "Frontend",
    "AI/ML",
    "Data Science",
    "Mobile",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      <SimpleCodeMatrix className="opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-950/40 to-slate-900/60" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto"
        >
          A showcase of my technical skills and creative problem-solving through
          diverse web development projects
        </motion.p>

        {/* Enhanced Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg border border-blue-400/30"
                  : "bg-black/20 text-slate-300 border border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-400/40"
              }`}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow:
                  activeFilter === filter
                    ? "0 15px 30px rgba(59, 130, 246, 0.4)"
                    : "0 10px 20px rgba(59, 130, 246, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard2D
              key={project.id}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
