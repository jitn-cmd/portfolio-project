import React, { useState } from 'react';
import '../styles/Contact.css';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    setStatus('Message sent successfully!');
    setTimeout(() => {
      setStatus('');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Let's collaborate on your next project or marketing campaign
          </p>
        </div>

        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              <span>Send Message</span>
              <Send size={18} />
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>

          <div className="contact-info">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Connect With Me</h3>
              <p className="contact-info-text">
                Feel free to reach out through any of these platforms
              </p>
              
              <div className="social-links">
                <a 
                  href="https://github.com/jitn-cmd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/jitendra-pal-760875372/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="mailto:jitendrapal1153@gmail.com"
                  className="social-link"
                  aria-label="Email"
                >
                  <Mail size={24} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
