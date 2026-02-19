import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">Jitendra Pal</span>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <button className="navbar-link" onClick={() => scrollToSection('home')}>
            Home
          </button>
          <button className="navbar-link" onClick={() => scrollToSection('skills')}>
            Skills
          </button>
          <button className="navbar-link" onClick={() => scrollToSection('projects')}>
            Projects
          </button>
          <button className="navbar-link" onClick={() => scrollToSection('contact')}>
            Contact
          </button>
        </div>

        <button className="navbar-hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
