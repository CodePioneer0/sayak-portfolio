import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CodeText = ({ position, text, delay }: { position: [number, number, number], text: string, delay: number }) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Falling effect
      textRef.current.position.y -= 0.02;
      
      // Reset position when falls too low
      if (textRef.current.position.y < -15) {
        textRef.current.position.y = 15;
      }

      // Subtle rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.1;

      // Opacity fade based on position
      const material = textRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const opacity = Math.max(0.3, 1 - Math.abs(textRef.current.position.y) / 15);
        material.opacity = opacity;
        
        // Matrix green color with slight variation
        const intensity = 0.6 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2;
        material.color.setRGB(0, intensity, 0.25);
        material.emissive.setRGB(0, intensity * 0.3, 0.1);
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.4}
      color="#00ff41"
      anchorX="center"
      anchorY="middle"
      maxWidth={3}
    >
      {text}
      <meshStandardMaterial
        transparent
        opacity={0.8}
        emissive="#00ff41"
        emissiveIntensity={0.2}
      />
    </Text>
  );
};

const MatrixRain = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const codeSnippets = useMemo(() => {
    const snippets = [
      'React.tsx',
      'useState()',
      'useEffect',
      'TypeScript',
      'Three.js',
      'WebGL',
      'const App',
      'function()',
      'async/await',
      'MongoDB',
      'Node.js',
      'Express',
      'API.get()',
      'npm install',
      'git push',
      'Docker',
      'GraphQL',
      'JWT',
      'Redux',
      'Next.js',
      'Tailwind',
      'Vite',
      'ESLint',
      'CSS Grid',
      'Flexbox',
      'Jest',
      'Python',
      'JavaScript',
      'HTML5',
      'CSS3'
    ];

    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        Math.random() * 30 - 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      text: snippets[Math.floor(Math.random() * snippets.length)],
      delay: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01
    }));
  }, []);

  const binaryStrings = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const binaryString = Array.from({ length: 6 }, () => Math.random() > 0.5 ? '1' : '0').join('');
      return {
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 25 - 12.5,
          (Math.random() - 0.5) * 12
        ] as [number, number, number],
        text: binaryString,
        delay: Math.random() * Math.PI * 2
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation based on mouse
      groupRef.current.rotation.y = mouse.x * 0.1;
      groupRef.current.rotation.x = mouse.y * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Code snippets */}
      {codeSnippets.map((snippet, i) => (
        <CodeText
          key={`code-${i}`}
          position={snippet.position}
          text={snippet.text}
          delay={snippet.delay}
        />
      ))}
      
      {/* Binary strings */}
      {binaryStrings.map((binary, i) => (
        <CodeText
          key={`binary-${i}`}
          position={binary.position}
          text={binary.text}
          delay={binary.delay}
        />
      ))}
    </group>
  );
};

const MatrixGrid = () => {
  const gridRef = useRef<THREE.Mesh>(null);

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 grid = abs(fract(vUv * 12.0) - 0.5) / fwidth(vUv * 12.0);
          float line = min(grid.x, grid.y);
          
          float pulse = sin(time * 1.5 + vUv.x * 8.0 + vUv.y * 6.0) * 0.5 + 0.5;
          vec3 color = vec3(0.0, 1.0, 0.25) * (1.0 - line) * pulse;
          float alpha = (1.0 - line) * 0.15 * pulse;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={gridRef} position={[0, 0, -8]} rotation={[0, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <primitive object={gridMaterial} />
    </mesh>
  );
};

interface FloatingCodeMatrixProps {
  className?: string;
}

const FloatingCodeMatrix = ({ className = "" }: FloatingCodeMatrixProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[8, 8, 8]} intensity={0.4} color="#00ff41" />
        <pointLight position={[-8, -8, -8]} intensity={0.2} color="#00ff41" />
        <fog attach="fog" args={["#000010", 6, 20]} />
        
        <MatrixGrid />
        <MatrixRain />
      </Canvas>
    </div>
  );
};

export default FloatingCodeMatrix;
