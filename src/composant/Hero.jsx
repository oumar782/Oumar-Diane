import React, { useEffect, useRef } from 'react';
import './Hero.css';
import heroImage from '../assets/images/moi.jpg';

const Hero = () => {
  const heroRef = useRef(null);
  const typingRef = useRef(null);
  const blobRefs = useRef([]);
  const particleRefs = useRef([]);

  useEffect(() => {
    // Animation d'écriture
    if (typingRef.current) {
      const text = "Oumar Diané";
      const element = typingRef.current;
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
    blobRefs.current.forEach((blob, index) => {
      blob.style.animation = `float ${15 + Math.random() * 10}s infinite ${index * 3}s ease-in-out`;
    });

    particleRefs.current.forEach((particle, index) => {
      particle.style.animation = `floatParticle ${20 + Math.random() * 20}s infinite ${index * 5}s linear`;
    });

  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="background-elements">
        {[...Array(5)].map((_, i) => (
          <div key={`blob-${i}`} ref={el => blobRefs.current[i] = el} className={`blob blob-${i+1}`} />
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            ref={el => particleRefs.current[i] = el}
            className="particle"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
        
        <div className="grid-pattern" />
        <div className="light-effect" />
      </div>

      <div className="section-container">
        <div className="hero-content-wrapper">
          <div className="text-content" ref={heroRef}>
            <div className="status-badge">
              <div className="status-dot" />
              <span>Developpeur informatique et Data Analyst</span>
            </div>

            <h2 className="greeting">Bonjour, je m'appelle</h2>
            <h1 ref={typingRef} className="name-title" />
            
            <div className="separator">
              <div className="line" />
              <div className="dot" />
            </div>

            <p className="description">
          Développeur informatique & Data Analyst, passionné par la création de solutions numériques puissantes et accessibles, avec une vision tournée vers l’Afrique et le monde.
          <br/>
          <em style={{ color: 'red' }}>« Parce que le code ne change pas que des lignes… il change des vies. »</em>
          </p>


            <div className="action-buttons">
              <button className="primary-btn">
                Voir mes projets <span>→</span>
              </button>
              <button className="secondary-btn">
                Me contacter
              </button>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <span className="label">NÉ LE</span>
                <span className="value">13 octobre 2002</span>
              </div>
              <div className="info-card">
                <span className="label">ORIGINE</span>
                <span className="value">Bamako, Mali</span>
              </div>
            </div>
          </div>

          <div className="image-content">
            <div className="image-wrapper">
              <img 
                src={heroImage} 
                alt="Oumar Diané" 
                className="profile-image"
              />
              <div className="image-glow" />
              <div className="image-halo" />
              <div className="image-border" />
              <div className="image-reflection" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 