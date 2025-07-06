import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    function updateActiveLink() {
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id") || "";
        }
      });
      
      setActiveSection(current);
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Initial call
    
    return () => window.removeEventListener("scroll", updateActiveLink);
  }, []);

  return (
    <div className="bg-black-900 text-white-100 font-sans">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-black-900 border-t border-black-600 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-white-400 mb-4">
              © 2024 Alex Chen. All rights reserved.
            </p>
            <p className="text-white-500 text-sm">
              Built with ❤️ using React, Express.js, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
