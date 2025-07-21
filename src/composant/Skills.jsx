import { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);
  const progressContainerRef = useRef(null);
  const cardRefs = useRef([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skills-active');
            
            if (entry.target.classList.contains('skills-progress-container')) {
              const progressBars = entry.target.querySelectorAll('.skills-progress-bar-fill');
              progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (progressContainerRef.current) observer.observe(progressContainerRef.current);
    
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
      if (progressContainerRef.current) observer.unobserve(progressContainerRef.current);
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  
  const addToCardRefs = (el, index) => {
    if (el) cardRefs.current[index] = el;
  };
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "WordPress", "React js", "Next.js", "Tailwindcss"],
      iconClass: "skills-icon skills-icon-amber",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
        </svg>
      )
    },
    {
      title: "Backend",
      skills: ["PHP", "Python", "Node.js (Express)", "Java"],
      iconClass: "skills-icon skills-icon-blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6" y2="6"></line>
          <line x1="6" y1="18" x2="6" y2="18"></line>
        </svg>
      )
    },
    {
      title: "Base de données",
      skills: ["PostgreSQL","Mysql"],
      iconClass: "skills-icon skills-icon-emerald",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      )
    },
    {
      title: "Autres",
      skills: ["API REST", "Web/Desktop", "Power BI", "Google Colab"],
      iconClass: "skills-icon skills-icon-purple",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    }
  ];
  
  const proficiencyData = [
    { name: "Développement Web", percent: 85, color: "skills-progress-blue" },
    { name: "Développement Backend", percent: 75, color: "skills-progress-emerald" },
    { name: "Analyse de données", percent: 70, color: "skills-progress-amber" },
    { name: "Web Scraping / Data Mining", percent: 65, color: "skills-progress-purple" }
  ];
  
  return (
    <section id="skills" className="skills-section">
      <div className="skills-section-container">
        <h2 className="skills-section-title">
          <span className="skills-title-text">Mes compétences</span>
          <span className="skills-title-underline"></span>
        </h2>
        
        <div className="skills-grid" ref={skillsRef}>
          {skillCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="skills-card"
              ref={el => addToCardRefs(el, index)}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className={category.iconClass}>
                {category.icon}
              </div>
              <h3 className="skills-category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <span key={skill} className="skills-badge">
                    <span className="skills-badge-text">{skill}</span>
                    <span className="skills-badge-hover"></span>
                  </span>
                ))}
              </div>
              <div className="skills-card-decoration"></div>
            </div>
          ))}
        </div>
        
        <div className="skills-proficiency-section">
          <h3 className="skills-proficiency-title">
            <span>Niveau de maîtrise</span>
          </h3>
          
          <div className="skills-progress-container" ref={progressContainerRef}>
            {proficiencyData.map((skill, index) => (
              <div key={skill.name} className="skills-progress-item" style={{ '--delay': `${0.4 + index * 0.1}s` }}>
                <div className="skills-progress-info">
                  <span className="skills-progress-name">{skill.name}</span>
                  <span className="skills-progress-percent">{skill.percent}%</span>
                </div>
                <div className="skills-progress-bar">
                  <div 
                    className={`skills-progress-bar-fill ${skill.color}`}
                    data-width={`${skill.percent}%`}
                  >
                    <div className="skills-progress-bar-shine"></div>
                    <div className="skills-progress-bar-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;