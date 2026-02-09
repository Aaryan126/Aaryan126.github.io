export default function SkillBar({ name, percentage }) {
  return (
    <div className="skill-item">
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div
          className="skill-progress"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
