import { useState } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    scrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full glass-effect border-b border-black-600 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-accent-primary">Sayak Sen</div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-accent-primary"
                    : "text-white-300 hover:text-accent-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button
            className="md:hidden text-white-300 hover:text-accent-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-black-600">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`block transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-accent-primary"
                    : "text-white-300 hover:text-accent-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
