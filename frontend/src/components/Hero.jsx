import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text-content">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">Jitendra Pal</span>
            </h1>
            <h2 className="hero-subtitle">
              Email Marketing Specialist | Full Stack Developer
            </h2>
            <p className="hero-description">
              Full Stack Developer & Email Marketer focused on building scalable web applications 
              and driving business growth through smart automation and data-driven email campaigns.
            </p>
            <div className="hero-buttons">
              <button 
                className="hero-button hero-button-primary"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </button>
              <button 
                className="hero-button hero-button-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src="https://customer-assets.emergentagent.com/job_profile-hub-172/artifacts/1zy24i0k_jeet1221.jpg" 
              alt="Jitendra Pal - Email Marketing Specialist"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
