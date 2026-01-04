import { useInView } from '../hooks/useInView'

export default function Contact() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="contact-header">
          <h2>Let's Connect</h2>
          <p>Feel free to reach out for collaborations or just a friendly chat</p>
        </div>

        <div className="contact-grid">
          <a
            href="mailto:aaryan001@e.ntu.edu.sg"
            className={`contact-card ${hasBeenInView ? 'animate-in' : ''}`}
          >
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <span className="contact-label">Email</span>
            <span className="contact-value">aaryan001@e.ntu.edu.sg</span>
          </a>

          <a
            href="tel:+6587217899"
            className={`contact-card ${hasBeenInView ? 'animate-in' : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <span className="contact-label">Phone</span>
            <span className="contact-value">(+65) 8721 7899</span>
          </a>

          <div
            className={`contact-card ${hasBeenInView ? 'animate-in' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <span className="contact-label">Location</span>
            <span className="contact-value">Singapore</span>
          </div>
        </div>

        <div className="social-section">
          <a
            href="https://github.com/Aaryan126"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aaryan-kandiah-b2a719213"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  )
}
