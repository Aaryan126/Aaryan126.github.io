import { useCountUp } from '../hooks/useCountUp'

export default function StatCounter({ end, suffix = '', label }) {
  const { count, ref } = useCountUp(end, 2000)

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
