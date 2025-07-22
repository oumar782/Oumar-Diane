import { useState, useEffect, useRef } from 'react';
import { 
  Mail, MapPin, Zap, 
  Check, AlertCircle, X,
  Instagram, Facebook, Linkedin,
  Send, User, MessageSquare
} from 'lucide-react';
import './Contact.css';

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
      id: toastId
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
    setIsSubmitting(true);

    // Validation frontend
    const errors = [];
    if (!formData.name.trim()) errors.push('Le nom est requis');
    if (!formData.email.trim()) {
      errors.push('Email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email invalide');
    }
    if (!formData.message.trim()) errors.push('Le message est requis');

    if (errors.length > 0) {
      errors.forEach(error => showToast('Erreur de validation', error, 'error'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://oumarbackend.vercel.app/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message');
      }

      if (data.success) {
        showToast(
          "Message envoyé !",
          "Merci pour votre message. Je vous répondrai dès que possible."
        );
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Gestion des erreurs spécifiques de l'API
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => {
            showToast("Erreur", err, "error");
          });
        } else {
          showToast("Erreur", data.message || "Erreur inconnue", "error");
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      showToast(
        "Erreur serveur", 
        error.message || "Impossible d'envoyer le message. Veuillez réessayer plus tard.", 
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
          <button 
            className="toast-close" 
            onClick={() => setToast(null)}
            aria-label="Fermer la notification"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="section-container">
        <h2 className="section-title">
          <span className="title-gradient">Me contacter</span>
        </h2>

        <div className="contact-grid">
          {/* Colonne d'informations */}
          <div className="contact-info reveal" ref={contactRef}>
            <div className="info-header">
              <h3 className="contact-info-title">
                <span className="title-decoration">Discutons</span> de votre projet
              </h3>
              <div className="divider"></div>
            </div>
            
            <p className="contact-info-text">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
              Je suis toujours ouvert à de nouvelles opportunités et collaborations créatives.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <Mail className="icon" size={20} />
                </div>
                <div>
                  <h4 className="contact-detail-title">Email</h4>
                  <a href="mailto:contact@oumar.dev" className="contact-detail-text">
                    contact@oumar.dev
                  </a>
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
                    <a 
                      href="#" 
                      className="social-link" 
                      aria-label="Instagram"
                      data-tooltip="Instagram"
                    >
                      <Instagram size={20} className="social-icon" />
                    </a>
                    <a 
                      href="#" 
                      className="social-link" 
                      aria-label="Facebook"
                      data-tooltip="Facebook"
                    >
                      <Facebook size={20} className="social-icon" />
                    </a>
                    <a 
                      href="#" 
                      className="social-link" 
                      aria-label="LinkedIn"
                      data-tooltip="LinkedIn"
                    >
                      <Linkedin size={20} className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="contact-form reveal" ref={formRef}>
            <form onSubmit={handleSubmit} className="contact-form-container" noValidate>
              <div className="form-header">
                <h3 className="form-title">
                  <span className="title-decoration">Envoyez-moi</span> un message
                </h3>
                <div className="divider"></div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Votre nom complet"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="votre@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <MessageSquare size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-textarea"
                    placeholder="Décrivez votre projet en détails..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} className="button-icon" />
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