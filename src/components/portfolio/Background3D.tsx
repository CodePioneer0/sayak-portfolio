
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({ // Reduced from 15 to 8
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
      color: new THREE.Color().setHSL(0.1 + Math.random() * 0.3, 0.8, 0.6)
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y += Math.sin(state.clock.elapsedTime * orbs[i].speed + i) * 0.01;
          child.rotation.x += orbs[i].speed;
          child.rotation.z += orbs[i].speed * 0.5;
          
          // Mouse interaction
          child.position.x += mouse.x * 0.5;
          child.position.y += mouse.y * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          position={orb.position as [number, number, number]}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            args={[{
              color: orb.color,
              transparent: true,
              opacity: 0.6,
              emissive: orb.color,
              emissiveIntensity: 0.2
            }]}
          />
        </mesh>
      ))}
    </group>
  );
};

const GeometricShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-3, 2, -2]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          args={[{
            color: "#ff6b35",
            transparent: true,
            opacity: 0.4,
            wireframe: true
          }]}
        />
      </mesh>
      
      <mesh position={[3, -2, -1]}>
        <tetrahedronGeometry args={[1.2]} />
        <meshStandardMaterial
          args={[{
            color: "#4ecdc4",
            transparent: true,
            opacity: 0.5,
            wireframe: true
          }]}
        />
      </mesh>
      
      <mesh position={[0, 3, -3]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          args={[{
            color: "#ffe66d",
            transparent: true,
            opacity: 0.3
          }]}
        />
      </mesh>
    </group>
  );
};

interface Background3DProps {
  className?: string;
}

const Background3D = ({ className = "" }: Background3DProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false, // Disable for performance
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff6b35" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4ecdc4" />
        
        <FloatingOrbs />
        <GeometricShapes />
      </Canvas>
    </div>
  );
};

export default Background3D;
