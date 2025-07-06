export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="text-accent-primary">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-accent-primary">Education & Background</h3>
              <p className="text-white-300 text-lg leading-relaxed mb-6">
                I'm currently pursuing my Bachelor's degree in Computer Science Engineering at XYZ University, where I maintain a 3.8 GPA while actively participating in coding competitions and hackathons.
              </p>
              <p className="text-white-300 text-lg leading-relaxed mb-8">
                My journey in programming started in high school, and since then, I've been fascinated by the power of code to solve real-world problems. I specialize in full-stack web development with a particular interest in modern JavaScript frameworks and cloud technologies.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-graduation-cap text-accent-primary text-xl"></i>
                  <span className="text-white-300">Computer Science Engineering - Expected 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-accent-primary text-xl"></i>
                  <span className="text-white-300">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-trophy text-accent-primary text-xl"></i>
                  <span className="text-white-300">Dean's List 2022-2023</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="Computer Science Lab"
                className="rounded-xl shadow-lg w-full h-auto hover-lift"
              />
              
              <div className="glass-effect p-6 rounded-xl border border-black-600 hover-lift">
                <h4 className="text-xl font-semibold mb-4 text-accent-primary">Current Focus</h4>
                <ul className="space-y-2 text-white-300">
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-code text-accent-primary"></i>
                    <span>Full-Stack Web Development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-cloud text-accent-secondary"></i>
                    <span>Cloud Computing & DevOps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-mobile-alt text-accent-tertiary"></i>
                    <span>Mobile App Development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-robot text-accent-primary"></i>
                    <span>Machine Learning & AI</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
