export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Google Sheets to PDF Invoice Automation",
      description: "Developed a Node.js application to automate the generation of PDF invoices for society payments using data retrieved from Google Sheets.",
      image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      github: "https://github.com/CodePioneer0/Google-Sheets",
      liveDemo: "",
      technologies: [
        { name: "Google Sheets Api", color: "bg-blue-600/20 text-blue-400" },
        { name: "Node.js", color: "bg-green-600/20 text-green-400" },
        { name: "Nodemailer.js", color: "bg-yellow-600/20 text-yellow-400" },
        { name: "PDFkit.js", color: "bg-purple-600/20 text-purple-400" },
      ],
    },
    {
      id: 2,
      title: "Listly",
      description: "Built a full-stack React.js task management app with CRUD operations, priority levels, and status filtering features.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      github: "https://github.com/CodePioneer0/TaskFlow",
      liveDemo: "https://listly-a-task-planner.vercel.app",
      technologies: [
        { name: "React.js", color: "bg-blue-600/20 text-blue-400" },
        { name: "HTML", color: "bg-red-600/20 text-red-400" },
        { name: "CSS", color: "bg-orange-600/20 text-orange-400" },
        { name: "Javascript", color: "bg-teal-600/20 text-teal-400" },
      ],
    },
    {
      id: 3,
      title: "ClimateCompass",
      description: "ClimateCompass is a modern weather application designed to provide users with real-time weather information and forecasts. Built using HTML, CSS, JavaScript and RapidApi this app offers a seamless and intuitive user experience.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      github: "https://github.com/CodePioneer0/ClimateCompass---A-Weather-WebApp",
      liveDemo: "https://climate-compass-a-weather-web-app.vercel.app",
      technologies: [
        { name: "JavaScript", color: "bg-yellow-600/20 text-yellow-400" },
        { name: "HTML", color: "bg-red-600/20 text-red-400" },
        { name: "Rapid API", color: "bg-blue-600/20 text-blue-400" },
        { name: "BootStrap", color: "bg-purple-600/20 text-purple-400" },
      ],
    },
    {
      id: 4,
      title: "StreamVibes",
      description: "Designed a backend of a social media like youtube platform that provides real-time video streaming, user authentication, playlist management, tweeting, and comment features.",
      image: "https://images.unsplash.com/photo-1610433572201-110753c6cff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      github: "https://github.com/CodePioneer0/Backend-repo",
      liveDemo: "",
      technologies: [
        { name: "Node.js", color: "bg-green-600/20 text-green-400" },
        { name: "MongoDB", color: "bg-blue-600/20 text-blue-400" },
        { name: "Express.js", color: "bg-purple-600/20 text-purple-400" },
        { name: "React.js", color: "bg-red-600/20 text-red-400" },
      ],
    }
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
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 flex items-center space-x-1"
                    >
                      <i className="fab fa-github"></i>
                      <span>Code</span>
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 flex items-center space-x-1"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="https://github.com/CodePioneer0?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
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
