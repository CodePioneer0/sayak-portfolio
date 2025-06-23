import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GravitationalLensing from "./GravitationalLensing";

const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gravitational Lensing 3D Background */}
      <GravitationalLensing />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-teal-900/30" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="transform-gpu will-change-transform"
      >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-teal-400 bg-clip-text text-transparent">
              Sayak Sen
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-4xl text-gray-300 mb-4">
              Student in Tech
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences with cutting-edge technologies and
              creative problem-solving
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="space-x-4"
          >
            <motion.button
              onClick={scrollToNext}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-teal-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
            </motion.button>

            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 inline-block backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "rgba(255, 255, 255, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        whileHover={{ scale: 1.2 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mb-2">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <ChevronDown className="text-white w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
