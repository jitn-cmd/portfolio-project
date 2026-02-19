import React from 'react';
import '../styles/Projects.css';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Email Campaign Dashboard',
      description: 'Advanced email marketing platform with real-time analytics, A/B testing, and automated campaign management for improved conversion rates.',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b',
      technologies: ['React', 'Python', 'MySQL', 'Email APIs']
    },
    {
      id: 2,
      title: 'Full Stack Web Application',
      description: 'Scalable web application built with modern technologies, featuring user authentication, real-time updates, and responsive design.',
      image: 'https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg',
      technologies: ['React', 'Flask', 'MongoDB', 'REST API']
    },
    {
      id: 3,
      title: 'Marketing Analytics Tool',
      description: 'Data-driven analytics platform for tracking campaign performance, customer behavior, and ROI with interactive visualizations.',
      image: 'https://images.unsplash.com/photo-1613347761493-4060c969cd28',
      technologies: ['JavaScript', 'Python', 'Data Analytics', 'Charts']
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Showcasing my best work in web development and email marketing
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <button className="project-explore-btn">
                    <span>Explore</span>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
