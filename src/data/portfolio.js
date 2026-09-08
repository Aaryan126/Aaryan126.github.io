export const profile = {
  name: 'Aaryan Kandiah',
  eyebrow: 'AI engineer · product-minded maker · Singapore',
  headline: 'I design and build intelligent tools for messy, real-world problems.',
  introduction:
    'I work where interaction design, AI systems, and frontend engineering meet, turning complex workflows into products people can understand, trust, and use.',
  email: 'aaryan.kandiah@u.nus.edu',
  location: 'Singapore',
  github: 'https://github.com/Aaryan126',
  linkedin: 'https://www.linkedin.com/in/aaryan-kandiah-b2a719213',
  resumePdf: '/Aaryan_Kandiah_Resume.pdf',
  resumeDocx: '/Aaryan_Kandiah_Resume.docx',
}

export const projects = [
  {
    slug: 'boldr-signaldesk',
    title: 'BOLDR SignalDesk',
    kicker: 'Responsible AI · Workflow design',
    subtitle: 'Designing trust into AI-assisted customer support',
    image: '/projects/boldr-signaldesk-echelon.webp',
    imagePosition: 'center 42%',
    featured: true,
    year: '2026',
    role: 'Product design, AI workflow architecture, and full-stack development',
    timeline: 'AI Workflow Competition · Echelon Singapore',
    outcome: '1st place · selected from 147 builders · $16,000 in prizes and credits',
    summary:
      'An approval-first customer-intelligence workflow that drafts replies, blocks unsupported claims, captures knowledge gaps, and turns recurring enquiries into useful business insight.',
    challenge:
      'Customer-facing AI can move quickly while quietly introducing risk. The experience needed to help teams draft useful answers without presenting unsupported claims as fact, and make every intervention easy to review.',
    constraints: [
      'Keep a human responsible for the final customer response.',
      'Ground generated claims in available evidence instead of model confidence.',
      'Turn unresolved questions into reusable knowledge rather than losing them in a queue.',
      'Deliver a working end-to-end workflow within a competition timeframe.',
    ],
    decisions: [
      {
        number: '01',
        title: 'Approval before automation',
        text: 'The workflow prepares a response but keeps publishing behind an explicit review step, making responsibility visible instead of hiding it inside the model.',
      },
      {
        number: '02',
        title: 'Evidence as interface',
        text: 'Unsupported claims are blocked and knowledge gaps are surfaced as actionable states, so trust comes from inspectable evidence rather than polished language.',
      },
      {
        number: '03',
        title: 'Make repetition useful',
        text: 'Recurring enquiries feed FAQ and marketing insights, connecting the immediate service task to longer-term improvements in the information system.',
      },
    ],
    reflection:
      'The strongest part of SignalDesk is not the generated reply; it is the set of boundaries around it. A next iteration would test the review states with support teams and measure whether evidence presentation reduces approval time without encouraging rubber-stamping.',
    tech: ['FastAPI', 'Next.js', 'React', 'TypeScript', 'GLM-5.1', 'Responsible AI'],
    link: 'https://github.com/Aaryan126/BOLDR_Aaryan',
    linkLabel: 'View repository',
  },
  {
    slug: 'adapt',
    title: 'ADapt',
    kicker: 'Localization · Generative workflow',
    subtitle: 'Localizing advertisements without flattening culture',
    image: '/projects/adapt.webp',
    featured: true,
    year: '2026',
    role: 'Product concept, workflow design, and full-stack development',
    timeline: 'Agent Forge AI Hackathon',
    outcome: '1st place out of 20+ teams · six Southeast Asian markets',
    summary:
      'A multi-model pipeline that produces culturally adapted strategy, multilingual copy, and localized imagery for advertising across Southeast Asia.',
    challenge:
      'Localization is more than translation. The product had to coordinate several model outputs while keeping market context, copy, and imagery legible as one coherent workflow.',
    constraints: [
      'Support six markets without reducing them to a single regional treatment.',
      'Coordinate strategy, language, and image generation across different models.',
      'Present generated assets as a usable campaign package rather than disconnected outputs.',
      'Build and demonstrate the complete workflow within a hackathon.',
    ],
    decisions: [
      {
        number: '01',
        title: 'Context before generation',
        text: 'Market strategy is established before copy and imagery, giving downstream generation a shared cultural and campaign frame.',
      },
      {
        number: '02',
        title: 'One staged workflow',
        text: 'Multiple models are orchestrated behind a single progression so users follow the work rather than the underlying technical hand-offs.',
      },
      {
        number: '03',
        title: 'Outputs designed as a set',
        text: 'Strategy, localized copy, and imagery are treated as related campaign artifacts, making comparison and publishing easier.',
      },
    ],
    reflection:
      'ADapt demonstrates the value of orchestration, but cultural quality still requires local judgment. The next iteration would add native-speaker review, explicit edit history, and comparison tools between source and adapted campaigns.',
    tech: ['FastAPI', 'React', 'GPT-5.4', 'GLM-5.1', 'Gemini 3.1 Flash', 'Publer API'],
    link: 'https://github.com/Aaryan126/ADapt',
    linkLabel: 'View repository',
  },
  {
    slug: 'alphadrop',
    title: 'AlphaDrop',
    kicker: 'Browser product · Private AI',
    subtitle: 'Making background removal private and immediate',
    image: '/projects/alphadrop.webp',
    featured: true,
    year: '2025',
    role: 'Product design, frontend engineering, and on-device ML integration',
    timeline: 'Independent shipped product',
    outcome: '200+ users · processing stays in the browser',
    summary:
      'A focused Chrome extension that removes image backgrounds locally with ONNX. Fast, private, and free, with no upload step or server dependency.',
    challenge:
      'Background-removal tools often add account creation, upload delays, and privacy uncertainty to a very small task. AlphaDrop needed to make the path from source image to usable cutout feel immediate.',
    constraints: [
      'Run inference locally within browser resource limits.',
      'Communicate privacy without interrupting the primary task.',
      'Keep the interaction understandable without setup or specialist controls.',
      'Package the experience within Chrome extension constraints.',
    ],
    decisions: [
      {
        number: '01',
        title: 'One job, one clear path',
        text: 'The product is organized around selecting an image, processing it, and retrieving the result instead of exposing model configuration.',
      },
      {
        number: '02',
        title: 'Privacy through architecture',
        text: 'ONNX inference runs in the browser, making the privacy promise a property of the product rather than a policy users must trust.',
      },
      {
        number: '03',
        title: 'Feedback during invisible work',
        text: 'Processing states make local inference understandable and prevent a fast utility from feeling unresponsive.',
      },
    ],
    reflection:
      'The extension has validated demand with more than 200 users. A next iteration would measure completion and repeat-use patterns, improve edge refinement controls, and test clearer before-and-after comparison states.',
    tech: ['JavaScript', 'ONNX Runtime', 'Canvas API', 'Chrome Extension API'],
    link: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    linkLabel: 'Open Chrome Web Store',
  },
  {
    slug: 'research-orchestration',
    title: 'Research Orchestration System',
    kicker: 'Multi-agent systems',
    subtitle: 'A research platform for search, synthesis, review, and verification',
    image: '/projects/research-orchestration.webp',
    year: '2026',
    summary:
      'Three specialized agents automate literature review and cross-verify claims across academic papers using Elasticsearch and ES|QL.',
    outcome: 'Search, synthesis, review, and verification in one workflow',
    tech: ['Elastic Agent Builder', 'Elasticsearch', 'ES|QL', 'FastAPI', 'React', 'MCP'],
    link: 'https://github.com/Aaryan126/Research_Agent',
    video: 'https://www.youtube.com/watch?v=KatuxMUNVjU',
  },
  {
    slug: 'spotify-visualizer',
    title: 'Spotify Streaming History Visualizer',
    kicker: 'Data visualization',
    subtitle: 'Turning listening history into an explorable personal story',
    image: '/projects/spotify_viz.webp',
    year: '2025',
    summary:
      'An interactive dashboard for exploring top tracks, artists, listening patterns, and yearly recaps through multiple visual forms.',
    outcome: 'Bubble charts, time series, radar charts, and yearly recaps',
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    link: 'https://startling-marshmallow-c649ed.netlify.app/',
  },
  {
    slug: 'chest-xray-classification',
    title: 'Chest X-Ray Classification',
    kicker: 'Explainable AI',
    subtitle: 'Interpretable multi-label detection for chest X-rays',
    image: '/projects/CXR_Classification.webp',
    year: '2025',
    summary:
      'A multi-label DenseNet model for thoracic abnormalities with Grad-CAM visual explanations for clinical interpretability.',
    outcome: '0.845 AUC score',
    tech: ['PyTorch', 'DenseNet', 'Explainable AI', 'Grad-CAM'],
    link: 'https://github.com/Aaryan126/FYP_Website',
  },
  {
    slug: 'ship-navigation',
    title: 'Ship Navigation System',
    kicker: 'Interface · Path planning',
    subtitle: 'Global and local navigation with obstacle avoidance',
    image: '/projects/ship-navigation.webp',
    year: '2024',
    summary:
      'A PyQt5 navigation interface combining global and local path planning with obstacle avoidance.',
    outcome: 'A* and Dynamic Window Approach in an interactive interface',
    tech: ['Python', 'PyQt5', 'A*', 'Dynamic Window Approach'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
  },
  {
    slug: 'brain-tumor-detection',
    title: 'Brain Tumor Detection',
    kicker: 'Machine learning',
    subtitle: 'Classification through dimensionality reduction',
    image: '/projects/brain-tumor.webp',
    year: '2024',
    summary:
      'A computer-vision classification study comparing dimensionality reduction and learning approaches for brain-tumor detection.',
    outcome: '94.35% highest accuracy with Passive Aggressive Classifier and PCA',
    tech: ['Scikit-learn', 'TensorFlow', 'Pandas', 'Matplotlib'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
  },
]

export const experiences = [
  {
    period: '2025 to present',
    title: 'AI Innovation Engineer Intern',
    company: 'Univers',
    location: 'Singapore',
    summary:
      'Built an agentic HVAC platform serving seven clients, shipped across Java and React systems processing about one million daily data points per client, and reduced incident-response time by 40%.',
    skills: ['Agentic AI', 'RAG', 'Product delivery', 'React', 'FastAPI'],
  },
  {
    period: '2023',
    title: 'Technology Audit Services Intern',
    company: 'Manulife Singapore',
    location: 'Singapore',
    summary:
      'Supported SOX and China-market audits, documented evidence and conclusions, and built a Python repository scanner for potential privacy issues.',
    skills: ['Audit', 'Evidence review', 'Python', 'Data analysis'],
  },
]

export const credentials = [
  'AWS Certified AI Practitioner',
  'Google Advanced Data Analytics Certificate',
  'AI For Everyone · DeepLearning.AI',
  'Machine Learning with Python · IBM',
  'SQL (Advanced) · HackerRank',
  'Object Oriented Programming in Java · UC San Diego',
  'Python for Everybody · University of Michigan',
]

export const capabilities = [
  {
    number: '01',
    title: 'Make complexity legible',
    text: 'I map systems, states, and constraints before deciding what the interface should reveal.',
  },
  {
    number: '02',
    title: 'Design trust explicitly',
    text: 'For AI products, evidence, uncertainty, review, and failure states are part of the core experience.',
  },
  {
    number: '03',
    title: 'Prototype through code',
    text: 'I use implementation as a design material, testing interaction ideas in the environment where they must work.',
  },
]

export const tools = [
  'Interaction design',
  'Information architecture',
  'Rapid prototyping',
  'React',
  'TypeScript',
  'Python',
  'FastAPI',
  'PyTorch',
  'Responsible AI',
  'Data visualization',
  'Docker',
  'MySQL',
]
