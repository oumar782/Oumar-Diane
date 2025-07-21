import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-background">
        <div className="bg-circle bg-circle-blue"></div>
        <div className="bg-circle bg-circle-orange"></div>
        <div className="bg-circle bg-circle-purple"></div>
        <div className="bg-radial-gradient"></div>
        <div className="bg-grid-pattern"></div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text">À propos de moi</span>
            <div className="title-underline"></div>
          </h2>
          <div className="icon-circle pulse-animation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <p className="section-subtitle">
            Mon parcours, ma vision et surtout… ma passion pour le code qui change des vies.
          </p>
        </div>

        <div className="about-grid">
          {/* Main content */}
          <div className="about-main reveal" ref={aboutRef}>
            <div className="about-card card-hover-effect">
              <div className="card-decoration card-dec-top-right"></div>
              <div className="card-decoration card-dec-bottom-left"></div>
              <div className="card-corner card-corner-tr"></div>
              <div className="card-corner card-corner-bl"></div>

              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon card-icon-blue icon-hover">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                    </svg>
                  </div>
                  <h3 className="gradient-text-blue">Mon parcours</h3>
                </div>

                <div className="text-content">
                  <p className="animated-underline">
                    Je m'appelle <span className="highlight-blue">Oumar Diane</span>, développeur informatique & data analyst, passionné par le digital depuis toujours. Je crée des solutions qui ont du sens, avec une vision tournée vers l'Afrique et le monde.
                  </p>
                  <p className="animated-underline">
                    J’ai lancé des projets comme <span className="highlight-blue">Footspace Solutions</span> et <span className="highlight-blue">EngyCoord</span> pour répondre à des vrais besoins : digitaliser, simplifier et connecter.
                  </p>
                  <p className="animated-underline">
                    Génération Z oblige : je code cash, je pense grand et je rêve plus grand encore. Parce qu’au fond, chaque ligne de code peut faire bouger les lignes… et même changer des vies.
                  </p>
                </div>

                <div className="card-subsection">
                  <div className="card-header">
                    <div className="card-icon card-icon-orange icon-hover">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <h3 className="gradient-text-orange">Ma vision</h3>
                  </div>
                  <p className="text-content animated-underline">
                    Utiliser le code comme levier pour booster des projets, impacter des communautés et repousser les frontières du possible. Mon objectif ? Créer des solutions puissantes et accessibles, nées en Afrique et pensées pour le monde entier.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="about-side reveal" style={{ animationDelay: '0.3s' }}>
            <div className="info-card card-hover-effect">
              <div className="card-decoration card-dec-top-right-purple"></div>
              <div className="card-decoration card-dec-bottom-left-blue"></div>
              <div className="card-corner card-corner-br"></div>

              <div className="card-content">
                <div className="info-card-header">
                  <div className="info-card-icon floating-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m22 21-3-3m1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>
                    </svg>
                  </div>
                  <h3 className="gradient-text-purple">Informations perso</h3>
                  <div className="title-underline-small"></div>
                </div>

                <div className="info-items">
                  {[
                    { icon: "👤", label: "Nom", value: "Oumar Diane" },
                    { icon: "🎂", label: "Date de naissance", value: "13 octobre 2002" },
                    { icon: "🌍", label: "Origine", value: "Bamako, Mali" },
                    { icon: "🧑‍💻", label: "Profil", value: "Développeur informatique & Data Analyst" },
                    { icon: "🚀", label: "Objectif", value: "Créer des solutions numériques qui impactent" },
                    { icon: "💡", label: "Citation", value: "« Le code ne change pas que des lignes… il change des vies. »" }
                  ].map((item, index) => (
                    <div key={index} className="info-item hover-grow-effect">
                      <div className="info-item-content">
                        <div className="info-item-icon">{item.icon}</div>
                        <div className="info-item-text">
                          <span className="info-item-label">{item.label}</span>
                          <p className="info-item-value">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="zodiac-special">
                  <div className="zodiac-icon">♎</div>
                  <div className="zodiac-details">
                    <h4>Signe astrologique</h4>
                    <p>Balance – esprit équilibré, créatif et diplomate</p>
                    <div className="zodiac-traits">
                      <span>Créatif</span>
                      <span>Équilibré</span>
                      <span>Visionnaire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
