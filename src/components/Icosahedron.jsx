import { useRef, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const RADIUS = 1.2
const D = 2.0
const RES_THETA = 60
const RES_PHI = 30
const RES_PSI = 15

function stereoProject(x, y, z, w) {
  const denom = 1 - w / D
  const scale = 1 / Math.max(denom, 0.05)
  return [x * scale, y * scale, z * scale]
}

function rotate4D(p, angle, plane) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const [x, y, z, w] = p
  switch (plane) {
    case 'xw': return [c * x + s * w, y, z, -s * x + c * w]
    case 'yw': return [x, c * y + s * w, z, -s * y + c * w]
    case 'zw': return [x, y, c * z + s * w, -s * z + c * w]
    default: return p
  }
}

function generateGridLines() {
  const lines = []

  for (let pi = 1; pi < RES_PSI; pi++) {
    const psi = (pi / RES_PSI) * Math.PI
    for (let phiI = 1; phiI < RES_PHI; phiI++) {
      const phi = (phiI / RES_PHI) * Math.PI
      const pts = []
      for (let ti = 0; ti <= RES_THETA; ti++) {
        const theta = (ti / RES_THETA) * Math.PI * 2
        pts.push([
          RADIUS * Math.sin(psi) * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.sin(psi) * Math.sin(phi) * Math.sin(theta),
          RADIUS * Math.sin(psi) * Math.cos(phi),
          RADIUS * Math.cos(psi),
        ])
      }
      lines.push(pts)
    }
  }

  for (let pi = 1; pi < RES_PSI; pi++) {
    const psi = (pi / RES_PSI) * Math.PI
    for (let ti = 0; ti < RES_THETA; ti += 4) {
      const theta = (ti / RES_THETA) * Math.PI * 2
      const pts = []
      for (let phiI = 0; phiI <= RES_PHI; phiI++) {
        const phi = (phiI / RES_PHI) * Math.PI
        pts.push([
          RADIUS * Math.sin(psi) * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.sin(psi) * Math.sin(phi) * Math.sin(theta),
          RADIUS * Math.sin(psi) * Math.cos(phi),
          RADIUS * Math.cos(psi),
        ])
      }
      lines.push(pts)
    }
  }

  return lines
}

function generatePoints(count) {
  const points = []
  for (let i = 0; i < count; i++) {
    const psi = Math.acos(1 - 2 * Math.random())
    const phi = Math.acos(1 - 2 * Math.random())
    const theta = Math.random() * Math.PI * 2
    points.push([
      RADIUS * Math.sin(psi) * Math.sin(phi) * Math.cos(theta),
      RADIUS * Math.sin(psi) * Math.sin(phi) * Math.sin(theta),
      RADIUS * Math.sin(psi) * Math.cos(phi),
      RADIUS * Math.cos(psi),
    ])
  }
  return points
}

function wToColor(w) {
  const t = (w / RADIUS + 1) / 2
  const r = 0.15 + t * 0.15
  const g = 0.4 + t * 0.4
  const b = 0.85 + t * 0.15
  return [r, g, b]
}

function HypersphereLines() {
  const linesData = useMemo(() => generateGridLines(), [])
  const timeRef = useRef(0)

  const geometries = useMemo(() => {
    return linesData.map((line) => {
      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(line.length * 3)
      const colors = new Float32Array(line.length * 3)
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      return { geo, count: line.length }
    })
  }, [linesData])

  useFrame((_, delta) => {
    timeRef.current += delta
    const t = timeRef.current
    linesData.forEach((line, li) => {
      const { geo } = geometries[li]
      const pos = geo.attributes.position.array
      const col = geo.attributes.color.array

      for (let j = 0; j < line.length; j++) {
        let p = [...line[j]]
        p = rotate4D(p, t * 0.2, 'xw')
        p = rotate4D(p, t * 0.15, 'yw')
        p = rotate4D(p, t * 0.1, 'zw')

        const w = p[3]
        const [px, py, pz] = stereoProject(p[0], p[1], p[2], w)
        pos[j * 3] = px
        pos[j * 3 + 1] = py
        pos[j * 3 + 2] = pz

        const [cr, cg, cb] = wToColor(w)
        col[j * 3] = cr
        col[j * 3 + 1] = cg
        col[j * 3 + 2] = cb
      }

      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
    })
  })

  return (
    <group>
      {geometries.map(({ geo }, i) => (
        <line key={i} geometry={geo} renderOrder={2}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.5}
            depthTest={false}
          />
        </line>
      ))}
    </group>
  )
}

function HyperspherePoints() {
  const points4D = useMemo(() => generatePoints(2000), [])
  const timeRef = useRef(0)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(points4D.length * 3)
    const colors = new Float32Array(points4D.length * 3)
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [points4D])

  useFrame((_, delta) => {
    timeRef.current += delta
    const t = timeRef.current
    const pos = geometry.attributes.position.array
    const col = geometry.attributes.color.array

    for (let i = 0; i < points4D.length; i++) {
      let p = [...points4D[i]]
      p = rotate4D(p, t * 0.2, 'xw')
      p = rotate4D(p, t * 0.15, 'yw')
      p = rotate4D(p, t * 0.1, 'zw')

      const w = p[3]
      const [px, py, pz] = stereoProject(p[0], p[1], p[2], w)
      pos[i * 3] = px
      pos[i * 3 + 1] = py
      pos[i * 3 + 2] = pz

      const [cr, cg, cb] = wToColor(w)
      col[i * 3] = cr
      col[i * 3 + 1] = cg
      col[i * 3 + 2] = cb
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  })

  return (
    <points geometry={geometry} renderOrder={3}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        depthTest={false}
        sizeAttenuation
      />
    </points>
  )
}

function HypersphereShape() {
  const groupRef = useRef()
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const dragRotation = useRef({ x: Math.PI / 2, y: 0 })
  const { gl } = useThree()

  const onPointerDown = useCallback((e) => {
    isDragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
    gl.domElement.style.cursor = 'grabbing'
  }, [gl])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    gl.domElement.style.cursor = 'grab'
  }, [gl])

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    dragRotation.current.y += dx * 0.005
    dragRotation.current.x += dy * 0.005
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    const el = gl.domElement
    el.style.cursor = 'grab'
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', onPointerUp)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerUp)
    }
  }, [gl, onPointerDown, onPointerUp, onPointerMove])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = dragRotation.current.x
    groupRef.current.rotation.y = dragRotation.current.y
  })

  return (
    <group ref={groupRef}>
      <HypersphereLines />
      <HyperspherePoints />
    </group>
  )
}

function Scene() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <HypersphereShape />
    </Float>
  )
}

export default function Icosahedron() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0)
        scene.background = null
      }}
      style={{ width: '100%', height: '100%' }}
      className="icosahedron-canvas"
    >
      <Scene />
    </Canvas>
  )
}
