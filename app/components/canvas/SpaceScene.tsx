import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  MeshDistortMaterial, 
  Sphere, 
  CameraShake, 
  PerspectiveCamera,
  Torus,
  Environment,
  Trail 
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function StarTunnel() {
  const count = 4000; 
  const points = useRef<any>();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; 
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;
      const speed = 200 * delta; 

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += speed;
        if (positions[i3 + 2] > 50) {
          positions[i3 + 2] = -350; 
          positions[i3] = (Math.random() - 0.5) * 300;
          positions[i3 + 1] = (Math.random() - 0.5) * 300;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.rotation.z += delta * 0.1; 
    }
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={particlesPosition}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={2.0}
        color="white" 
        transparent={false}
        opacity={1} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </points>
  );
}

function BlackHole() {
  const diskRef = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (diskRef.current) {
      diskRef.current.rotation.z = t * 0.8;
      diskRef.current.rotation.x = 1.2 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -30]} scale={4}>
      <Sphere args={[1.5, 64, 64]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>
      <Torus ref={diskRef} args={[3.5, 0.6, 64, 100]} rotation={[1.2, 0, 0]}>
        <MeshDistortMaterial 
          color="#f97316" 
          emissive="#ff4500" 
          emissiveIntensity={2} 
          roughness={0} 
          metalness={1} 
          distort={0.3} 
          speed={5} 
        />
      </Torus>
      <Sphere args={[4.5, 32, 32]} position={[0, 0, 0]}>
         <meshBasicMaterial 
            color="#ea580c" 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
         />
      </Sphere>
    </group>
  );
}

function PlayerShip() {
  const groupRef = useRef<any>();
  const flameRef = useRef<any>();
  const { viewport, mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouse.x * 0.5, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.1);
    }
    if (flameRef.current) {
       flameRef.current.scale.y = 1 + Math.sin(t * 30) * 0.3 + (Math.abs(mouse.x) + Math.abs(mouse.y)) * 0.5;
       flameRef.current.material.opacity = 0.8 + Math.sin(t * 50) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}> 
      <group rotation={[0, Math.PI, 0]} scale={0.6}>
        <Trail width={1.8} length={8} color="#3b82f6" attenuation={(t: number) => t * t}>
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.3, 0.6, 2, 6]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
            </mesh>
        </Trail>
        <mesh position={[0, 1.8, 0]}>
             <coneGeometry args={[0.3, 1.2, 6]} />
             <meshStandardMaterial color="#ef4444" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[2, 0.1, 0.8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.8, 0.25]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.3, 0.5, 0.1]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
        </mesh>
        <group position={[0, -1, 0]} ref={flameRef}>
            <mesh rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.35, 2.5, 16]} />
                <MeshDistortMaterial 
                    color="#60a5fa" 
                    emissive="#3b82f6" 
                    emissiveIntensity={5} 
                    transparent 
                    opacity={0.8} 
                    distort={0.2} 
                    speed={10} 
                />
            </mesh>
        </group>
      </group>
    </group>
  );
}

function GameHUD() {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10 text-cyan-400 font-mono tracking-widest select-none">
            <div className="flex justify-between items-start opacity-80">
                <div className="border-l-2 border-cyan-500 pl-4">
                    <h1 className="text-2xl font-bold">BLACKHOLE_ODYSSEY</h1>
                    <p className="text-xs text-cyan-200 animate-pulse">SYSTEM: ONLINE</p>
                </div>
                <div className="text-right border-r-2 border-red-500 pr-4">
                    <p className="text-red-500 font-bold animate-pulse">GRAVITY: CRITICAL</p>
                    <p className="text-xs">WARP SPEED: ACTIVE</p>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-cyan-500/30 rounded-full flex items-center justify-center">
                 <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="flex justify-between items-end opacity-80">
                <div>
                     <div className="flex gap-2 mb-2">
                        <div className="w-8 h-2 bg-cyan-500"></div>
                        <div className="w-8 h-2 bg-cyan-500"></div>
                        <div className="w-8 h-2 bg-cyan-500/30"></div>
                     </div>
                     <p className="text-xs">THRUSTER</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-bold italic">MACH 12.5</p>
                    <p className="text-xs">VELOCITY</p>
                </div>
            </div>
        </div>
    )
}

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden z-0">
      <GameHUD />

      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, toneMapping: THREE.ReinhardToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={5} color="#f97316" distance={30} />

        <Environment preset="city" />
        
        <StarTunnel />
        <BlackHole />
        <PlayerShip />

        <CameraShake 
            maxYaw={0.02} maxPitch={0.02} maxRoll={0.02} 
            yawFrequency={0.5} pitchFrequency={0.5} rollFrequency={0.5} 
            intensity={1} 
        />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
          <ChromaticAberration offset={new THREE.Vector2(0.005, 0.005)} radialModulation={false} modulationOffset={new THREE.Vector2(0, 0)} />
          <Noise opacity={0.15} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      
      </Canvas>
    </div>
  );
}
