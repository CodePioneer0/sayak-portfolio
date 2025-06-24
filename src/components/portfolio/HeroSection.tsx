import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SimpleCodeMatrix from "./SimpleCodeMatrix";

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
      {" "}
      {/* 2D Code Matrix Background */}
      <SimpleCodeMatrix /> {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-950/30 to-slate-900/50" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-950/20 to-black/80" />
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {" "}
        <motion.div
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
            {" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
              Sayak Sen
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8"
          >
            {" "}
            <h2 className="text-2xl md:text-4xl text-blue-100 mb-4 font-light">
              Student in Tech
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
            {" "}
            <motion.button
              onClick={scrollToNext}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 backdrop-blur-sm border border-blue-400/20"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
            </motion.button>
            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-blue-400/40 text-white rounded-full font-semibold text-lg hover:bg-blue-500/20 transition-all duration-300 inline-block backdrop-blur-sm hover:border-cyan-300/60"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "rgba(34, 211, 238, 0.8)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
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
        {" "}
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-blue-400/60 rounded-full flex justify-center mb-2">
            <motion.div
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <ChevronDown className="text-blue-400 w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
