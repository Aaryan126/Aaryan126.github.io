import { useState, useRef, useEffect, useCallback } from 'react'

const PROJECTS = [
  {
    title: 'Research Orchestration System',
    subtitle: 'Multi-Agent Research Platform',
    image: '/projects/research-orchestration.png',
    description: 'Multi-agent system that automates literature reviews and claim verification across academic papers.',
    tech: ['Elastic Agent Builder', 'Elasticsearch', 'FastAPI', 'React', 'MCP'],
    link: 'https://github.com/Aaryan126/Research_Agent',
    video: 'https://www.youtube.com/watch?v=KatuxMUNVjU',
  },
  {
    title: 'AlphaDrop',
    subtitle: 'Chrome Extension',
    image: '/projects/alphadrop.png',
    description: 'AI-powered background removal that runs entirely in your browser. Fast, private, and free.',
    tech: ['JavaScript', 'ONNX', 'Canvas API'],
    link: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    badge: '150+ Users',
  },
  {
    title: 'Spotify History Visualizer',
    image: '/projects/spotify_viz.png',
    description: 'Interactive dashboard transforming Spotify streaming history into insightful visualizations.',
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    link: 'https://startling-marshmallow-c649ed.netlify.app/',
  },
  {
    title: 'Chest X-Ray Classification',
    image: '/projects/CXR_Classification.png',
    description: 'Multi-label deep learning model to detect thoracic abnormalities with Explainable AI. AUC: 0.845.',
    tech: ['PyTorch', 'DenseNet', 'Grad-CAM'],
    link: 'https://github.com/Aaryan126/FYP_Website',
  },
  {
    title: 'Ship Navigation System',
    image: '/projects/ship-navigation.png',
    description: 'Global and local path planning with obstacle avoidance using PyQt5 interface.',
    tech: ['Python', 'PyQt5', 'A*', 'DWA'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
  },
  {
    title: 'Brain Tumor Detection',
    image: '/projects/brain-tumor.png',
    description: 'Enhanced classification using dimensionality reduction and computer vision. Accuracy: 94.35%.',
    tech: ['Scikit-learn', 'TensorFlow', 'Pandas'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
  },
]

const CERTIFICATIONS = [
  { name: 'AWS Certified AI Practitioner', issuer: 'AWS' },
  { name: 'Google Advanced Data Analytics', issuer: 'Google' },
  { name: 'AI For Everyone', issuer: 'DeepLearning.AI' },
  { name: 'Machine Learning with Python', issuer: 'IBM' },
  { name: 'SQL (Advanced) Certificate', issuer: 'HackerRank' },
  { name: 'OOP in Java', issuer: 'UC San Diego' },
  { name: 'Python for Everybody', issuer: 'UMich' },
]

const SKILLS = {
  'AI / Machine Learning': [
    { name: 'PyTorch', color: '#ee4c2c' },
    { name: 'TensorFlow', color: '#ff6f00' },
    { name: 'Scikit-Learn', color: '#f7931e' },
    { name: 'LangChain', color: '#1c3c3c' },
    { name: 'OpenCV', color: '#5c3ee8' },
    { name: 'NumPy', color: '#4dabcf' },
    { name: 'Pandas', color: '#150458' },
  ],
  'Backend & APIs': [
    { name: 'Python', color: '#3776ab' },
    { name: 'FastAPI', color: '#009688' },
    { name: 'Java', color: '#f89820' },
    { name: 'REST APIs', color: '#61affe' },
  ],
  'Frontend': [
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
  ],
  'Data & DevOps': [
    { name: 'MySQL', color: '#4479a1' },
    { name: 'Vector DB', color: '#7c3aed' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'Matplotlib', color: '#11557c' },
  ],
}

function AboutApp() {
  return (
    <div className="contacts-app">
      <div className="contacts-sidebar">
        <div className="contacts-sidebar-header">
          <i className="fas fa-address-book" style={{ color: '#f5c542' }}></i>
          All Contacts
        </div>
        <div className="contacts-list-item active">
          <div className="contacts-list-avatar">AK</div>
          <span>Aaryan Kandiah</span>
        </div>
      </div>
      <div className="contacts-detail">
        <div className="contacts-card">
          <div className="contacts-card-header">
            <div className="contacts-avatar-lg">AK</div>
            <div className="contacts-card-name">Aaryan Kandiah</div>
            <div className="contacts-card-title">AI Engineer & Data Scientist</div>
          </div>

          <div className="contacts-field">
            <span className="contacts-label">company</span>
            <span className="contacts-value">Univers</span>
          </div>
          <div className="contacts-field">
            <span className="contacts-label">title</span>
            <span className="contacts-value">AI Innovation Engineer Intern</span>
          </div>
          <div className="contacts-divider" />

          <div className="contacts-field">
            <span className="contacts-label">email</span>
            <a href="mailto:aaryan001@e.ntu.edu.sg" className="contacts-value contacts-link">aaryan001@e.ntu.edu.sg</a>
          </div>
          <div className="contacts-field">
            <span className="contacts-label">GitHub</span>
            <a href="https://github.com/Aaryan126" target="_blank" rel="noopener noreferrer" className="contacts-value contacts-link">github.com/Aaryan126</a>
          </div>
          <div className="contacts-field">
            <span className="contacts-label">LinkedIn</span>
            <a href="https://www.linkedin.com/in/aaryan-kandiah-b2a719213" target="_blank" rel="noopener noreferrer" className="contacts-value contacts-link">aaryan-kandiah</a>
          </div>
          <div className="contacts-divider" />

          <div className="contacts-field">
            <span className="contacts-label">location</span>
            <span className="contacts-value">Singapore</span>
          </div>
          <div className="contacts-field">
            <span className="contacts-label">education</span>
            <span className="contacts-value">B.Eng EEE, NTU (Honours, Distinction)</span>
          </div>
          <div className="contacts-field">
            <span className="contacts-label">postgrad</span>
            <span className="contacts-value">NUS, commencing Aug 2026</span>
          </div>
          <div className="contacts-divider" />

          <div className="contacts-field">
            <span className="contacts-label">interests</span>
            <span className="contacts-value">ML, Agentic AI, Computer Vision, Data Science, Basketball, Travel</span>
          </div>
          <div className="contacts-divider" />

          <div className="contacts-field">
            <span className="contacts-label">certifications</span>
            <div className="contacts-certs">
              {CERTIFICATIONS.map(c => (
                <div key={c.name} className="contacts-cert-row">
                  <span>{c.name}</span>
                  <span className="contacts-cert-issuer">{c.issuer}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contacts-card-footer">
            <span>1 card</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const SAFARI_PAGES = {
  github: {
    url: 'https://github.com/Aaryan126',
    label: 'GitHub',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/aaryan-kandiah-b2a719213',
    label: 'LinkedIn',
  },
  alphadrop: {
    url: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    label: 'AlphaDrop',
  },
  spotify: {
    url: 'https://startling-marshmallow-c649ed.netlify.app/',
    label: 'Spotify Viz',
    iframe: true,
  },
}

function GitHubPage() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users/Aaryan126')
      .then(r => r.json())
      .then(setProfile)
      .catch(() => {})
    fetch('https://api.github.com/users/Aaryan126/repos?sort=updated&per_page=8')
      .then(r => r.json())
      .then(setRepos)
      .catch(() => {})
  }, [])

  if (!profile) return <div className="safari-page-loading">Loading...</div>

  return (
    <div className="gh-page">
      <div className="gh-header">
        <img src={profile.avatar_url} alt="" className="gh-avatar" />
        <div className="gh-header-info">
          <div className="gh-name">{profile.name || profile.login}</div>
          <div className="gh-login">{profile.login}</div>
          {profile.bio && <div className="gh-bio">{profile.bio}</div>}
          <div className="gh-stats">
            <span><strong>{profile.public_repos}</strong> repositories</span>
            <span><strong>{profile.followers}</strong> followers</span>
            <span><strong>{profile.following}</strong> following</span>
          </div>
          <a href="https://github.com/Aaryan126" target="_blank" rel="noopener noreferrer" className="gh-visit-btn">
            Visit on GitHub <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      <div className="gh-repos-header">Popular repositories</div>
      <div className="gh-repos-grid">
        {repos.map(repo => (
          <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="gh-repo-card">
            <div className="gh-repo-name">{repo.name}</div>
            {repo.description && <div className="gh-repo-desc">{repo.description}</div>}
            <div className="gh-repo-meta">
              {repo.language && <span className="gh-repo-lang"><span className="gh-lang-dot" style={{ background: repo.language === 'Python' ? '#3572A5' : repo.language === 'JavaScript' ? '#f1e05a' : repo.language === 'Jupyter Notebook' ? '#DA5B0B' : repo.language === 'HTML' ? '#e34c26' : '#8b8b8b' }}></span>{repo.language}</span>}
              {repo.stargazers_count > 0 && <span><i className="fas fa-star"></i> {repo.stargazers_count}</span>}
              {repo.forks_count > 0 && <span><i className="fas fa-code-branch"></i> {repo.forks_count}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function LinkedInPage() {
  return (
    <div className="li-page">
      <div className="li-banner" />
      <div className="li-profile">
        <div className="li-avatar">AK</div>
        <div className="li-name">Aaryan Kandiah</div>
        <div className="li-headline">AI Engineer & Data Scientist | Building Agentic AI Systems at Univers</div>
        <div className="li-location">Singapore</div>
        <div className="li-connections">NTU, NUS</div>
        <a href="https://www.linkedin.com/in/aaryan-kandiah-b2a719213" target="_blank" rel="noopener noreferrer" className="li-connect-btn">
          View on LinkedIn <i className="fas fa-external-link-alt"></i>
        </a>
      </div>
      <div className="li-section">
        <div className="li-section-title">About</div>
        <p>Currently building agentic AI systems at Univers. Recent NTU graduate specializing in Data Analysis & Machine Learning. Interested in multi-agent pipelines, computer vision, and deep learning.</p>
      </div>
      <div className="li-section">
        <div className="li-section-title">Experience</div>
        <div className="li-exp-item">
          <div className="li-exp-role">AI Innovation Engineer Intern</div>
          <div className="li-exp-co">Univers - May 2025 - Present</div>
        </div>
        <div className="li-exp-item">
          <div className="li-exp-role">Technology Audit Services Intern</div>
          <div className="li-exp-co">Manulife Singapore - May - Jul 2023</div>
        </div>
      </div>
    </div>
  )
}

function AlphaDropPage() {
  return (
    <div className="ad-page">
      <div className="ad-header">
        <div className="ad-icon">
          <i className="fas fa-magic" style={{ fontSize: 32, color: '#8b5cf6' }}></i>
        </div>
        <div>
          <div className="ad-title">AlphaDrop</div>
          <div className="ad-subtitle">AI Background Removal - Chrome Extension</div>
          <div className="ad-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>150+ Users</span>
          </div>
        </div>
      </div>
      <a href="https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj" target="_blank" rel="noopener noreferrer" className="ad-install-btn">
        View in Chrome Web Store <i className="fas fa-external-link-alt"></i>
      </a>
      <div className="ad-desc-section">
        <div className="ad-desc-title">Description</div>
        <p>AI-powered background removal that runs entirely in your browser. Fast, private, and free. Uses ONNX runtime for on-device inference with no data sent to servers.</p>
      </div>
      <div className="ad-desc-section">
        <div className="ad-desc-title">Tech Stack</div>
        <div className="app-tag-list">
          {['JavaScript', 'ONNX Runtime', 'Canvas API', 'Chrome Extension API'].map(t => (
            <span key={t} className="app-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SafariApp() {
  const [activePage, setActivePage] = useState('github')

  const displayUrl = SAFARI_PAGES[activePage]?.url || ''

  return (
    <div className="safari-app">
      <div className="safari-toolbar">
        <div className="safari-nav-btns">
          <button className="safari-nav-btn"><i className="fas fa-chevron-left"></i></button>
          <button className="safari-nav-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="safari-address-bar">
          <i className="fas fa-lock" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}></i>
          <span className="safari-url-display">{displayUrl}</span>
        </div>
        <div className="safari-toolbar-btns">
          <a href={displayUrl} target="_blank" rel="noopener noreferrer" className="safari-nav-btn" title="Open in real browser"><i className="fas fa-share-square"></i></a>
          <button className="safari-nav-btn"><i className="fas fa-plus"></i></button>
        </div>
      </div>
      <div className="safari-bookmarks-bar">
        {Object.entries(SAFARI_PAGES).map(([key, page]) => (
          <button
            key={key}
            className={`safari-bookmark ${activePage === key ? 'active' : ''}`}
            onClick={() => setActivePage(key)}
          >
            {page.label}
          </button>
        ))}
      </div>
      <div className="safari-content">
        {activePage === 'github' && <GitHubPage />}
        {activePage === 'linkedin' && <LinkedInPage />}
        {activePage === 'alphadrop' && <AlphaDropPage />}
        {activePage === 'spotify' && (
          <iframe
            src={SAFARI_PAGES.spotify.url}
            className="safari-iframe"
            title="Spotify Visualizer"
          />
        )}
      </div>
    </div>
  )
}

function ProjectsApp() {
  const [openProject, setOpenProject] = useState(null)
  const [viewMode, setViewMode] = useState('grid')

  if (openProject) {
    const p = openProject
    return (
      <div className="finder-app">
        <div className="finder-toolbar">
          <div className="finder-toolbar-left">
            <button className="finder-back-btn" onClick={() => setOpenProject(null)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="finder-back-btn" style={{ opacity: 0.3, cursor: 'default' }}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="finder-breadcrumb">
            <span className="finder-breadcrumb-item" onClick={() => setOpenProject(null)}>Projects</span>
            <i className="fas fa-chevron-right" style={{ fontSize: 8, opacity: 0.3 }}></i>
            <span className="finder-breadcrumb-current">{p.title}</span>
          </div>
          <div className="finder-toolbar-right">
            <button className="finder-tb-btn"><i className="fas fa-search"></i></button>
          </div>
        </div>
        <div className="finder-sidebar-layout">
          <div className="finder-sidebar">
            <div className="finder-sidebar-section">Favorites</div>
            <div className="finder-sidebar-item" onClick={() => setOpenProject(null)}>
              <i className="fas fa-folder"></i> Projects
            </div>
          </div>
          <div className="finder-detail">
            <img src={p.image} alt={p.title} className="finder-detail-img" onError={(e) => { e.target.style.display = 'none' }} />
            <div className="finder-detail-title">
              {p.title}
              {p.badge && <span className="app-project-badge">{p.badge}</span>}
            </div>
            {p.subtitle && <div className="finder-detail-subtitle">{p.subtitle}</div>}
            <p className="finder-detail-desc">{p.description}</p>
            <div className="finder-detail-section">Tech Stack</div>
            <div className="app-tag-list">
              {p.tech.map(t => <span key={t} className="app-tag">{t}</span>)}
            </div>
            <div className="finder-detail-actions">
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="finder-detail-link">
                <i className="fas fa-external-link-alt"></i> View Project
              </a>
              {p.video && (
                <a href={p.video} target="_blank" rel="noopener noreferrer" className="finder-detail-link">
                  <i className="fas fa-play-circle"></i> Watch Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="finder-app">
      <div className="finder-toolbar">
        <div className="finder-toolbar-left">
          <button className="finder-back-btn" style={{ opacity: 0.3, cursor: 'default' }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="finder-back-btn" style={{ opacity: 0.3, cursor: 'default' }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="finder-breadcrumb">
          <span className="finder-breadcrumb-current">Projects</span>
        </div>
        <div className="finder-toolbar-right">
          <div className="finder-view-group">
            <button className={`finder-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Icon view">
              <i className="fas fa-th-large"></i>
            </button>
            <button className={`finder-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List view">
              <i className="fas fa-list"></i>
            </button>
            <button className={`finder-view-btn ${viewMode === 'columns' ? 'active' : ''}`} onClick={() => setViewMode('columns')} title="Column view">
              <i className="fas fa-columns"></i>
            </button>
          </div>
          <button className="finder-tb-btn"><i className="fas fa-ellipsis-h"></i></button>
          <button className="finder-tb-btn"><i className="fas fa-search"></i></button>
        </div>
      </div>
      <div className="finder-status-bar">
        <span>{PROJECTS.length} items</span>
      </div>
      <div className="finder-sidebar-layout">
        <div className="finder-sidebar">
          <div className="finder-sidebar-section">Favorites</div>
          <div className="finder-sidebar-item active">
            <i className="fas fa-folder"></i> Projects
          </div>
        </div>
        {viewMode === 'grid' && (
          <div className="finder-grid">
            {PROJECTS.map(p => (
              <div key={p.title} className="finder-file" onDoubleClick={() => setOpenProject(p)}>
                <div className="finder-file-icon">
                  <img src={p.image} alt={p.title} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<i class="fas fa-folder" style="font-size:32px;color:rgba(255,255,255,0.3)"></i>' }} />
                </div>
                <span className="finder-file-name">{p.title}</span>
              </div>
            ))}
          </div>
        )}
        {viewMode === 'list' && (
          <div className="finder-list-view">
            <div className="finder-list-header">
              <span className="finder-list-col-name">Name</span>
              <span className="finder-list-col">Date Modified</span>
              <span className="finder-list-col">Size</span>
              <span className="finder-list-col">Kind</span>
            </div>
            {PROJECTS.map(p => (
              <div key={p.title} className="finder-list-row" onDoubleClick={() => setOpenProject(p)}>
                <span className="finder-list-col-name">
                  <i className="fas fa-folder" style={{ color: '#4a9eff', marginRight: 8, fontSize: 14 }}></i>
                  {p.title}
                </span>
                <span className="finder-list-col">Today</span>
                <span className="finder-list-col">--</span>
                <span className="finder-list-col">Folder</span>
              </div>
            ))}
          </div>
        )}
        {viewMode === 'columns' && (
          <div className="finder-columns-view">
            <div className="finder-column">
              {PROJECTS.map(p => (
                <div key={p.title} className="finder-column-item" onClick={() => setOpenProject(p)}>
                  <i className="fas fa-folder" style={{ color: '#4a9eff', fontSize: 13 }}></i>
                  <span>{p.title}</span>
                  <i className="fas fa-chevron-right" style={{ fontSize: 9, opacity: 0.3, marginLeft: 'auto' }}></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DEFAULT_NOTES = [
  {
    id: 'univers',
    title: 'AI Innovation Engineer Intern',
    date: '27 Mar 2025',
    preview: 'Univers - Singapore',
    body: `AI Innovation Engineer Intern
Univers | May 2025 - Present | Singapore

Developed enterprise AI Systems for HVAC Optimization serving 8 clients, spanning agentic AI architecture, full-stack integration and production deployments.

AI Agentic HVAC System Development:
- Built a full-stack HVAC AI Agentic Platform to help GTM and Engineering teams understand, optimize, and make decisions on complex HVAC systems, increasing GTM team productivity by ~25%.
- Developed an AI agent with RAG architecture, VectorDB, and integration of HVAC knowledge bases.
- Enabled multi-modal AI outputs: context-aware HVAC optimization recommendations, mermaid diagrams, and Google Maps location intelligence.
- Built AI-powered sales enablement tools, including: Excel auto-completion, AI-driven document synthesis, and intelligent building filtration engine.
- Designed role-based AI reasoning for GTM teams, engineers, and management.

Dashboard Development & Optimization:
- Shipped features and debugged critical data streaming across Java backend and React/TypeScript frontend systems serving 7 clients, processing ~1M data points daily per client across 300+ sensor streams.
- Implemented AI-driven capabilities including real-time retrieval of building data, enabling natural language queries.
- Diagnosed critical backend API endpoints, remediating frontend design, and ensuring reliable data synchronization across databases, Java backend services and React frontend systems.
- Delivered end-to-end AI dashboard functionality, connecting databases, backend, and frontend to enable intelligent and actionable building management insights.

On-Prem Deployment:
- Delivered 2 on-premise AI solutions for clients, configuring and deploying AI dashboard environments with local LLM hosting on dedicated hardware.

HVAC Monitoring Service:
- Built an internal monitoring platform to detect bugs and data issues across client-facing dashboards, with automated notifications to engineering team for rapid incident response, reducing incident response time by 40%.

Skills: Agentic AI, RAG, Python, FastAPI, React, TypeScript, Java, Google Cloud`,
  },
  {
    id: 'manulife',
    title: 'Technology Audit Services Intern',
    date: '15 Jul 2023',
    preview: 'Manulife Singapore',
    body: `Technology Audit Services Intern
Manulife Singapore | May - Jul 2023 | Singapore

Key Achievements:
- Worked on SOX audit and China market audit, performing testing to evaluate evidence accuracy and reliability.
- Prepared comprehensive workpapers to document audit process, fact-findings, and conclusions.
- Programmed Python script to traverse git repositories to uncover potential data privacy issues.

Skills: Python, Audit Procedures, Data Analysis`,
  },
]

function renderNoteBody(text) {
  if (!text) return <span className="notes-placeholder">Start typing...</span>
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (i === 0) return <div key={i} className="note-line note-title-line">{trimmed}</div>
    if (i === 1 && trimmed.includes('|')) return <div key={i} className="note-line note-subtitle-line">{trimmed}</div>
    if (trimmed === '') return <div key={i} className="note-line note-empty">&nbsp;</div>
    if (trimmed.endsWith(':') && !trimmed.startsWith('-')) return <div key={i} className="note-line note-heading">{trimmed}</div>
    if (trimmed.startsWith('- ')) {
      const content = trimmed.slice(2)
      return <div key={i} className="note-line note-bullet"><span className="note-bullet-dot" />{content}</div>
    }
    if (trimmed.startsWith('Skills:')) {
      const skills = trimmed.slice(7).split(',').map(s => s.trim())
      return (
        <div key={i} className="note-line note-skills">
          <span className="note-skills-label">Skills:</span>
          {skills.map(s => <span key={s} className="note-skill-tag">{s}</span>)}
        </div>
      )
    }
    return <div key={i} className="note-line">{trimmed}</div>
  })
}

function ExperienceApp() {
  const [notes, setNotes] = useState(DEFAULT_NOTES)
  const [selectedId, setSelectedId] = useState(DEFAULT_NOTES[0].id)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedNote = notes.find(n => n.id === selectedId)

  const filteredNotes = searchQuery
    ? notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.body.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes

  const addNote = () => {
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    const newNote = {
      id: `note-${Date.now()}`,
      title: 'New Note',
      date: dateStr,
      preview: 'No additional text',
      body: '',
    }
    setNotes(prev => [newNote, ...prev])
    setSelectedId(newNote.id)
  }

  const updateNoteBody = (value) => {
    setNotes(prev => prev.map(n => {
      if (n.id !== selectedId) return n
      const lines = value.split('\n')
      const title = lines[0] || 'New Note'
      const preview = lines[1] || 'No additional text'
      return { ...n, body: value, title, preview }
    }))
  }

  const deleteNote = (id) => {
    setNotes(prev => {
      const next = prev.filter(n => n.id !== id)
      if (selectedId === id && next.length > 0) setSelectedId(next[0].id)
      return next
    })
  }

  return (
    <div className="notes-app">
      <div className="notes-sidebar">
        <div className="notes-toolbar">
          <div className="notes-toolbar-left">
            <i className="fas fa-folder" style={{ color: '#f5c542', fontSize: 13 }}></i>
            <span>All Notes</span>
          </div>
          <button className="notes-add-btn" onClick={addNote} title="New Note">
            <i className="fas fa-pen-to-square"></i>
          </button>
        </div>
        <div className="notes-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="notes-search-input"
          />
        </div>
        <div className="notes-count">{filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}</div>
        <div className="notes-list">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`notes-item ${selectedId === note.id ? 'active' : ''}`}
              onClick={() => setSelectedId(note.id)}
            >
              <div className="notes-item-title">{note.title}</div>
              <div className="notes-item-meta">
                <span className="notes-item-date">{note.date}</span>
                <span className="notes-item-preview">{note.preview}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-content">
        {selectedNote && (
          <>
            <div className="notes-content-date">{selectedNote.date}</div>
            {selectedNote.id.startsWith('note-') ? (
              <textarea
                className="notes-editor-textarea"
                value={selectedNote.body}
                onChange={(e) => updateNoteBody(e.target.value)}
                placeholder=""
                spellCheck={false}
                autoFocus
              />
            ) : (
              <div className="notes-editor-wrap">
                <div className="notes-rendered">
                  {renderNoteBody(selectedNote.body)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function SkillsApp() {
  return <TerminalApp />
}

function ContactApp() {
  return <MailApp />
}

function ResumeApp({ onClose, onMinimize }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [zoom, setZoom] = useState(100)

  return (
    <div className="preview-app">
      {/* macOS Preview Toolbar - merged with titlebar */}
      <div className="pv-toolbar">
        <div className="pv-toolbar-left">
          <div className="pv-traffic-lights">
            <button className="desktop-window-btn close" onClick={onClose} aria-label="Close" />
            <button className="desktop-window-btn minimize" onClick={onMinimize} aria-label="Minimize" />
            <button className="desktop-window-btn maximize" aria-label="Maximize" />
          </div>
          <div className="pv-btn-group">
            <button
              className={`pv-btn ${sidebarOpen ? 'active' : ''}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Sidebar"
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button className="pv-btn pv-btn-chevron" title="View options">
              <i className="fas fa-chevron-down" style={{ fontSize: 8 }}></i>
            </button>
          </div>
        </div>

        <div className="pv-toolbar-center">
          <div className="pv-title-block">
            <span className="pv-title-name">Aaryan_Kandiah_Resume.pdf</span>
            <span className="pv-title-sub">Page 1 of 1</span>
          </div>
        </div>

        <div className="pv-toolbar-right">
          <div className="pv-btn-group">
            <button className="pv-btn" title="Search">
              <i className="fas fa-search"></i>
            </button>
            <button className="pv-btn" onClick={() => setZoom(z => Math.max(50, z - 25))} title="Zoom Out">
              <i className="fas fa-search-minus"></i>
            </button>
            <button className="pv-btn" onClick={() => setZoom(z => Math.min(200, z + 25))} title="Zoom In">
              <i className="fas fa-search-plus"></i>
            </button>
          </div>

          <div className="pv-btn-group">
            <button className="pv-btn" title="Markup">
              <i className="fas fa-highlighter"></i>
            </button>
            <button className="pv-btn" title="Crop">
              <i className="fas fa-crop-alt"></i>
            </button>
            <button className="pv-btn" title="Rotate">
              <i className="fas fa-redo"></i>
            </button>
            <button className="pv-btn" title="Annotate">
              <i className="fas fa-pen-nib"></i>
            </button>
          </div>

          <div className="pv-btn-group">
            <a href="/Aaryan_Kandiah_Resume.pdf" download="Aaryan_Kandiah_Resume.pdf" className="pv-btn" title="Download">
              <i className="fas fa-info-circle"></i>
            </a>
            <a href="/Aaryan_Kandiah_Resume.pdf" target="_blank" rel="noopener noreferrer" className="pv-btn" title="Share">
              <i className="fas fa-share-square"></i>
            </a>
            <a href="/Aaryan_Kandiah_Resume.pdf" download="Aaryan_Kandiah_Resume.pdf" className="pv-btn" title="Download">
              <i className="fas fa-download"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="preview-body">
        {sidebarOpen && (
          <div className="preview-sidebar">
            <div className="preview-thumb active">
              <div className="preview-thumb-img">
                <iframe
                  src="/Aaryan_Kandiah_Resume.pdf#toolbar=0&navpanes=0"
                  tabIndex={-1}
                  title="Page 1 thumbnail"
                />
              </div>
              <span className="preview-thumb-label">1</span>
            </div>
          </div>
        )}

        <div className="preview-content">
          <div className="preview-pdf-wrapper" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            <iframe
              src="/Aaryan_Kandiah_Resume.pdf#toolbar=0&navpanes=0"
              className="preview-pdf"
              title="Resume Preview"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== Terminal App =====

const TERMINAL_COMMANDS = {
  help: () => [
    '\x1b[1mAvailable commands:\x1b[0m',
    '',
    '  \x1b[1mPortfolio\x1b[0m',
    '  skills          Show technical skills',
    '  about           About me',
    '  projects        List projects',
    '  experience      Work experience',
    '  contact         Contact information',
    '  certifications  Show certifications',
    '  education       Academic history',
    '  goals           What I\'m working towards',
    '  stats           Key numbers & metrics',
    '  stack           Preferred tech stack',
    '  links           Clickable links',
    '',
    '  \x1b[1mSystem\x1b[0m',
    '  neofetch        System info',
    '  whoami          Who am I',
    '  pwd             Print working directory',
    '  ls              List files',
    '  cat <file>      Read a file',
    '  tree            Directory tree',
    '  htop            Running processes',
    '  pip list        Python packages',
    '  git log         Career commits',
    '  man aaryan      Manual page',
    '  clear           Clear terminal',
    '',
    '  \x1b[1mFun\x1b[0m',
    '  joke            Programming joke',
    '  music           Music taste',
    '  hobbies         Outside of code',
    '  quote           Favorite quote',
    '  ascii           ASCII art',
    '  coffee          Brew some coffee',
    '  curl aaryan     API status',
    '  sudo hire me    Try it ;)',
    '  rm -rf /        Don\'t even think about it',
    '  exit            Try to leave',
  ],
  skills: () => [
    '\x1b[1mAI / Machine Learning\x1b[0m',
    '  PyTorch  TensorFlow  Scikit-Learn  LangChain  OpenCV  NumPy  Pandas',
    '',
    '\x1b[1mBackend & APIs\x1b[0m',
    '  Python  FastAPI  Java  REST APIs',
    '',
    '\x1b[1mFrontend\x1b[0m',
    '  React  TypeScript',
    '',
    '\x1b[1mData & DevOps\x1b[0m',
    '  MySQL  Vector DB  Docker  Kubernetes  Matplotlib',
  ],
  about: () => [
    '\x1b[1mAaryan Kandiah\x1b[0m',
    'AI Engineer & Data Scientist',
    '',
    'Currently building agentic AI systems at Univers.',
    'NTU graduate (B.Eng EEE, Honours Distinction).',
    'Starting postgraduate studies at NUS, Aug 2026.',
    '',
    'Interests: ML, Agentic AI, Computer Vision, Deep Learning',
  ],
  projects: () => [
    '\x1b[1mProjects (12 total)\x1b[0m',
    '',
    '  1. Research Orchestration System  - Multi-agent research platform',
    '  2. AlphaDrop                      - Chrome extension (150+ users)',
    '  3. Spotify History Visualizer     - Interactive data dashboard',
    '  4. Chest X-Ray Classification     - Deep learning, AUC: 0.845',
    '  5. Ship Navigation System         - Path planning with A*/DWA',
    '  6. Brain Tumor Detection          - CV classification, 94.35% acc',
  ],
  experience: () => [
    '\x1b[1mAI Innovation Engineer Intern\x1b[0m @ Univers',
    'May 2025 - Present | Singapore',
    '  - Built AI Agentic Platform for HVAC, serving 7 clients',
    '  - RAG-based agents, ~1M data points/day, 300+ sensors',
    '  - GTM productivity +25%, incident response -40%',
    '',
    '\x1b[1mTechnology Audit Services Intern\x1b[0m @ Manulife Singapore',
    'May - Jul 2023 | Singapore',
    '  - SOX audit and China market audit',
    '  - Python scripts for git repo data privacy scanning',
  ],
  contact: () => [
    '\x1b[1mContact\x1b[0m',
    '',
    '  Email:    aaryan001@e.ntu.edu.sg',
    '  GitHub:   github.com/Aaryan126',
    '  LinkedIn: linkedin.com/in/aaryan-kandiah-b2a719213',
    '  Location: Singapore',
  ],
  certifications: () => [
    '\x1b[1mCertifications (7)\x1b[0m',
    '',
    '  1. AWS Certified AI Practitioner        - AWS',
    '  2. Google Advanced Data Analytics        - Google',
    '  3. AI For Everyone                       - DeepLearning.AI',
    '  4. Machine Learning with Python          - IBM',
    '  5. SQL (Advanced) Certificate            - HackerRank',
    '  6. OOP in Java                           - UC San Diego',
    '  7. Python for Everybody                  - UMich',
  ],
  education: () => [
    '\x1b[1mEducation\x1b[0m',
    '',
    '  \x1b[1mNanyang Technological University (NTU)\x1b[0m',
    '  B.Eng Electrical & Electronic Engineering',
    '  Specialization: Data Analysis & Machine Learning',
    '  Honours (Distinction) | Dec 2025',
    '',
    '  \x1b[1mNational University of Singapore (NUS)\x1b[0m',
    '  Postgraduate Studies',
    '  Commencing Aug 2026',
  ],
  goals: () => [
    '\x1b[1mFocus Areas & Goals\x1b[0m',
    '',
    '  Designing intelligent systems that learn, reason, and act',
    '  autonomously across complex environments.',
    '',
    '  Special emphasis on:',
    '  - Fairness, interpretability, and robustness in ML models',
    '  - Multi-agent and decision-making pipelines',
    '  - Balancing performance with transparency',
    '  - Agentic AI systems for real-world applications',
  ],
  stats: () => [
    '\x1b[1mKey Stats\x1b[0m',
    '',
    '  Projects completed ........... 12',
    '  Clients served ............... 7+',
    '  Data points processed/day .... ~1,000,000',
    '  Sensor streams managed ....... 300+',
    '  Chrome extension users ....... 150+',
    '  GTM productivity gain ........ +25%',
    '  Incident response reduction .. -40%',
    '  Best model AUC .............. 0.845',
    '  Best classification acc ...... 94.35%',
    '  Certifications .............. 7',
    '  On-premise deployments ....... 2',
  ],
  stack: () => [
    '\x1b[1mPreferred Tech Stack\x1b[0m',
    '',
    '  \x1b[1mLanguage:\x1b[0m      Python (daily driver), Java, TypeScript',
    '  \x1b[1mAI/ML:\x1b[0m         PyTorch, LangChain, Scikit-Learn',
    '  \x1b[1mBackend:\x1b[0m       FastAPI (love the speed + type safety)',
    '  \x1b[1mFrontend:\x1b[0m      React + TypeScript',
    '  \x1b[1mDatabase:\x1b[0m      MySQL, Vector DB (for RAG pipelines)',
    '  \x1b[1mInfra:\x1b[0m         Docker, Kubernetes, Google Cloud',
    '  \x1b[1mCV:\x1b[0m            OpenCV, DenseNet, Grad-CAM',
    '  \x1b[1mData:\x1b[0m          Pandas, NumPy, Matplotlib',
    '  \x1b[1mEditor:\x1b[0m        VS Code + Cursor',
    '  \x1b[1mTerminal:\x1b[0m      iTerm2 + zsh',
  ],
  links: () => [
    '\x1b[1mLinks\x1b[0m',
    '',
    '  GitHub:   https://github.com/Aaryan126',
    '  LinkedIn: https://www.linkedin.com/in/aaryan-kandiah-b2a719213',
    '  Email:    mailto:aaryan001@e.ntu.edu.sg',
    '  Resume:   Type "open resume.docx" to download',
  ],
  whoami: () => ['aaryan'],
  pwd: () => ['/Users/aaryan'],
  ls: () => [
    'about.txt    certifications.txt  contact.txt',
    'projects/    resume.docx         skills.txt',
    'hobbies.txt  goals.txt           education.txt',
  ],
  tree: () => [
    '\x1b[1m.\x1b[0m',
    '|-- about.txt',
    '|-- certifications.txt',
    '|-- contact.txt',
    '|-- education.txt',
    '|-- goals.txt',
    '|-- hobbies.txt',
    '|-- resume.docx',
    '|-- skills.txt',
    '|-- projects/',
    '|   |-- research-orchestration/',
    '|   |-- alphadrop/',
    '|   |-- spotify-visualizer/',
    '|   |-- chest-xray-classification/',
    '|   |-- ship-navigation/',
    '|   |-- brain-tumor-detection/',
    '',
    '6 directories, 8 files',
  ],
  htop: () => [
    '\x1b[1m  PID  USER     CPU%  MEM%  COMMAND\x1b[0m',
    '  001  aaryan   42.3  18.2  agentic-ai-platform',
    '  002  aaryan   28.1  12.5  rag-pipeline',
    '  003  aaryan   15.7   8.3  react-frontend',
    '  004  aaryan   12.4   6.1  fastapi-backend',
    '  005  aaryan    8.9   4.2  sensor-data-ingestion',
    '  006  aaryan    6.2   3.8  vector-db-indexer',
    '  007  aaryan    4.5   2.1  monitoring-dashboard',
    '  008  aaryan    2.1   1.4  portfolio-website',
    '  009  aaryan    1.3   0.9  spotify-visualizer',
    '  010  aaryan    0.8   0.5  alphadrop-extension',
    '',
    '  \x1b[1mCPUs:\x1b[0m 10 cores  \x1b[1mMem:\x1b[0m 16GB/32GB  \x1b[1mUptime:\x1b[0m 365 days',
  ],
  'pip list': () => [
    '\x1b[1mPackage          Version\x1b[0m',
    '---------------- --------',
    'torch            2.2.0',
    'tensorflow       2.15.0',
    'scikit-learn     1.4.0',
    'langchain        0.1.5',
    'fastapi          0.109.0',
    'pandas           2.2.0',
    'numpy            1.26.3',
    'opencv-python    4.9.0',
    'matplotlib       3.8.2',
    'docker           7.0.0',
    'elasticsearch    8.12.0',
    'pydantic         2.5.3',
    'uvicorn          0.27.0',
    'transformers     4.37.0',
    '',
    '14 packages installed',
  ],
  'git log': () => [
    '\x1b[1mcommit a3f8d2e\x1b[0m (HEAD -> career)',
    'Date: May 2025',
    '  Started as AI Innovation Engineer Intern @ Univers',
    '',
    '\x1b[1mcommit 7b2c1a9\x1b[0m',
    'Date: Dec 2025',
    '  Graduated NTU - B.Eng EEE (Honours, Distinction)',
    '',
    '\x1b[1mcommit e5f4d8c\x1b[0m',
    'Date: 2024',
    '  Built AlphaDrop - 150+ users on Chrome Web Store',
    '',
    '\x1b[1mcommit 9a1b3f7\x1b[0m',
    'Date: 2024',
    '  Completed Chest X-Ray Classification (AUC: 0.845)',
    '',
    '\x1b[1mcommit 2d6e8a4\x1b[0m',
    'Date: May 2023',
    '  Tech Audit Intern @ Manulife Singapore',
    '',
    '\x1b[1mcommit 1c3d5b2\x1b[0m',
    'Date: 2021',
    '  Enrolled at NTU - Electrical & Electronic Engineering',
  ],
  'man aaryan': () => [
    '',
    '\x1b[1mAARYAN(1)                  User Commands                  AARYAN(1)\x1b[0m',
    '',
    '\x1b[1mNAME\x1b[0m',
    '       aaryan - AI Engineer & Data Scientist',
    '',
    '\x1b[1mSYNOPSIS\x1b[0m',
    '       aaryan [--skill SKILL] [--project PROJECT] [--mode MODE]',
    '',
    '\x1b[1mDESCRIPTION\x1b[0m',
    '       Full-stack AI engineer specializing in agentic systems,',
    '       computer vision, and machine learning pipelines.',
    '       Processes ~1M data points daily. Serves 7+ clients.',
    '       Fueled by coffee and curiosity.',
    '',
    '\x1b[1mOPTIONS\x1b[0m',
    '       --skill python,pytorch,react,fastapi,docker',
    '       --education NTU (B.Eng EEE), NUS (Postgrad)',
    '       --certs 7 (AWS, Google, IBM, DeepLearning.AI, ...)',
    '       --mode  build | research | deploy | debug',
    '',
    '\x1b[1mEXAMPLES\x1b[0m',
    '       aaryan --mode build --project "agentic-platform"',
    '       aaryan --skill pytorch --project "chest-xray-classification"',
    '',
    '\x1b[1mBUGS\x1b[0m',
    '       Occasionally forgets to eat while debugging.',
    '       Known to mass-refactor at 2am.',
    '',
    '\x1b[1mSEE ALSO\x1b[0m',
    '       github.com/Aaryan126, linkedin.com/in/aaryan-kandiah-b2a719213',
    '',
  ],
  joke: () => {
    const jokes = [
      ['Why do programmers prefer dark mode?', 'Because light attracts bugs.'],
      ['Why did the ML model break up with the dataset?', 'Too much overfitting.'],
      ['What\'s a programmer\'s favorite hangout?', 'Foo Bar.'],
      ['Why do Python programmers have low self-esteem?', 'They\'re constantly comparing themselves to others with __eq__.'],
      ['What did the AI say to the data scientist?', '"You complete me." (R-squared = 1.0)'],
      ['Why was the neural network bad at relationships?', 'It had too many layers of issues.'],
    ]
    const [q, a] = jokes[Math.floor(Math.random() * jokes.length)]
    return ['', `  ${q}`, `  ${a}`, '']
  },
  music: () => [
    '\x1b[1mMusic Taste\x1b[0m',
    '',
    '  Genres:  Hip-Hop, R&B, Lo-fi, Electronic',
    '  Coding:  Lo-fi beats, ambient electronica',
    '  Workout: Hip-Hop, trap',
    '  Chill:   R&B, jazz-hop',
    '',
    '  Fun fact: Built a Spotify streaming history visualizer',
    '  to analyze my own listening patterns!',
  ],
  hobbies: () => [
    '\x1b[1mLife Outside Code\x1b[0m',
    '',
    '  Basketball   Pickup games on weekends',
    '  Travel       Exploring SEA and beyond',
    '  Reading      Tech blogs, research papers, sci-fi',
    '  Gaming       Strategy and RPGs',
    '  Coffee       Pour-over enthusiast',
    '  Fitness      Gym + basketball',
  ],
  quote: () => {
    const quotes = [
      ['"The best way to predict the future is to invent it."', '- Alan Kay'],
      ['"Talk is cheap. Show me the code."', '- Linus Torvalds'],
      ['"Any sufficiently advanced technology is indistinguishable from magic."', '- Arthur C. Clarke'],
      ['"Simplicity is the ultimate sophistication."', '- Leonardo da Vinci'],
      ['"Data is the new oil, but like oil, it must be refined."', '- Unknown'],
    ]
    const [q, a] = quotes[Math.floor(Math.random() * quotes.length)]
    return ['', `  ${q}`, `  ${a}`, '']
  },
  ascii: () => [
    '',
    '       _____                                ',
    '      /  _  \\   __ _ _ __ _   _  __ _ _ __  ',
    '     / /_\\ \\ / _` | \'__| | | |/ _` | \'_ \\ ',
    '    /  _  | (_| | |  | |_| | (_| | | | |',
    '    \\_/ \\_/\\__,_|_|   \\__, |\\__,_|_| |_|',
    '                       __/ |                ',
    '                      |___/                 ',
    '',
    '    AI Engineer & Data Scientist',
    '    Building the future, one model at a time.',
    '',
  ],
  coffee: () => [
    '',
    '        ( (',
    '         ) )',
    '      ........',
    '      |      |]',
    '      \\      /',
    '       `----\'',
    '',
    '  Brewing fresh coffee...',
    '  Ready! Time to write some code.',
    '',
  ],
  'sudo hire me': () => [
    '',
    '  [sudo] password for recruiter: ********',
    '  Verifying credentials...',
    '  Access granted.',
    '',
    '  \x1b[1mHiring process initiated.\x1b[0m',
    '  Downloading resume...',
    '  Sending interview invite...',
    '',
    '  Just kidding. But seriously, let\'s talk!',
    '  Email: aaryan001@e.ntu.edu.sg',
    '',
  ],
  'rm -rf /': () => [
    '',
    '  rm: permission denied',
    '  Nice try. This portfolio is protected by plot armor.',
    '',
  ],
  exit: () => [
    '',
    '  You can check out any time you like,',
    '  but you can never leave.',
    '',
    '  (Use the Exit Desktop button instead)',
    '',
  ],
  'curl aaryan': () => [
    '',
    '  HTTP/1.1 200 OK',
    '  Content-Type: application/json',
    '',
    '  {',
    '    "name": "Aaryan Kandiah",',
    '    "status": "Building agentic AI systems",',
    '    "role": "AI Innovation Engineer Intern",',
    '    "company": "Univers",',
    '    "location": "Singapore",',
    '    "available_for": ["collaborations", "opportunities", "coffee"],',
    '    "response_time": "< 24h",',
    '    "uptime": "99.9%",',
    '    "coffee_consumed_today": 3',
    '  }',
    '',
  ],
  neofetch: () => [
    '',
    '                    \'c.          \x1b[1maaryan\x1b[0m@\x1b[1mAaryans-MacBook-Pro\x1b[0m',
    '                 ,xNMM.          ----------------------------',
    '               .OMMMMo           \x1b[1mOS:\x1b[0m macOS Sequoia',
    '               OMMM0,            \x1b[1mHost:\x1b[0m MacBook Pro',
    '     .;loddo:\' loolloddol;.      \x1b[1mRole:\x1b[0m AI Engineer & Data Scientist',
    '   cKMMMMMMMMMMNWMMMMMMMMMM0:    \x1b[1mCompany:\x1b[0m Univers',
    '  .KMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[1mEducation:\x1b[0m NTU (B.Eng EEE)',
    '  XMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[1mPostgrad:\x1b[0m NUS (Aug 2026)',
    ' ;MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[1mSkills:\x1b[0m Python, PyTorch, React',
    ' :MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[1mProjects:\x1b[0m 12',
    ' .MMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[1mCerts:\x1b[0m 7',
    '  kMMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[1mClients:\x1b[0m 7+',
    '  .XMMMMMMMMMMMMMMMMMMMMMMMMMMk  \x1b[1mLocation:\x1b[0m Singapore',
    '   .XMMMMMMMMMMMMMMMMMMMMMMMMK.  ',
    '     kMMMMMMMMMMMMMMMMMMMMMMd    ',
    '      ;KMMMMMMMWXXWMMMMMMMk.    ',
    '        .cooc,.    .,coo:.      ',
    '',
  ],
}

const CAT_FILES = {
  'about.txt': TERMINAL_COMMANDS.about,
  'skills.txt': TERMINAL_COMMANDS.skills,
  'contact.txt': TERMINAL_COMMANDS.contact,
  'certifications.txt': TERMINAL_COMMANDS.certifications,
  'education.txt': TERMINAL_COMMANDS.education,
  'goals.txt': TERMINAL_COMMANDS.goals,
  'hobbies.txt': TERMINAL_COMMANDS.hobbies,
  'resume.docx': () => ['[Binary file - use "open resume.docx" to download]'],
}

function renderTerminalLine(text) {
  const parts = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf('\x1b[1m')
    if (boldStart === -1) {
      parts.push(<span key={key}>{remaining}</span>)
      break
    }
    if (boldStart > 0) {
      parts.push(<span key={key}>{remaining.slice(0, boldStart)}</span>)
      key++
    }
    const boldEnd = remaining.indexOf('\x1b[0m', boldStart)
    if (boldEnd === -1) {
      parts.push(<span key={key}>{remaining.slice(boldStart + 4)}</span>)
      break
    }
    parts.push(
      <span key={key} style={{ fontWeight: 700, color: '#fff' }}>
        {remaining.slice(boldStart + 4, boldEnd)}
      </span>
    )
    key++
    remaining = remaining.slice(boldEnd + 4)
  }
  return parts
}

function TerminalApp() {
  const [history, setHistory] = useState([
    { type: 'output', lines: ['Last login: Thu Mar 27 19:49:50 on ttys012'] },
    { type: 'prompt', text: 'skills' },
    { type: 'output', lines: TERMINAL_COMMANDS.skills() },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim()
    const promptLine = { type: 'prompt', text: trimmed }

    if (!trimmed) {
      setHistory(prev => [...prev, promptLine])
      return
    }

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    if (trimmed.startsWith('cat ')) {
      const file = trimmed.slice(4).trim()
      const fileFn = CAT_FILES[file]
      if (fileFn) {
        setHistory(prev => [...prev, promptLine, { type: 'output', lines: fileFn() }])
      } else {
        setHistory(prev => [...prev, promptLine, { type: 'output', lines: [`cat: ${file}: No such file or directory`] }])
      }
      return
    }

    if (trimmed.startsWith('open ') && trimmed.includes('resume')) {
      setHistory(prev => [...prev, promptLine, { type: 'output', lines: ['Opening resume...'] }])
      const link = document.createElement('a')
      link.href = '/Aaryan_Kandiah_Resume.docx'
      link.download = 'Aaryan_Kandiah_Resume.docx'
      link.click()
      return
    }

    // Check exact match first, then try matching multi-word commands
    const commandFn = TERMINAL_COMMANDS[trimmed]
      || (trimmed.startsWith('curl') && TERMINAL_COMMANDS['curl aaryan'])
      || (trimmed.startsWith('sudo hire') && TERMINAL_COMMANDS['sudo hire me'])
      || (trimmed.startsWith('rm -rf') && TERMINAL_COMMANDS['rm -rf /'])
      || (trimmed.startsWith('man') && TERMINAL_COMMANDS['man aaryan'])
    if (commandFn) {
      setHistory(prev => [...prev, promptLine, { type: 'output', lines: commandFn() }])
    } else {
      setHistory(prev => [...prev, promptLine, { type: 'output', lines: [`zsh: command not found: ${trimmed}`, 'Type "help" for available commands.'] }])
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  const focusInput = (e) => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) return
    if (e.target.closest('.terminal-input')) return
    inputRef.current?.focus()
  }

  return (
    <div className="terminal" onClick={focusInput}>
      <div className="terminal-output">
        {history.map((entry, i) => {
          if (entry.type === 'prompt') {
            return (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">aaryan@Aaryans-MacBook-Pro</span>
                <span className="terminal-path"> ~ % </span>
                <span>{entry.text}</span>
              </div>
            )
          }
          return (
            <div key={i} className="terminal-block">
              {entry.lines.map((line, j) => (
                <div key={j} className="terminal-line">{renderTerminalLine(line)}</div>
              ))}
            </div>
          )
        })}
        <div className="terminal-line terminal-input-line">
          <span className="terminal-prompt">aaryan@Aaryans-MacBook-Pro</span>
          <span className="terminal-path"> ~ % </span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

// ===== Mail App =====

const EMAILS = [
  {
    id: 'welcome',
    from: 'Aaryan Kandiah',
    email: 'aaryan001@e.ntu.edu.sg',
    subject: 'Welcome to my Portfolio',
    date: 'Today',
    preview: 'Thanks for visiting! Here you can learn more about...',
    body: `Hi there,

Thanks for visiting my portfolio! I'm Aaryan Kandiah, an AI Engineer & Data Scientist based in Singapore.

I'm currently building agentic AI systems at Univers, and I recently graduated from NTU with a B.Eng in Electrical & Electronic Engineering (Honours, Distinction), specializing in Data Analysis & Machine Learning.

I'll be starting my postgraduate studies at NUS in August 2026.

Feel free to explore around and reach out if you'd like to connect!

Best regards,
Aaryan Kandiah
aaryan001@e.ntu.edu.sg`,
    read: true,
  },
  {
    id: 'projects',
    from: 'Projects Update',
    email: 'projects@aaryan.dev',
    subject: 'Latest Project Highlights',
    date: 'Yesterday',
    preview: 'Check out my latest work including the Research...',
    body: `Project Highlights:

1. Research Orchestration System
   Multi-agent system for automated literature reviews using Elasticsearch and ES|QL. Three specialized agents search, synthesize, and cross-verify findings.

2. AlphaDrop (150+ Users)
   AI-powered background removal Chrome extension. Runs entirely in-browser using ONNX runtime. Fast, private, and free.

3. Chest X-Ray Classification
   Multi-label deep learning model using DenseNet with Grad-CAM for clinical interpretability. Achieved AUC of 0.845.

4. Spotify History Visualizer
   Interactive dashboard with bubble charts, time-series graphs, and radar charts built with React and Recharts.

View all projects: github.com/Aaryan126`,
    read: false,
  },
  {
    id: 'experience',
    from: 'Career Summary',
    email: 'career@aaryan.dev',
    subject: 'Work Experience Overview',
    date: 'Mar 25',
    preview: 'AI Innovation Engineer Intern at Univers...',
    body: `Work Experience:

AI Innovation Engineer Intern - Univers
May 2025 - Present | Singapore

- Built a full-stack AI Agentic Platform for HVAC optimization serving 7 clients
- Developed RAG-based AI agents with VectorDB and multi-modal outputs
- Processing ~1M data points daily across 300+ sensor streams
- Increased GTM team productivity by ~25%
- Reduced incident response time by 40%

Technology Audit Services Intern - Manulife Singapore
May - Jul 2023 | Singapore

- Performed SOX audit and China market audit
- Programmed Python scripts for git repo data privacy scanning
- Prepared comprehensive audit workpapers`,
    read: true,
  },
  {
    id: 'connect',
    from: 'Contact Info',
    email: 'connect@aaryan.dev',
    subject: 'Let\'s Connect!',
    date: 'Mar 24',
    preview: 'Here are the best ways to reach me...',
    body: `Let's Connect!

Email: aaryan001@e.ntu.edu.sg
GitHub: github.com/Aaryan126
LinkedIn: linkedin.com/in/aaryan-kandiah-b2a719213
Location: Singapore

I'm open to opportunities, collaborations, and new ideas.
Don't hesitate to reach out!`,
    read: false,
  },
]

function MailApp() {
  const [selectedEmail, setSelectedEmail] = useState(EMAILS[0])
  const [activeFolder, setActiveFolder] = useState('inbox')

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: 'fas fa-inbox', count: EMAILS.filter(e => !e.read).length },
    { id: 'sent', label: 'Sent', icon: 'fas fa-paper-plane', count: 0 },
    { id: 'drafts', label: 'Drafts', icon: 'fas fa-file', count: 0 },
    { id: 'trash', label: 'Trash', icon: 'fas fa-trash', count: 0 },
  ]

  return (
    <div className="mail-app">
      <div className="mail-sidebar">
        <div className="mail-sidebar-section">Mailboxes</div>
        {folders.map(f => (
          <div
            key={f.id}
            className={`mail-folder ${activeFolder === f.id ? 'active' : ''}`}
            onClick={() => setActiveFolder(f.id)}
          >
            <i className={f.icon}></i>
            <span>{f.label}</span>
            {f.count > 0 && <span className="mail-folder-count">{f.count}</span>}
          </div>
        ))}
      </div>
      <div className="mail-list">
        {activeFolder === 'inbox' ? EMAILS.map(email => (
          <div
            key={email.id}
            className={`mail-item ${selectedEmail?.id === email.id ? 'active' : ''} ${!email.read ? 'unread' : ''}`}
            onClick={() => setSelectedEmail(email)}
          >
            <div className="mail-item-header">
              <span className="mail-item-from">{email.from}</span>
              <span className="mail-item-date">{email.date}</span>
            </div>
            <div className="mail-item-subject">{email.subject}</div>
            <div className="mail-item-preview">{email.preview}</div>
          </div>
        )) : (
          <div className="mail-empty">No messages</div>
        )}
      </div>
      <div className="mail-detail">
        {selectedEmail ? (
          <>
            <div className="mail-detail-header">
              <div className="mail-detail-subject">{selectedEmail.subject}</div>
              <div className="mail-detail-meta">
                <span className="mail-detail-from">{selectedEmail.from}</span>
                <span className="mail-detail-email">&lt;{selectedEmail.email}&gt;</span>
                <span className="mail-detail-date">{selectedEmail.date}</span>
              </div>
            </div>
            <div className="mail-detail-body">{selectedEmail.body}</div>
          </>
        ) : (
          <div className="mail-empty">Select a message</div>
        )}
      </div>
    </div>
  )
}

function CommandsApp() {
  const commands = [
    { section: 'Portfolio', items: ['skills', 'about', 'projects', 'experience', 'contact', 'certifications', 'education', 'goals', 'stats', 'stack', 'links'] },
    { section: 'System', items: ['neofetch', 'whoami', 'pwd', 'ls', 'cat <file>', 'tree', 'htop', 'pip list', 'git log', 'man aaryan', 'clear'] },
    { section: 'Fun', items: ['joke', 'music', 'hobbies', 'quote', 'ascii', 'coffee', 'curl aaryan', 'sudo hire me', 'rm -rf /', 'exit'] },
  ]

  return (
    <div className="commands-app">
      <div className="commands-header">Terminal Commands Cheat Sheet</div>
      <div className="commands-sub">Open the Terminal app and type any of these:</div>
      {commands.map(group => (
        <div key={group.section} className="commands-group">
          <div className="commands-group-title">{group.section}</div>
          <div className="commands-list">
            {group.items.map(cmd => (
              <code key={cmd} className="commands-item">{cmd}</code>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AppContent({ appId, onClose, onMinimize }) {
  switch (appId) {
    case 'about': return <AboutApp />
    case 'projects': return <ProjectsApp />
    case 'experience': return <ExperienceApp />
    case 'skills': return <SkillsApp />
    case 'contact': return <ContactApp />
    case 'resume': return <ResumeApp onClose={onClose} onMinimize={onMinimize} />
    case 'commands': return <CommandsApp />
    case 'safari': return <SafariApp />
    default: return null
  }
}
