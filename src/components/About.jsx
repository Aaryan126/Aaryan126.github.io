import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

// Animation configuration
const LAYOUT_SPRING = {
  type: 'spring',
  stiffness: 250,
  damping: 28,
  mass: 0.8,
}

const HOLD_THRESHOLD = 0 // ms to hold before drag activates (instant)

// Tile configuration
const TILES = [
  { id: 'intro', className: 'bento-intro', type: 'intro' },
  { id: 'projects', className: 'bento-stat', type: 'stat', props: { end: 8, suffix: '+', label: 'Projects' } },
  { id: 'tools', className: 'bento-stat', type: 'stat', props: { end: 15, suffix: '+', label: 'Tools' } },
  { id: 'certifications', className: 'bento-stat', type: 'stat', props: { end: 5, suffix: '+', label: 'Certifications' } },
  { id: 'education', className: 'bento-education', type: 'education' },
  { id: 'experience', className: 'bento-experience', type: 'experience' },
  { id: 'technical', className: 'bento-technical', type: 'technical' },
  { id: 'goals', className: 'bento-goals', type: 'goals' },
  { id: 'facts', className: 'bento-facts', type: 'facts' },
  { id: 'current', className: 'bento-current', type: 'current' },
  { id: 'interests', className: 'bento-interests', type: 'interests' },
]

const DEFAULT_ORDER = TILES.map(t => t.id)

