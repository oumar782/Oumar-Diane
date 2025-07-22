import React, { useEffect, useRef } from 'react';
import './Hero.css';
import oumarImage from '../assets/images/moi.jpg';

const OumarHero = () => {
  const oumarHeroRef = useRef(null);
  const oumarTypingRef = useRef(null);
  const oumarBlobRefs = useRef([]);
  const oumarParticleRefs = useRef([]);

  useEffect(() => {
    // Animation d'écriture
    if (oumarTypingRef.current) {
      const text = "Oumar Diané";
      const element = oumarTypingRef.current;
      element.textContent = "";
      let i = 0;

      const typeWriter = () => {
        if (i < text.length) {
          element.textContent = text.substring(0, i+1);
          i++;
          setTimeout(typeWriter, 150);
        }
      };
      setTimeout(typeWriter, 500);
    }

    // Animation des éléments
    oumarBlobRefs.current.forEach((blob, index) => {
      blob.style.animation = `oumarFloat ${15 + Math.random() * 10}s infinite ${index * 3}s ease-in-out`;
    });

    oumarParticleRefs.current.forEach((particle, index) => {
      particle.style.animation = `oumarFloatParticle ${20 + Math.random() * 20}s infinite ${index * 5}s linear`;
    });

  }, []);

  return (
    <section id="home" className="oumar-hero-section">
      <div className="oumar-background-elements">
        {[...Array(5)].map((_, i) => (
          <div key={`oumar-blob-${i}`} ref={el => oumarBlobRefs.current[i] = el} className={`oumar-blob oumar-blob-${i+1}`} />
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div
            key={`oumar-particle-${i}`}
            ref={el => oumarParticleRefs.current[i] = el}
            className="oumar-particle"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
        
        <div className="oumar-grid-pattern" />
        <div className="oumar-light-effect" />
      </div>

      <div className="oumar-section-container">
        <div className="oumar-content-wrapper">
          <div className="oumar-text-content" ref={oumarHeroRef}>
            <div className="oumar-status-badge">
              <div className="oumar-status-dot" />
              <span>Developpeur informatique et Data Analyst</span>
            </div>

            <h2 className="oumar-greeting">Bonjour, je m'appelle</h2>
            <h1 ref={oumarTypingRef} className="oumar-name-title" />
            
            <div className="oumar-separator">
              <div className="oumar-line" />
              <div className="oumar-dot" />
            </div>

            <p className="oumar-description">
              Développeur informatique & Data Analyst, passionné par la création de solutions numériques puissantes et accessibles, avec une vision tournée vers l'Afrique et le monde.
              <br/>
              <em style={{ color: 'var(--oumar-accent)' }}>« Parce que le code ne change pas que des lignes… il change des vies. »</em>
            </p>

            <div className="oumar-action-buttons">
              <a href="#projet" className="oumar-primary-btn">
                Voir mes projets <span>→</span>
              </a>
              <a href="#contact" className="oumar-secondary-btn">
                Me contacter
              </a>
            </div>

            <div className="oumar-info-cards">
              <div className="oumar-info-card">
                <span className="oumar-label">NÉ LE</span>
                <span className="oumar-value">13 octobre 2002</span>
              </div>
              <div className="oumar-info-card">
                <span className="oumar-label">ORIGINE</span>
                <span className="oumar-value">Bamako, Mali</span>
              </div>
            </div>
          </div>

          <div className="oumar-image-content">
            <div className="oumar-image-wrapper">
              <img 
                src={oumarImage} 
                alt="Oumar Diané" 
                className="oumar-profile-image"
              />
              <div className="oumar-image-glow" />
              <div className="oumar-image-halo" />
              <div className="oumar-image-border" />
              <div className="oumar-image-reflection" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OumarHero;