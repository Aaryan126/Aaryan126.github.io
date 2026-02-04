import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const personalProjects = [
  {
    title: 'AlphaDrop',
    subtitle: 'Chrome Extension',
    image: '/projects/alphadrop.png',
    description: 'AI-powered background removal that runs entirely in your browser. Fast, private, and free.',
    tech: ['JavaScript', 'ONNX', 'Canvas API'],
    link: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    linkLabel: 'Chrome Web Store',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    title: 'Data Cleaning and Exploratory Data Analysis',
    image: '/projects/data-cleaning.png',
    description: 'Comprehensive data cleaning and exploratory analysis of layoffs dataset.',
    tech: ['MySQL', 'Data Cleaning', 'Exploratory Data Analysis'],
    link: 'https://github.com/Aaryan126/Data-cleaning-Exploratory-Data-Analysis-MySQL',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    title: 'Spotify Streaming History Visualizer',
    image: '/projects/spotify_viz.png',
    description: 'An interactive dashboard that transforms Spotify streaming history into insightful visualizations. Explore top tracks, artists, listening patterns, and yearly recaps through bubble charts, time-series graphs, and radar charts.',
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    link: 'https://startling-marshmallow-c649ed.netlify.app/',
    linkLabel: 'Live Demo',
    gradient: 'linear-gradient(135deg, #1db954 0%, #191414 100%)',
  },
]

const academicProjects = [
  {
    title: 'US Traffic Accident Analysis',
    image: '/projects/traffic-analysis.png',
    description: 'ML models for predicting accident location and severity using Random Forest classification.',
    tech: ['Python', 'Scikit-Learn', 'Pandas'],
    link: 'https://github.com/Aaryan126/AccidentSeverityProject-USA-Analysis',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  },
  {
    title: 'Chest X-Ray Classification',
    image: '/projects/CXR_Classification.png',
    description: 'Multi-label deep learning model to detect multiple thoracic abnormalities in chest X-rays, with Explainable AI (Grad-CAM) for clinical interpretability, achieved AUC Score of 0.845.',
    tech: ['Deep Learning', 'PyTorch', 'DenseNet', 'Explainable AI', 'Grad-CAM'],
    link: 'https://github.com/Aaryan126/FYP_Website',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  {
    title: 'Ship Navigation System',
    image: '/projects/ship-navigation.png',
    description: 'Global and local path planning with obstacle avoidance using PyQt5 interface.',
    tech: ['Python', 'PyQt5', 'A*', 'Dynamic Window Approach', 'Path Planning'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  },
  {
    title: 'Brain Tumor Detection',
    image: '/projects/brain-tumor.png',
    description: 'Enhanced classification using dimensionality reduction and computer vision. Passive Aggressive Classifier + PCA achieved highest accuracy at 94.35%.',
    tech: ['Scikit-learn', 'Matplotlib', 'Pandas', 'TensorFlow'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
  {
    title: 'Semantic Book Recommendation',
    image: '/projects/book-recommendation.png',
    description: 'LLM-powered recommendation system using OpenAI embeddings and vector storage.',
    tech: ['Python', 'LangChain', 'OpenAI'],
    link: 'https://github.com/Aaryan126/Semantic-Book-Recommendation',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
]

function ProjectCard({ project, index, hasBeenInView }) {
  const [imageError, setImageError] = useState(false)

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${hasBeenInView ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      data-title={project.subtitle ? `${project.title} · ${project.subtitle}` : project.title}
    >
      <div className="project-image">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="project-image-fallback"
            style={{ background: project.gradient }}
          >
            <i className="fa-solid fa-code"></i>
          </div>
        )}
      </div>

      <div className="project-overlay">
        <div className="project-overlay-content">
          {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-cta">
            {project.linkLabel}
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </a>
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

        <div className="projects-gallery">
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