// StatTile component with countup animation
function StatTileContent({ end, suffix = '', label }) {
  const { count, ref } = useCountUp(end, 2000)
  return (
    <div ref={ref} className="stat-content">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// Render tile content based on type
function TileContent({ tile }) {
  switch (tile.type) {
    case 'intro':
      return (
        <>
          <h3>AI Engineer & Data Scientist</h3>
          <p>Building AI solutions that solve real-world problems. Passionate about machine learning, computer vision, and agentic systems.</p>
        </>
      )
    case 'stat':
      return <StatTileContent {...tile.props} />
    case 'education':
      return (
        <>
          <h4>Education</h4>
          <div className="education-content">
            <span className="degree">B.Eng Electrical & Electronic Engineering</span>
            <span className="school">Nanyang Technological University</span>
            <span className="details">Data Analysis & ML • Honours (Distinction) • Dec 2025</span>
          </div>
        </>
      )
    case 'experience':
      return (
        <>
          <span className="experience-value">1+</span>
          <span className="experience-label">Years Experience</span>
          <span className="experience-sub">Internships</span>
        </>
      )
    case 'technical':
      return (
        <>
          <h4>Technical Stack</h4>
          <div className="tech-list">
            {['Python', 'React', 'PyTorch', 'LangChain', 'FastAPI', 'REST API', 'Scikit-Learn', 'MySQL', 'Docker'].map(tech => (
              <span key={tech} className="tech-item">{tech}</span>
            ))}
          </div>
        </>
      )
    case 'goals':
      return (
        <>
          <h4>Focus Areas</h4>
          <p>Designing <strong>intelligent systems</strong> that learn, reason, and act <strong>autonomously</strong> across complex environments. Special emphasis on <strong>fairness</strong>, <strong>interpretability</strong>, and <strong>robustness</strong> in machine learning models, alongside the development of <strong>multi-agent</strong> and <strong>decision-making pipelines</strong> that balance performance with transparency.</p>
        </>
      )
    case 'facts':
      return (
        <>
          <div className="fact-item"><span className="fact-label">Location</span><span className="fact-value">Singapore</span></div>
          <div className="fact-item"><span className="fact-label">University</span><span className="fact-value">NTU</span></div>
          <div className="fact-item"><span className="fact-label">Graduated</span><span className="fact-value">Dec 2025</span></div>
        </>
      )
    case 'current':
      return (
        <>
          <h4>Current Role</h4>
          <span className="current-role">AI Innovation Engineer Intern</span>
          <p>Developing multi-model AI chatbot for HVAC industry and secure survey tools with automated reporting.</p>
        </>
      )
    case 'interests':
      return (
        <>
          <h4>Interests</h4>
          <div className="interest-tags">
            {['ML', 'Agentic AI', 'CV', 'Data Science', 'Basketball', 'Travel'].map(interest => (
              <span key={interest} className="interest-tag">{interest}</span>
            ))}
          </div>
        </>
      )
    default:
      return null
  }
}

export default function About() {
  const { ref: sectionRef, hasBeenInView } = useInView()
  const [tileOrder, setTileOrder] = useState(DEFAULT_ORDER)

  // All drag state in refs for synchronous access
  const dragState = useRef({
    isHolding: false,
    isDragging: false,
    draggedId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
    lastHoveredId: null,
  })

  // State for triggering re-renders
  const [, forceUpdate] = useState(0)
  const [dragPosition, setDragPosition] = useState(null)

  const holdTimerRef = useRef(null)
  const tileRefsMap = useRef({})

  const getTileById = useCallback((id) => TILES.find(t => t.id === id), [])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    dragState.current = {
      isHolding: false,
      isDragging: false,
      draggedId: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
      width: 0,
      height: 0,
      lastHoveredId: null,
    }
    setDragPosition(null)
    forceUpdate(n => n + 1)
  }, [])

  // Pointer move handler
  const handlePointerMove = useCallback((e) => {
    const state = dragState.current

    // Cancel hold if moved too much before activation
    if (state.isHolding && !state.isDragging) {
      const dx = Math.abs(e.clientX - state.startX)
      const dy = Math.abs(e.clientY - state.startY)
      if (dx > 10 || dy > 10) {
        cleanup()
        return
      }
    }

    // Update position if dragging
    if (state.isDragging && state.draggedId) {
      const newX = e.clientX - state.offsetX
      const newY = e.clientY - state.offsetY
      setDragPosition({ x: newX, y: newY })

      // Find hovered tile
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const hoveredTile = elements.find(el =>
        el.dataset && el.dataset.tileId && el.dataset.tileId !== state.draggedId
      )

      if (hoveredTile) {
        const hoveredId = hoveredTile.dataset.tileId
        if (hoveredId !== state.lastHoveredId) {
          state.lastHoveredId = hoveredId

          // Swap tiles
          setTileOrder(prev => {
            const dragIdx = prev.indexOf(state.draggedId)
            const targetIdx = prev.indexOf(hoveredId)
            if (dragIdx === -1 || targetIdx === -1) return prev

            const newOrder = [...prev]
            newOrder[dragIdx] = hoveredId
            newOrder[targetIdx] = state.draggedId
            return newOrder
          })
        }
      } else {
        state.lastHoveredId = null
      }
    }
  }, [cleanup])

  // Pointer up handler
  const handlePointerUp = useCallback(() => {
    cleanup()
  }, [cleanup])

  // Pointer down on tile
  const handlePointerDown = useCallback((e, id) => {
    e.preventDefault()

    const tileEl = tileRefsMap.current[id]
    if (!tileEl) return

    const rect = tileEl.getBoundingClientRect()

    // Initialize drag state
    dragState.current = {
      isHolding: true,
      isDragging: false,
      draggedId: id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      lastHoveredId: null,
    }

    forceUpdate(n => n + 1)

    // Start hold timer
    holdTimerRef.current = setTimeout(() => {
      const state = dragState.current
      if (state.isHolding && state.draggedId === id) {
        state.isDragging = true
        setDragPosition({
          x: state.startX - state.offsetX,
          y: state.startY - state.offsetY
        })
        forceUpdate(n => n + 1)
      }
    }, HOLD_THRESHOLD)

    // Add global listeners
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }, [handlePointerMove, handlePointerUp])

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
      }
    }
  }, [handlePointerMove, handlePointerUp])

  // Animation delays for staggered entry
  const getAnimationDelay = (index) => {
    const delays = [0, 0.1, 0.15, 0.2, 0.25, 0.28, 0.3, 0.35, 0.4, 0.45, 0.5]
    return delays[index] || 0.5
  }

  const state = dragState.current
  const isDragging = state.isDragging
  const draggedId = state.draggedId
  const isHolding = state.isHolding

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <LayoutGroup>
          <div className={`bento-grid ${hasBeenInView ? 'animate-in' : ''} ${isDragging ? 'dragging-active' : ''}`}>
            {tileOrder.map((id, index) => {
              const tile = getTileById(id)
              const isThisDragged = isDragging && draggedId === id
              const isThisHolding = isHolding && !isDragging && draggedId === id

              return (
                <motion.div
                  key={id}
                  layoutId={id}
                  layout
                  ref={(el) => { tileRefsMap.current[id] = el }}
                  data-tile-id={id}
                  className={`bento-tile ${tile.className} ${isThisDragged ? 'dragging' : ''} ${isThisHolding ? 'holding' : ''}`}
                  style={{ animationDelay: `${getAnimationDelay(index)}s` }}
                  onPointerDown={(e) => handlePointerDown(e, id)}
                  transition={LAYOUT_SPRING}
                >
                  <TileContent tile={tile} />
                </motion.div>
              )
            })}
          </div>

          {/* Floating dragged tile */}
          {isDragging && draggedId && dragPosition && (
            <motion.div
              className={`floating-tile ${getTileById(draggedId)?.className || ''}`}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              style={{
                position: 'fixed',
                left: dragPosition.x,
                top: dragPosition.y,
                width: state.width,
                height: state.height,
                zIndex: 1000,
                pointerEvents: 'none',
              }}
            >
              <TileContent tile={getTileById(draggedId)} />
            </motion.div>
          )}
        </LayoutGroup>
      </div>
    </section>
  )
}
