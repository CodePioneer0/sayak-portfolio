import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function HeroSection() {
  const scrollTo = useSmoothScroll();

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-900 via-black-800 to-black-900 pt-20 relative overflow-hidden"
    >
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-primary rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-secondary rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent-tertiary rounded-full animate-pulse opacity-20 animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-accent-primary shadow-2xl">
            <img
              src="/profile.jpeg"
              alt="Sayak Sen - CS Engineering Student"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-3d">
            Hi, I'm <span className="text-accent-primary">Sayak Sen</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-white-300 mb-8">
            <div>
              CS Engineering Student
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-white-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Passionate about creating innovative web solutions and exploring the intersection of technology and user experience. Currently pursuing Computer Science Engineering with a focus on full-stack development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={() => scrollTo("#projects")}
              className="button-3d text-black-900 px-8 py-3 rounded-lg font-semibold"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="border-2 border-black-600 hover:border-accent-primary text-white-300 hover:text-accent-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 glass-effect"
            >
              Get In Touch
            </button>
          </div>
          
          <div className="flex justify-center space-x-6 mt-12">
            <a
              href="https://github.com/CodePioneer0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/sayak-sen-8a112412b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/LazyChief0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
              aria-label="Twitter Profile"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
