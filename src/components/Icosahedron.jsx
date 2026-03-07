import { useRef, useEffect } from 'react'

// Icosahedron geometry — 12 vertices, 30 edges, 20 faces
const PHI = (1 + Math.sqrt(5)) / 2
const NORM = Math.sqrt(1 + PHI * PHI)

const VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => [x / NORM, y / NORM, z / NORM])

const EDGES = [
  [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
  [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
  [1, 5], [1, 9], [1, 8], [1, 7],
  [2, 4], [2, 11], [2, 10], [2, 6],
  [5, 11], [5, 4], [5, 9],
  [7, 10], [7, 8], [7, 6],
  [4, 9], [4, 11],
  [8, 9], [8, 6],
  [10, 11], [10, 6],
]

const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
]

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]
}

function rotateY(v, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]
}

function rotateZ(v, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]]
}

function project(v, w, h, fov, dist) {
  const f = fov / (dist + v[2])
  return [v[0] * f + w / 2, v[1] * f + h / 2, v[2]]
}

function drawEdges(ctx, projected) {
  for (const [i, j] of EDGES) {
    ctx.beginPath()
    ctx.moveTo(projected[i][0], projected[i][1])
    ctx.lineTo(projected[j][0], projected[j][1])
    ctx.stroke()
  }
}

export default function Icosahedron({ scrollProgress = 0 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const timeRef = useRef(0)
  const lastTsRef = useRef(null)
  const scrollRef = useRef(scrollProgress)

  useEffect(() => {
    scrollRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
    const draw = (timestamp) => {
      const canvas = canvasRef.current
      if (!canvas) return

      if (lastTsRef.current === null) lastTsRef.current = timestamp
      const dt = (timestamp - lastTsRef.current) / 1000
      lastTsRef.current = timestamp
      timeRef.current += dt

      const ctx = canvas.getContext('2d')
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const sp = scrollRef.current
      const t = timeRef.current

      const rotXAngle = t * 0.05 + sp * Math.PI * 0.8
      const rotYAngle = t * 0.15 + sp * Math.PI * 2
      const rotZAngle = sp * Math.PI * 0.3

      const scale = Math.min(w, h) * 0.35
      const fov = 300
      const viewDist = 3

      const transformed = VERTICES.map(v => {
        let r = [v[0] * scale / fov, v[1] * scale / fov, v[2]]
        r = rotateX(r, rotXAngle)
        r = rotateY(r, rotYAngle)
        r = rotateZ(r, rotZAngle)
        return r
      })

      const projected = transformed.map(v => project(v, w, h, fov, viewDist))

      // Semi-transparent faces (depth sorted back-to-front)
      const sortedFaces = FACES
        .map(face => ({
          face,
          avgZ: (transformed[face[0]][2] + transformed[face[1]][2] + transformed[face[2]][2]) / 3,
        }))
        .sort((a, b) => a.avgZ - b.avgZ)

      ctx.globalAlpha = 0.04
      ctx.fillStyle = '#3b82f6'
      for (const { face } of sortedFaces) {
        ctx.beginPath()
        ctx.moveTo(projected[face[0]][0], projected[face[0]][1])
        ctx.lineTo(projected[face[1]][0], projected[face[1]][1])
        ctx.lineTo(projected[face[2]][0], projected[face[2]][1])
        ctx.closePath()
        ctx.fill()
      }

      // Glowing wireframe — 3-pass rendering
      ctx.globalAlpha = 1.0

      // Pass 1: outer glow
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 3
      ctx.shadowColor = '#3b82f6'
      ctx.shadowBlur = 15
      drawEdges(ctx, projected)

      // Pass 2: bright edge
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)'
      ctx.lineWidth = 1.2
      ctx.shadowBlur = 8
      drawEdges(ctx, projected)

      // Pass 3: core highlight
      ctx.strokeStyle = 'rgba(200, 220, 255, 0.5)'
      ctx.lineWidth = 0.5
      ctx.shadowBlur = 0
      drawEdges(ctx, projected)

      // Vertex dots
      ctx.shadowBlur = 10
      ctx.shadowColor = '#3b82f6'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
      for (const [x, y] of projected) {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="icosahedron-canvas"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
