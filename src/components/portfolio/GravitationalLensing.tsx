import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BlackHole = () => {
  const blackHoleRef = useRef<THREE.Group>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const eventHorizonRef = useRef<THREE.Mesh>(null);

  const eventHorizonMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - fresnel * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  const accretionDiskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        innerRadius: { value: 2.0 },
        outerRadius: { value: 8.0 },
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
        uniform float innerRadius;
        uniform float outerRadius;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center) * 16.0;
          
          if (dist < innerRadius || dist > outerRadius) {
            discard;
          }
          
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float spiral = sin(angle * 3.0 + dist * 0.5 - time * 2.0) * 0.5 + 0.5;
          float temp = 1.0 - (dist - innerRadius) / (outerRadius - innerRadius);
          temp = pow(temp, 0.5);
          
          vec3 color;
          if (temp > 0.8) {
            color = mix(vec3(0.5, 0.8, 1.0), vec3(1.0, 1.0, 1.0), (temp - 0.8) * 5.0);
          } else if (temp > 0.5) {
            color = mix(vec3(1.0, 0.6, 0.2), vec3(0.5, 0.8, 1.0), (temp - 0.5) * 3.33);
          } else {
            color = mix(vec3(0.8, 0.1, 0.1), vec3(1.0, 0.6, 0.2), temp * 2.0);
          }
          
          float alpha = spiral * temp * 0.8;
          gl_FragColor = vec4(color * alpha, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    if (accretionDiskRef.current) {
      const material = accretionDiskRef.current
        .material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }

    if (eventHorizonRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      eventHorizonRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={blackHoleRef} position={[5, 0, -10]}>
      <mesh ref={eventHorizonRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <primitive object={eventHorizonMaterial} />
      </mesh>
      <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16, 64, 64]} />
        <primitive object={accretionDiskMaterial} />
      </mesh>
    </group>
  );
};

const WormholePortal = () => {
  const wormholeRef = useRef<THREE.Mesh>(null);

  const wormholeMaterial = useMemo(() => {
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
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          float tunnel = 1.0 / (dist * 8.0 + 0.1);
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float spiral = sin(angle * 5.0 + dist * 20.0 - time * 3.0);
          float timeDilation = sin(time * 2.0 + dist * 10.0) * 0.5 + 0.5;
          float ring = smoothstep(0.3, 0.35, dist) * smoothstep(0.5, 0.45, dist);
          
          vec3 color1 = vec3(0.2, 0.6, 1.0);
          vec3 color2 = vec3(1.0, 0.3, 0.8);
          vec3 color3 = vec3(0.3, 1.0, 0.4);
          
          vec3 color = mix(color1, color2, sin(time + dist * 5.0) * 0.5 + 0.5);
          color = mix(color, color3, spiral * 0.3);
          
          float alpha = (tunnel * 0.1 + ring) * timeDilation;
          gl_FragColor = vec4(color * alpha, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (wormholeRef.current) {
      const material = wormholeRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
      wormholeRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={wormholeRef} position={[-8, 2, -15]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <primitive object={wormholeMaterial} />
    </mesh>
  );
};

const SpacetimeGrid = () => {
  const gridRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) },
        blackHolePos: { value: new THREE.Vector3(5, 0, -10) },
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mousePos;
        uniform vec3 blackHolePos;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          
          float distanceToBlackHole = distance(worldPosition.xyz, blackHolePos);
          float gravity = 1.0 / (distanceToBlackHole * 0.1 + 1.0);
          
          vec3 mouseWorldPos = vec3(mousePos.x * 10.0, mousePos.y * 10.0, 0.0);
          float distanceToMouse = distance(worldPosition.xyz, mouseWorldPos);
          float mouseGravity = 1.0 / (distanceToMouse * 0.5 + 1.0);
          
          vec3 distortedPosition = position;
          distortedPosition.z += sin(time + position.x * 0.5) * gravity * 2.0;
          distortedPosition.z += cos(time + position.y * 0.5) * mouseGravity * 1.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        void main() {
          vec2 grid = abs(fract(vUv * 20.0) - 0.5) / fwidth(vUv * 20.0);
          float line = min(grid.x, grid.y);
          float warp = sin(time + vWorldPosition.x * 0.2) * cos(time + vWorldPosition.y * 0.2);
          
          vec3 color = vec3(0.3, 0.6, 1.0) * (1.0 - line) * (0.5 + warp * 0.5);
          float alpha = (1.0 - line) * 0.3;
          
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
      material.uniforms.mousePos.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh ref={gridRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -5, -5]}>
      <planeGeometry args={[50, 50, 100, 100]} />
      <primitive object={gridMaterial} />
    </mesh>
  );
};

const LensedObjects = () => {
  const objectsRef = useRef<THREE.Group>(null);

  const objects = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30 - 20,
        ],
        scale: Math.random() * 0.5 + 0.2,
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
        speed: Math.random() * 0.02 + 0.01,
        type: Math.floor(Math.random() * 3),
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (objectsRef.current) {
      objectsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const timeDilation =
            0.5 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.3;
          child.rotation.x += objects[i].speed * timeDilation;
          child.rotation.y += objects[i].speed * 1.5 * timeDilation;

          const material = child.material as THREE.MeshStandardMaterial;
          if (material) {
            material.emissiveIntensity =
              0.3 + Math.sin(state.clock.elapsedTime + i) * 0.2;
          }
        }
      });
    }
  });

  return (
    <group ref={objectsRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          position={obj.position as [number, number, number]}
          scale={obj.scale}
        >
          {obj.type === 0 ? (
            <tetrahedronGeometry args={[1]} />
          ) : obj.type === 1 ? (
            <octahedronGeometry args={[1]} />
          ) : (
            <icosahedronGeometry args={[1]} />
          )}
          <meshStandardMaterial
            color={obj.color}
            emissive={obj.color}
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const GravitationalLensing: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ecdc4" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#ff6b35"
        />
        <fog attach="fog" args={["#0a0a0a", 10, 50]} />

        <BlackHole />
        <WormholePortal />
        <SpacetimeGrid />
        <LensedObjects />
      </Canvas>
    </div>
  );
};

export default GravitationalLensing;
