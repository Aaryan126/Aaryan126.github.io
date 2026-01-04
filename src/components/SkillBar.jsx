import { useInView } from '../hooks/useInView'

export default function SkillBar({ name, percentage }) {
  const { ref, hasBeenInView } = useInView()

  return (
    <div className="skill-item" ref={ref}>
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div
          className="skill-progress"
          style={{
            width: hasBeenInView ? `${percentage}%` : '0%',
            transition: 'width 1s ease-out',
          }}
        ></div>
      </div>
    </div>
  )
}
