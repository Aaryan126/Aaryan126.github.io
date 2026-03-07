import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function WireframeIcosahedron() {
  const groupRef = useRef()
  const frontWireRef = useRef()
  const { pointer } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Smooth mouse follow
    targetRotation.current.x += (pointer.y * 0.4 - targetRotation.current.x) * 0.05
    targetRotation.current.y += (pointer.x * 0.4 - targetRotation.current.y) * 0.05

    groupRef.current.rotation.x = t * 0.05 + targetRotation.current.x
    groupRef.current.rotation.y = t * 0.15 + targetRotation.current.y

    // Pulsing
    const pulse = 0.85 + Math.sin(t * 1.5) * 0.15
    if (frontWireRef.current) frontWireRef.current.material.opacity = pulse
  })

  return (
    <group ref={groupRef}>
      {/* Solid front faces — lit shading for depth and realism */}
      <mesh renderOrder={0}>
        <icosahedronGeometry args={[1.49, 0]} />
        <meshPhysicalMaterial
          color="#8ab4f8"
          metalness={0.95}
          roughness={0.08}
          transparent
          opacity={0.5}
          clearcoat={1}
          clearcoatRoughness={0.02}
          reflectivity={1}
          specularIntensity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          envMapIntensity={3}
        />
      </mesh>

      {/* Wireframe — single pass, back edges dimmed by solid faces */}
      <mesh renderOrder={2} ref={frontWireRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthTest={false}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh renderOrder={0}>
        <icosahedronGeometry args={[1.58, 0]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Vertex dots */}
      <VertexDots />
    </group>
  )
}

function VertexDots() {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), [])
  const vertices = useMemo(() => {
    const pos = geo.attributes.position
    const verts = []
    const seen = new Set()
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`
      if (!seen.has(key)) {
        seen.add(key)
        verts.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)))
      }
    }
    return verts
  }, [geo])

  return (
    <group>
      {vertices.map((v, i) => (
        <mesh key={i} position={v} renderOrder={10}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial
            color="#888888"
            depthTest={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingLight() {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(t * 0.4) * 5
      lightRef.current.position.y = Math.sin(t * 0.3) * 3
      lightRef.current.position.z = Math.sin(t * 0.4) * 5
    }
  })
  return <pointLight ref={lightRef} intensity={2} color="#ffffff" distance={15} />
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      {/* Key light — strong top-right */}
      <directionalLight position={[4, 4, 5]} intensity={1.5} color="#ffffff" />
      {/* Fill light — softer blue from left */}
      <directionalLight position={[-5, -1, 3]} intensity={0.5} color="#3b82f6" />
      {/* Rim light — behind for edge highlight */}
      <pointLight position={[0, 3, -5]} intensity={0.8} color="#60a5fa" />
      {/* Bottom accent */}
      <pointLight position={[0, -5, 2]} intensity={0.3} color="#1d4ed8" />
      {/* Orbiting white light */}
      <OrbitingLight />

      <Environment preset="night" background={false} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <WireframeIcosahedron />
      </Float>

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.12}
          luminanceSmoothing={0.9}
          intensity={1.3}
          radius={0.85}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </>
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
