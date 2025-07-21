import { useState, useEffect, useRef } from 'react';
import { 
  Mail, MapPin, Zap, 
  Check, AlertCircle, X,
  Instagram, Facebook, Linkedin,
  Send
} from 'lucide-react';
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const contactRef = useRef(null);
  const formRef = useRef(null);

  // Animation d'apparition
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (contactRef.current) observer.observe(contactRef.current);
    if (formRef.current) observer.observe(formRef.current);
    
    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  // Gestion des toasts
  const showToast = (title, description, type = 'success') => {
    const toastId = Date.now();
    setToast({ 
      title, 
      description, 
      type,
      id: toastId,
      onClose: () => setToast(null)
    });
    
    setTimeout(() => {
      setToast(prev => prev?.id === toastId ? null : prev);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Champs manquants", "Veuillez remplir tous les champs", "error");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast("Email invalide", "Veuillez entrer une adresse email valide", "error");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast(
        "Message envoyé !", 
        "Merci pour votre message. Je vous répondrai dès que possible."
      );
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      showToast(
        "Erreur d'envoi", 
        "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
          </div>
          <div className="toast-content">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.description}</p>
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="section-container">
        <h2 className="section-title">Me contacter</h2>
        
        <div className="contact-grid">
          {/* Colonne d'informations */}
          <div className="contact-info reveal" ref={contactRef}>
            <h3 className="contact-info-title">Discutons de votre projet</h3>
            <p className="contact-info-text">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter. 
              Je suis toujours ouvert à de nouvelles opportunités et collaborations.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <Mail className="icon" size={20} />
                </div>
                <div>
                  <h4 className="contact-detail-title">Email</h4>
                  <p className="contact-detail-text">contact@oumar.dev</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <MapPin className="icon" size={20} />
                </div>
                <div>
                  <h4 className="contact-detail-title">Localisation</h4>
                  <p className="contact-detail-text">Bamako, Mali</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <Zap className="icon" size={20} />
                </div>
                <div>
                  <h4 className="contact-detail-title">Réseaux sociaux</h4>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Instagram">
                      <Instagram size={20} className="social-icon" />
                    </a>
                    <a href="#" className="social-link" aria-label="Facebook">
                      <Facebook size={20} className="social-icon" />
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <Linkedin size={20} className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="contact-form reveal" ref={formRef}>
            <form onSubmit={handleSubmit} className="contact-form-container">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="form-textarea"
                  placeholder="Décrivez votre projet en détails..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;