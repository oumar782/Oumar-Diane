import { useEffect, useRef, useState } from 'react';
import './Projet.css';

const Projects = () => {
  const projectsRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projet/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setProjects(result.data);
        } else {
          throw new Error('Format de données inattendu');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, [projects]);

  if (loading) return <div className="loading">Chargement des projets...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <section id="projects" className="projects-section">
      <div className="background-decorations">
        {/* Vos éléments de décoration */}
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2>Mes projets</h2>
          <div className="title-underline"></div>
          <p>Découvrez mes réalisations récentes</p>
        </div>

        {projects.length > 0 ? (
          <div className="projects-grid reveal" ref={projectsRef}>
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card ${project.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image-container">
                  <img
                    src={project.image || '/placeholder-project.jpg'}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-project.jpg';
                    }}
                  />
                  {/* Reste du contenu de la carte */}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="technologies-list">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="technology-badge">{tech}</span>
                    ))}
                  </div>
                  <a 
                    href={project.link || '#'} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le projet
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <p>Aucun projet disponible actuellement</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;