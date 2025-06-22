
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Github, Link as LinkIcon } from 'lucide-react';
import * as THREE from 'three';

const FloatingCard = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshStandardMaterial
        args={[{
          color: "#4ecdc4",
          transparent: true,
          opacity: 0.3,
          wireframe: true
        }]}
      />
    </mesh>
  );
};

interface ProjectCard3DProps {
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

const ProjectCard3D = ({ project, index, inView }: ProjectCard3DProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative perspective-1000"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={0.6} color="#4ecdc4" />
          <FloatingCard />
        </Canvas>
      </div>

      {/* Glowing border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
      
      <motion.div 
        className="relative backdrop-blur-md bg-gray-900/50 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 h-full transform-gpu"
        whileHover={{ 
          rotateX: 5, 
          rotateY: 5, 
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(78, 205, 196, 0.2)"
        }}
      >
        {/* Project Image */}
        <motion.div 
          className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.span 
            className="text-4xl z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            🚀
          </motion.span>
        </motion.div>

        <motion.h3 
          className="text-xl font-bold text-white mb-3"
          whileHover={{ scale: 1.05, color: "#4ecdc4" }}
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
                delay: (index * 0.1) + (techIndex * 0.05)
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                boxShadow: "0 5px 10px rgba(78, 205, 196, 0.3)"
              }}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-200 cursor-pointer"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-4">
          <motion.a
            href={project.liveDemo}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
            whileHover={{ 
              scale: 1.03, 
              y: -2,
              boxShadow: "0 10px 20px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <LinkIcon size={16} />
            Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            className="flex-1 backdrop-blur-md bg-white/10 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ 
              scale: 1.03, 
              y: -2,
              backgroundColor: "rgba(255, 255, 255, 0.15)"
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

export default ProjectCard3D;
