import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const leftRef = useScrollReveal('slideLeft', {
    duration: 0.7,
    ease: 'power3.out',
    start: 'top 98%',
  })
  const rightRef = useScrollReveal('slideRight', {
    duration: 0.7,
    delay: 0.15,
    ease: 'power3.out',
    start: 'top 98%',
  })

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-left" ref={leftRef}>
            <h2>Let's Connect</h2>
            <span className="contact-tagline">Open to opportunities, collaborations, and new ideas</span>
          </div>

          <div className="contact-right" ref={rightRef}>
            <div className="contact-links">
              <a href="mailto:aaryan001@e.ntu.edu.sg" className="contact-link">
                <i className="fas fa-envelope"></i>
                aaryan001@e.ntu.edu.sg
              </a>
              <span className="contact-link">
                <i className="fas fa-map-marker-alt"></i>
                Singapore
              </span>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/Aaryan126"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/aaryan-kandiah-b2a719213"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
