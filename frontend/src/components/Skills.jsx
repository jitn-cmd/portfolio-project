import React from 'react';
import '../styles/Skills.css';
import { Code, Mail, Database, Palette, GitBranch, TrendingUp } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      id: 1,
      icon: <Code size={40} />,
      name: 'React.js',
      description: 'Building dynamic and responsive user interfaces with modern React features'
    },
    {
      id: 2,
      icon: <Mail size={40} />,
      name: 'Email Marketing',
      description: 'Creating data-driven email campaigns that drive engagement and conversions'
    },
    {
      id: 3,
      icon: <Database size={40} />,
      name: 'MySQL & MongoDB',
      description: 'Designing and managing efficient database systems for scalable applications'
    },
    {
      id: 4,
      icon: <Code size={40} />,
      name: 'Flask & FastAPI',
      description: 'Developing robust backend APIs and server-side applications'
    },
    {
      id: 5,
      icon: <Palette size={40} />,
      name: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user experiences with modern design principles'
    },
    {
      id: 6,
      icon: <GitBranch size={40} />,
      name: 'Git & GitHub',
      description: 'Version control and collaborative development with best practices'
    },
    {
      id: 7,
      icon: <Code size={40} />,
      name: 'JavaScript & Python',
      description: 'Proficient in both frontend and backend programming languages'
    },
    {
      id: 8,
      icon: <TrendingUp size={40} />,
      name: 'Marketing Automation',
      description: 'Implementing smart automation workflows for business growth'
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">My Skills</h2>
          <p className="skills-subtitle">
            A combination of technical expertise and marketing knowledge
          </p>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <div className="skill-icon">
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
