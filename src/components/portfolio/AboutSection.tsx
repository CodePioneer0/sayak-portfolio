
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Background3D from './Background3D';

const AboutSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [typewriterText, setTypewriterText] = useState('');
  
  const fullText = "I'm a passionate computer science student with a love for creating innovative web solutions. Currently pursuing my degree while building real-world projects that combine creativity with technical excellence.";

  useEffect(() => {
    if (inView) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [inView, fullText]);

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Three.js', 'MongoDB',
    'Next.js', 'GraphQL', 'AWS', 'Docker', 'Git', 'Figma'
  ];

  return (
    <section id="about" ref={ref} className="min-h-screen py-20 px-4 relative overflow-hidden">
      <Background3D />
      
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-orange-900/20 to-teal-900/20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 transform-gpu will-change-transform"
          >
            <motion.div
              className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.1)"
              }}
            >
              <p className="text-lg text-gray-300 leading-relaxed min-h-[120px]">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>

            <motion.div
              className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-teal-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(78, 205, 196, 0.1)"
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Quick Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                    animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -5,
                      rotateX: 10,
                      boxShadow: "0 10px 20px rgba(255, 107, 53, 0.3)"
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-teal-500/20 rounded-full text-white border border-orange-500/30 hover:border-orange-400 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -30 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative perspective-1000"
          >
            <motion.div 
              className="relative group transform-gpu"
              whileHover={{ 
                rotateY: 5, 
                rotateX: 5, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-red-500 to-teal-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <div className="relative backdrop-blur-md bg-gray-900/50 rounded-2xl p-8 border border-white/10 transform-gpu">
                {/* Animated Profile Image Placeholder */}
                <motion.div 
                  className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-orange-500 via-red-500 to-teal-500 rounded-full flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-teal-400/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-6xl font-bold text-white z-10">SS</span>
                </motion.div>
                
                <div className="text-center">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sayak Sen
                  </motion.h3>
                  <motion.p 
                    className="text-orange-400 mb-4"
                    whileHover={{ color: "#4ecdc4" }}
                  >
                    Computer Science and Technology
                  </motion.p>
                  <p className="text-gray-300 text-sm">
                    IIEST,Shibpur<br />
                    Expected Graduation: 2027
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
