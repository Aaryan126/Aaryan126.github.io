import SkillBar from './SkillBar'
import { useInView } from '../hooks/useInView'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: 'fa-code',
    skills: [
      { name: 'Python', percentage: 90 },
      { name: 'SQL', percentage: 90 },
      { name: 'Java', percentage: 70 },
      { name: 'C Language', percentage: 60 },
    ],
  },
  {
    title: 'Machine Learning & Tools',
    icon: 'fa-brain',
    skills: [
      { name: 'TensorFlow 2', percentage: 88 },
      { name: 'PyTorch', percentage: 85 },
      { name: 'Scikit-Learn', percentage: 90 },
      { name: 'OpenCV', percentage: 70 },
    ],
  },
  {
    title: 'Data Analysis',
    icon: 'fa-chart-bar',
    skills: [
      { name: 'Pandas', percentage: 95 },
      { name: 'NumPy', percentage: 90 },
      { name: 'Matplotlib', percentage: 85 },
      { name: 'Seaborn', percentage: 82 },
    ],
  },
]

export default function Skills() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`skill-category ${hasBeenInView ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="skill-header">
                <i className={`fas ${category.icon}`}></i>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
