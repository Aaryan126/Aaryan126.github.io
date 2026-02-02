import { useTypewriter } from '../hooks/useTypewriter'

const roles = ['AI Engineer', 'Data Scientist', 'ML Specialist', 'Problem Solver']

const CodeBlock = () => (
  <>
    <span className="code-keyword">import</span> torch.nn <span className="code-keyword">as</span> nn{'\n'}
{'\n'}
<span className="code-keyword">class</span> <span className="code-class">NeuralNetwork</span>(nn.Module):{'\n'}
    <span className="code-keyword">def</span> <span className="code-function">__init__</span>(<span className="code-param">self</span>):{'\n'}
        <span className="code-builtin">super</span>().__init__(){'\n'}
        <span className="code-param">self</span>.layers = nn.Sequential({'\n'}
            nn.Linear(<span className="code-number">784</span>, <span className="code-number">256</span>),{'\n'}
            nn.ReLU(),{'\n'}
            nn.Dropout(<span className="code-number">0.2</span>),{'\n'}
            nn.Linear(<span className="code-number">256</span>, <span className="code-number">128</span>),{'\n'}
            nn.ReLU(),{'\n'}
            nn.Linear(<span className="code-number">128</span>, <span className="code-number">10</span>){'\n'}
        ){'\n'}
{'\n'}
    <span className="code-keyword">def</span> <span className="code-function">forward</span>(<span className="code-param">self</span>, x):{'\n'}
        <span className="code-keyword">return</span> <span className="code-param">self</span>.layers(x){'\n'}
{'\n'}
model = <span className="code-class">NeuralNetwork</span>(){'\n'}
<span className="code-builtin">print</span>(model)
  </>
)

export default function Hero() {
  const typewriterText = useTypewriter(roles, 100, 50, 2000)

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-title">Aaryan Kandiah</h1>
            <p className="hero-subtitle">
              <span className="typewriter">{typewriterText}</span>
              <span className="cursor">|</span>
            </p>
            <p className="hero-description">
              Passionate about leveraging Machine learning, Agentic AI, and Computer vision to solve real-world problems.
              Currently pursuing Electrical and Electronic Engineering at NTU, specializing in Data Analysis and Machine Learning.
            </p>
            <div className="hero-buttons">
              <a href="/Aaryan_Kandiah_Resume.docx" download className="btn btn-primary">
                <i className="fas fa-download"></i>
                Download Resume
              </a>
              <a href="#projects" className="btn btn-secondary" onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                <i className="fas fa-eye"></i>
                View Projects
              </a>
            </div>
          </div>
          <div className="hero-code">
            <div className="code-window">
              <div className="code-header">
                <div className="code-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="code-filename">model.py</span>
              </div>
              <pre className="code-body"><code><CodeBlock /></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
