"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingRing({
  position,
  scale,
  speed,
  rotationAxis,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotationAxis[0] * speed * 0.003;
    meshRef.current.rotation.y += rotationAxis[1] * speed * 0.003;
    meshRef.current.rotation.z += rotationAxis[2] * speed * 0.003;
    meshRef.current.position.y =
      initialY + Math.sin(t * speed * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.05, 32, 100]} />
      <meshStandardMaterial
        color="#a0c4e8"
        transparent
        opacity={0.15}
        roughness={0.6}
        metalness={0.3}
      />
    </mesh>
  );
}

function FloatingBubble({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useMemo(() => [...position] as [number, number, number], [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y =
      initialPos[1] + Math.sin(t * speed * 0.4) * 0.5;
    meshRef.current.position.x =
      initialPos[0] + Math.cos(t * speed * 0.3) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#cde0f0"
        transparent
        opacity={0.08}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function WavyLine({
  yPos,
  speed,
  amplitude,
}: {
  yPos: number;
  speed: number;
  amplitude: number;
}) {
  const lineRef = useRef<THREE.Line | null>(null);
  const pointCount = 100;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const x = (i / pointCount) * 20 - 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = yPos;
      positions[i * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [yPos]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#b0cfe0", transparent: true, opacity: 0.12 }),
    []
  );

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pointCount; i++) {
      const x = (i / pointCount) * 20 - 10;
      const y =
        yPos +
        Math.sin(x * 0.5 + t * speed) * amplitude +
        Math.sin(x * 0.3 + t * speed * 0.7) * amplitude * 0.5;
      pos.setXYZ(i, x, y, 0);
    }
    pos.needsUpdate = true;
  });

  return (
    <primitive
      ref={lineRef}
      object={new THREE.Line(geometry, material)}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      {/* Floating rings like in the reference */}
      <FloatingRing
        position={[-4.5, 2.5, -3]}
        scale={1.8}
        speed={0.6}
        rotationAxis={[1, 0.5, 0.3]}
      />
      <FloatingRing
        position={[5, -1, -4]}
        scale={2.2}
        speed={0.4}
        rotationAxis={[0.3, 1, 0.5]}
      />
      <FloatingRing
        position={[-2, -3, -5]}
        scale={1.4}
        speed={0.8}
        rotationAxis={[0.5, 0.3, 1]}
      />
      <FloatingRing
        position={[3, 3, -6]}
        scale={2.5}
        speed={0.3}
        rotationAxis={[1, 1, 0.2]}
      />
      <FloatingRing
        position={[-6, 0, -4]}
        scale={1.0}
        speed={0.7}
        rotationAxis={[0.2, 0.8, 1]}
      />
      <FloatingRing
        position={[6.5, 2, -5]}
        scale={1.6}
        speed={0.5}
        rotationAxis={[0.7, 0.4, 0.6]}
      />

      {/* Soft bubbles */}
      <FloatingBubble position={[3.5, 1.5, -2]} scale={0.6} speed={0.5} />
      <FloatingBubble position={[-3, 2, -3]} scale={0.35} speed={0.7} />
      <FloatingBubble position={[5.5, -2, -4]} scale={0.45} speed={0.4} />
      <FloatingBubble position={[-5, -1, -3]} scale={0.55} speed={0.6} />
      <FloatingBubble position={[1, 3.5, -5]} scale={0.3} speed={0.8} />
      <FloatingBubble position={[-1, -3, -4]} scale={0.4} speed={0.5} />

      {/* Wavy decorative lines */}
      <WavyLine yPos={4} speed={0.3} amplitude={0.15} />
      <WavyLine yPos={-4} speed={0.4} amplitude={0.2} />
      <WavyLine yPos={0} speed={0.25} amplitude={0.1} />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
