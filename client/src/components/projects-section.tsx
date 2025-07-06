export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "ShopSphere",
      description: "A full-stack e-commerce platform with user authentication, payment integration, and admin dashboard. Built with modern web technologies.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "React", color: "bg-blue-600/20 text-blue-400" },
        { name: "Node.js", color: "bg-green-600/20 text-green-400" },
        { name: "MongoDB", color: "bg-yellow-600/20 text-yellow-400" },
        { name: "Stripe", color: "bg-purple-600/20 text-purple-400" },
      ],
    },
    {
      id: 2,
      title: "TaskFlow",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "Vue.js", color: "bg-blue-600/20 text-blue-400" },
        { name: "Laravel", color: "bg-red-600/20 text-red-400" },
        { name: "MySQL", color: "bg-orange-600/20 text-orange-400" },
        { name: "Socket.io", color: "bg-teal-600/20 text-teal-400" },
      ],
    },
    {
      id: 3,
      title: "WeatherWise",
      description: "A responsive weather dashboard with interactive charts, location-based forecasts, and severe weather alerts using real-time API data.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "JavaScript", color: "bg-yellow-600/20 text-yellow-400" },
        { name: "Chart.js", color: "bg-red-600/20 text-red-400" },
        { name: "OpenWeather API", color: "bg-blue-600/20 text-blue-400" },
        { name: "PWA", color: "bg-purple-600/20 text-purple-400" },
      ],
    },
    {
      id: 4,
      title: "SocialInsights",
      description: "A comprehensive social media analytics platform with sentiment analysis, engagement tracking, and automated reporting features.",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "Python", color: "bg-green-600/20 text-green-400" },
        { name: "Django", color: "bg-blue-600/20 text-blue-400" },
        { name: "TensorFlow", color: "bg-purple-600/20 text-purple-400" },
        { name: "Redis", color: "bg-red-600/20 text-red-400" },
      ],
    },
    {
      id: 5,
      title: "FitTrack Pro",
      description: "A mobile-first fitness tracking application with workout logging, progress visualization, and social sharing capabilities.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "React Native", color: "bg-blue-600/20 text-blue-400" },
        { name: "Express.js", color: "bg-green-600/20 text-green-400" },
        { name: "Firebase", color: "bg-yellow-600/20 text-yellow-400" },
        { name: "Chart.js", color: "bg-purple-600/20 text-purple-400" },
      ],
    },
    {
      id: 6,
      title: "CodeCollab",
      description: "A real-time collaborative code editor with syntax highlighting, version control integration, and video chat functionality for pair programming.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: [
        { name: "Next.js", color: "bg-orange-600/20 text-orange-400" },
        { name: "Socket.io", color: "bg-teal-600/20 text-teal-400" },
        { name: "Monaco Editor", color: "bg-gray-600/20 text-gray-400" },
        { name: "WebRTC", color: "bg-blue-600/20 text-blue-400" },
      ],
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="text-accent-primary">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-effect rounded-xl border border-black-600 overflow-hidden group hover:border-accent-primary/50 transition-all duration-300 card-3d"
              >
                <img
                  src={project.image}
                  alt={`${project.title} Project`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-accent-primary">{project.title}</h3>
                  <p className="text-white-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className={`${tech.color} px-3 py-1 rounded-full text-sm`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 flex items-center space-x-1"
                    >
                      <i className="fab fa-github"></i>
                      <span>Code</span>
                    </a>
                    <a
                      href="#"
                      className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 flex items-center space-x-1"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center space-x-2 text-accent-primary hover:text-accent-secondary transition-colors duration-300 text-lg font-semibold"
            >
              <span>View All Projects</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
