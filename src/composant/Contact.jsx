import { useState, useEffect, useRef } from 'react';
import { 
  Mail, MapPin, Zap, 
  Check, AlertCircle, X,
  Instagram, Facebook,
  Send, User, MessageSquare
} from 'lucide-react';
import './Contact.css';

// Composant personnalisé pour l'icône WhatsApp
const WhatsAppIcon = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
                  <a href="mailto:oumardiane399@gmail.com" className="contact-detail-text">
                    oumardiane399@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon">
                  <MapPin className="icon" size={20} />
                </div>
                <div>
                  <h4 className="contact-detail-title">Localisation</h4>
                  <p className="contact-detail-text">Casablanca, Belvedere</p>
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
                      href="https://www.instagram.com/oumar_diane/" 
                      className="social-link" 
                      aria-label="Instagram"
                      data-tooltip="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={20} className="social-icon" />
                    </a>
                    <a 
                      href="https://web.facebook.com/pdgoumar.diane" 
                      className="social-link" 
                      aria-label="Facebook"
                      data-tooltip="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={20} className="social-icon" />
                    </a>
                    <a 
                      href="https://wa.me/212721976288" 
                      className="social-link" 
                      aria-label="WhatsApp"
                      data-tooltip="WhatsApp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon size={20} className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

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