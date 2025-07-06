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
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
            alt="Alex Chen - CS Engineering Student"
            className="w-32 h-32 rounded-full mx-auto mb-8 ring-4 ring-accent-primary/30 shadow-2xl animate-fade-in hover-lift"
          />
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Hi, I'm <span className="text-accent-primary">Alex Chen</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-white-300 mb-8 h-8 overflow-hidden">
            <div className="animate-typing whitespace-nowrap">
              CS Engineering Student & Web Developer
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-white-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Passionate about creating innovative web solutions and exploring the intersection of technology and user experience. Currently pursuing Computer Science Engineering with a focus on full-stack development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={() => scrollTo("#projects")}
              className="bg-accent-primary hover:bg-accent-secondary text-black-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-primary/25 hover-lift"
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
              href="#"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="#"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="#"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-white-400 hover:text-accent-primary text-2xl transition-colors duration-300 transform hover:scale-110"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
