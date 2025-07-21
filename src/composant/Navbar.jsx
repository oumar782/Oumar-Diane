import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css'; // Nous allons créer ce fichier CSS

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll fluide vers la section
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Ferme le menu mobile si ouvert
  };

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projets' },   // <-- corrigé
    { name: 'Contact', href: '#contact' },   // <-- corrigé
  ];
            
  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <a href="#" className="logo-link">
              <span className="logo-text">
                Oumar Diane
              </span>
              <div className="logo-underline"></div>
            </a>
          </div>
          
          <div className="desktop-nav">
            <div className="nav-links">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  <span className="nav-link-text">{link.name}</span>
                  <div className="nav-link-bg"></div>
                  <div className="nav-link-underline"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="menu-button"
            >
              <div className="menu-icon">
                <span className={`menu-line top-line ${isOpen ? 'open' : ''}`}></span>
                <span className={`menu-line middle-line ${isOpen ? 'open' : ''}`}></span>
                <span className={`menu-line bottom-line ${isOpen ? 'open' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="mobile-nav-link"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;