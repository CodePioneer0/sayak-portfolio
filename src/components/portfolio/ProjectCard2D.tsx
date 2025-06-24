import React from "react";
import { motion } from "framer-motion";
import { Github, Link as LinkIcon } from "lucide-react";

interface ProjectCard2DProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    category: string;
    liveDemo: string;
    github: string;
  };
  index: number;
  inView: boolean;
}

const ProjectCard2D = ({ project, index, inView }: ProjectCard2DProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {" "}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-blue-700/15"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Subtle animated particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      {/* Glowing border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

      <motion.div
        className="relative backdrop-blur-md bg-black/40 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 h-full shadow-2xl"
        whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Project Image */}{" "}
        <motion.div
          className="aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative border border-blue-500/10"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-cyan-400/15"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.span
            className="text-4xl z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🚀
          </motion.span>
        </motion.div>{" "}
        <motion.h3
          className="text-xl font-bold text-white mb-3"
          whileHover={{ scale: 1.05, color: "#22d3ee" }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
        {/* Enhanced Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + techIndex * 0.05,
              }}
              whileHover={{
                scale: 1.1,
                y: -2,
                boxShadow: "0 5px 10px rgba(59, 130, 246, 0.4)",
              }}
              className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-full text-sm border border-blue-400/40 hover:border-cyan-300 transition-all duration-200 cursor-pointer backdrop-blur-sm text-blue-100"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        {/* Enhanced Action Buttons */}
        <div className="flex gap-4">
          {" "}
          <motion.a
            href={project.liveDemo}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            whileHover={{
              scale: 1.03,
              y: -2,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <LinkIcon size={16} />
            Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            className="flex-1 backdrop-blur-md bg-blue-500/10 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 border border-blue-400/30 hover:bg-blue-500/20 hover:border-cyan-300/60 transition-all duration-300"
            whileHover={{
              scale: 1.03,
              y: -2,
              backgroundColor: "rgba(59, 130, 246, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={16} />
            Code
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard2D;
