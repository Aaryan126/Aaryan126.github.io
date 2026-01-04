import StatCounter from './StatCounter'
import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref: sectionRef, hasBeenInView } = useInView()

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <div className={`about-hero ${hasBeenInView ? 'animate-in' : ''}`}>
          <div className="about-image">
            <img src="/logo.png" alt="Aaryan Kandiah" />
          </div>
          <div className="about-intro">
            <h3>AI Engineer & Data Scientist</h3>
            <p className="intro-text">
              Passionate about leveraging artificial intelligence to solve real-world problems and create meaningful impact through innovative technology solutions.
            </p>
            <div className="about-stats">
              <StatCounter end={8} suffix="+" label="End-to-End Implementations Projects in AI & Data Science" />
              <StatCounter end={15} suffix="+" label="Python Libraries & ML Frameworks" />
              <StatCounter end={5} suffix="+" label="Certified Skills: Google, AWS, DeepLearning.AI" />
            </div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-main">
            <div className={`about-section ${hasBeenInView ? 'animate-in' : ''}`}>
              <h4><i className="fas fa-graduation-cap"></i> Education & Background</h4>
              <p>
                I am currently pursuing a Bachelor of Engineering in Electrical and Electronic Engineering at NTU, with a specialization in Data Analysis and Machine Learning. With a strong academic foundation (Honours with Distinction expected), I've built a versatile skillset through coursework, certifications, and research projects in AI fairness, data science, and computer vision.
              </p>
            </div>

            <div className={`about-section ${hasBeenInView ? 'animate-in' : ''}`} style={{ animationDelay: '0.1s' }}>
              <h4><i className="fas fa-code"></i> Technical Expertise</h4>
              <p>
                My technical strengths include Python, machine learning frameworks (PyTorch, TensorFlow), and data tools like Pandas, NumPy, and MySQL. I've applied these in diverse academic and internship settings—from predictive analytics and NLP pipelines to fairness analysis in neural networks—delivering efficient, explainable, and impactful solutions.
              </p>
            </div>

            <div className={`about-section ${hasBeenInView ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h4><i className="fas fa-lightbulb"></i> Interests & Goals</h4>
              <p>
                I'm deeply interested in building intelligent systems that learn from data and act autonomously. My passion lies in AI, particularly in designing fair and interpretable models, multi-agent systems, and data-driven decision-making pipelines. I aim to contribute to the development of ethical, adaptive AI agents that solve real-world problems—advancing the intersection of machine learning, automation, and responsible innovation.
              </p>
            </div>
          </div>

          <div className="about-sidebar">
            <div className={`info-card ${hasBeenInView ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
              <h4>Quick Facts</h4>
              <ul className="facts-list">
                <li><strong>Location:</strong> Singapore</li>
                <li><strong>University:</strong> NTU</li>
                <li><strong>Major:</strong> Electrical & Electronic Engineering</li>
                <li><strong>Specialization:</strong> Data Analysis & ML</li>
                <li><strong>Graduation:</strong> December 2025</li>
              </ul>
            </div>

            <div className={`info-card ${hasBeenInView ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
              <h4>Interests</h4>
              <div className="interests-grid">
                {['Machine Learning', 'Agentic AI', 'Computer Vision', 'Data Science', 'Basketball', 'Travel', 'Reading'].map((interest) => (
                  <span key={interest} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>

            <div className={`info-card ${hasBeenInView ? 'animate-in' : ''}`} style={{ animationDelay: '0.5s' }}>
              <h4>Currently Working On</h4>
              <p className="current-work">
                I'm currently interning as an AI Innovation Engineer, where I'm developing a multi-model AI chatbot tailored for HVAC industry use. I'm also building a secure web-based survey tool with one-time PIN access and automated Excel reporting to streamline data collection and analysis across departments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
