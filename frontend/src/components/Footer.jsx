import React from 'react';
import '../styles/Footer.css';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} Jitendra Pal. Made with <Heart size={16} className="footer-heart" /> and dedication.
        </p>
        <p className="footer-subtext">
          Full Stack Developer & Email Marketing Specialist
        </p>
      </div>
    </footer>
  );
};

export default Footer;
