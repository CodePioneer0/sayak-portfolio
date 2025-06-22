
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

const EducationSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      school: 'Indian Institute of Engineering and Technology,Shibpur',
      period: '2023 - 2027',
      gpa: '9.18/10',
      status: 'In Progress',
      description: 'Specializing in Software Engineering',
      coursework: [
        'Data Structures & Algorithms',
        'Object Oriented Programming',
        'Database Systems',
        'Machine Learning',
        'Networking Theory',
        'Computer Graphics'
      ],
      achievements: [
        'Finalist Hackathon Instruo - Tech Fest 2025',
        'Valorant Tournament Winner - Revelation 2025'
      ]
    },
    {
      degree: 'High School',
      school: 'Techno India Group Public School,Hooghly',
      period: '2021 - 2023',
      gpa: '9.79/10',
      status: 'Completed',
      description: 'Graduated Valedictorian with focus on STEM subjects',
      coursework: [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Computer Science',
        'English',
        'Psychology'
      ],
      achievements: [
        'Valedictorian',
        'National Honor Society',
        'House Captain',
        'Math Olympiad State Champion'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2026',
      icon: '☁️'
    },
    {
      name: 'ML March Certification',
      issuer: 'CodeIIEST',
      date: '2024',
      icon: '⚛️'
    }
  ];

  return (
    <section id="education" ref={ref} className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Education & Achievements
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-16 max-w-3xl mx-auto"
        >
          My academic journey and continuous learning in computer science and technology
        </motion.p>

        {/* Education Timeline */}
        <div className="space-y-12 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900"></div>

              <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="text-purple-400" size={24} />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      edu.status === 'In Progress' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-purple-400 text-lg font-medium mb-2">{edu.school}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={16} />
                      CGPA: {edu.gpa}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{edu.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <BookOpen size={16} />
                        Key Coursework
                      </h4>
                      <ul className="space-y-1">
                        {edu.coursework.map((course, i) => (
                          <li key={i} className="text-gray-400 text-sm">• {course}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Award size={16} />
                        Achievements
                      </h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-400 text-sm">• {achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-white">
            Certifications & Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h4 className="text-white font-semibold mb-2">{cert.name}</h4>
                <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                <p className="text-purple-400 text-sm">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
