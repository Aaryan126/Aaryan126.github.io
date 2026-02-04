import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const personalProjects = [
  {
    title: 'AlphaDrop',
    icon: 'fa-wand-magic-sparkles',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    description: 'Chrome extension for AI-powered background removal that runs entirely in your browser. Fast, private, and free - no uploads to external servers.',
    tech: ['Chrome Extension', 'JavaScript', 'RMBG 1.4', 'Canvas API'],
    link: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    linkType: 'chrome',
  },
]

const academicProjects = [
  {
    title: 'US Traffic Accident Analysis',
    icon: 'fa-car-burst',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    description: 'Applied Python programming to perform EDA and utilized Decision Tree, Random Forest, and SVM models for predicting accident location and severity.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    link: 'https://github.com/Aaryan126/AccidentSeverityProject-USA-Analysis',
    linkType: 'github',
  },
  {
    title: 'Sentiment Analysis of Product Reviews',
    icon: 'fa-comment-dots',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    description: 'Designed sentiment analysis pipeline using Python and NLP to classify product reviews. Compared Logistic Regression, LSTM, and fine-tuned BERT models.',
    tech: ['Python', 'BERT', 'LSTM', 'NLP'],
    link: 'https://github.com/Aaryan126/Sentiment-Product-Review',
    linkType: 'github',
  },
  {
    title: 'Ship Navigation System',
    icon: 'fa-ship',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    description: 'Global and local path planning system for efficient ship navigation with obstacle avoidance using PyQt5 interface.',
    tech: ['Python', 'PyQt5', 'Scikit-Learn'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
    linkType: 'github',
  },
  {
    title: 'Brain Tumor Detection',
    icon: 'fa-brain',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    description: 'Enhanced brain tumor classification using dimensionality reduction techniques and computer vision.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
    linkType: 'github',
  },
  {
    title: 'Semantic Book Recommendation',
    icon: 'fa-book',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    description: 'LLM-powered book recommendation system using OpenAI embeddings and vector storage.',
    tech: ['Python', 'LangChain', 'OpenAI'],
    link: 'https://github.com/Aaryan126/Semantic-Book-Recommendation',
    linkType: 'github',
  },
  {
    title: 'Data Cleaning & EDA',
    icon: 'fa-database',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    description: 'Comprehensive data cleaning and exploratory analysis of layoffs dataset using MySQL.',
    tech: ['MySQL', 'Data Analysis', 'SQL'],
    link: 'https://github.com/Aaryan126/Data-cleaning-Exploratory-Data-Analysis-MySQL',
    linkType: 'github',
  },
]

function ProjectCard({ project, index, hasBeenInView }) {
  return (
    <div
      className={`project-card ${hasBeenInView ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="project-header">
        <div className="project-icon" style={{ background: project.gradient }}>
          <i className={`fa-solid ${project.icon}`}></i>
        </div>
        <h3>{project.title}</h3>
      </div>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <a
        href={project.link}
        className="project-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.linkType === 'chrome' ? (
          <>
            <i className="fa-brands fa-chrome"></i>
            Chrome Web Store
          </>
        ) : (
          <>
            <i className="fa-brands fa-github"></i>
            View on GitHub
          </>
        )}
        <i className="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('personal')
  const { ref, hasBeenInView } = useInView()

  const projects = activeTab === 'personal' ? personalProjects : academicProjects

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <p>A selection of my work</p>
        </div>

        <div className={`projects-tabs ${hasBeenInView ? 'animate-in' : ''}`}>
          <button
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </button>
          <button
            className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            Academic
          </button>
          <div
            className="tab-indicator"
            style={{ transform: activeTab === 'personal' ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              hasBeenInView={hasBeenInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
