import { useInView } from '../hooks/useInView'

const projects = [
  {
    title: 'US Traffic Accident Analysis',
    icon: '🚗',
    description: 'Applied Python programming to perform EDA and utilized Decision Tree, Random Forest, and SVM models for predicting accident location and severity. Achieved highest accuracy with Random Forest classification.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    link: 'https://github.com/Aaryan126/AccidentSeverityProject-USA-Analysis',
  },
  {
    title: 'Sentiment Analysis of Product Reviews',
    icon: '📝',
    description: 'Designed sentiment analysis pipeline using Python and NLP to classify product reviews. Compared Logistic Regression, LSTM, and fine-tuned BERT models, achieving highest accuracy with BERT.',
    tech: ['Python', 'BERT', 'LSTM', 'NLP'],
    link: 'https://github.com/Aaryan126/Sentiment-Product-Review',
  },
  {
    title: 'Ship Navigation System',
    icon: '🚢',
    description: 'Global and local path planning system for efficient ship navigation with obstacle avoidance using PyQt5 interface.',
    tech: ['Python', 'PyQt5', 'Sci-Kit Learn'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
  },
  {
    title: 'Brain Tumor Detection',
    icon: '🧠',
    description: 'Enhanced brain tumor classification using dimensionality reduction techniques and computer vision.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
  },
  {
    title: 'Semantic Book Recommendation',
    icon: '📖',
    description: 'LLM-powered book recommendation system using OpenAI embeddings and vector storage.',
    tech: ['Python', 'LangChain', 'OpenAI'],
    link: 'https://github.com/Aaryan126/Semantic-Book-Recommendation',
  },
  {
    title: 'Data Cleaning & EDA',
    icon: '🗃️',
    description: 'Comprehensive data cleaning and exploratory analysis of layoffs dataset using MySQL.',
    tech: ['MySQL', 'Data Analysis', 'SQL'],
    link: 'https://github.com/Aaryan126/Data-cleaning-Exploratory-Data-Analysis-MySQL',
  },
]

export default function Projects() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Some of my work</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card ${hasBeenInView ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.open(project.link, '_blank')}
            >
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <h3>{project.title}</h3>
              </div>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
