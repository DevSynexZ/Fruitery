
"use client";

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/fruits-v4.glb');

let cachedTexture: THREE.Texture | null = null;

interface ModelProps {
  scrollProgress: number;
}

function ImageFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(cachedTexture);

  useEffect(() => {
    if (cachedTexture) return;
    const loader = new THREE.TextureLoader();
    loader.load('/fruits2.png', (loadedTex) => {
      cachedTexture = loadedTex;
      setTexture(loadedTex);
    });
  }, []);

  if (!texture) return null;

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={[3.8, 3.8, 3.8]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function Model({ scrollProgress }: ModelProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF('/fruits-v4.glb');

  useEffect(() => {
    if (scene) {
      setIsLoaded(true);
    }
  }, [scene]);

  useFrame(() => {
    if (!isLoaded || !modelRef.current) return;

    // Detect if screen is mobile for responsive positioning
    const isMobile = window.innerWidth < 768;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotX = 0.2;
    let targetRotY = scrollProgress * Math.PI * 1; 
    let targetRotZ = 0;

    if (scrollProgress < 0.35) {
      const p = scrollProgress / 0.35;
      // On mobile, keep it slightly lower initially to avoid covering hero text
      targetX = 0;
      targetY = isMobile ? THREE.MathUtils.lerp(-0.8, -1.2, p) : 0;
      targetRotZ = THREE.MathUtils.lerp(0, 0, p);
    } else if (scrollProgress < 0.7) {
      const p = (scrollProgress - 0.35) / 0.35;
      // Shift right on desktop, keep centered/lower on mobile when text box appears
      targetX = isMobile ? 0 : THREE.MathUtils.lerp(0, 2.8, p);
      targetY = isMobile ? THREE.MathUtils.lerp(-1.2, 0.5, p) : THREE.MathUtils.lerp(0, -0.1, p);
      targetRotZ = THREE.MathUtils.lerp(0, -0.2, p);
    } else {
      const p = (scrollProgress - 0.7) / 0.3;
      targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.8, 0, p);
      targetY = isMobile ? THREE.MathUtils.lerp(0.5, -0.5, p) : THREE.MathUtils.lerp(-0.1, -0.6, p);
      targetRotX = THREE.MathUtils.lerp(0.2, 0.5, p);
      targetRotZ = THREE.MathUtils.lerp(-0.2, 0, p);
    }

    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetX, 0.1);
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetY, 0.1);
    modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, targetZ, 0.1);

    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.1);
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.1);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, targetRotZ, 0.1);
  });

  if (!isLoaded || !scene) {
    return <ImageFallback />;
  }

  // Responsive scale: smaller on mobile devices so it fits screens nicely
  const modelScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.85 : 1.2;

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.4}>
      <primitive ref={modelRef} object={scene} scale={[modelScale, modelScale, modelScale]} position={[0, 0, 0]} />
    </Float>
  );
}

interface MangoCanvasProps {
  scrollProgress: number;
}

export default function MangoCanvas({ scrollProgress }: MangoCanvasProps) {
  const [fov, setFov] = useState(40);

  useEffect(() => {
    function handleResize() {
      // Widen the camera field-of-view on mobile viewports so models don't appear cramped
      if (window.innerWidth < 768) {
        setFov(55);
      } else {
        setFov(40);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 9.5], fov: fov }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 10, 5]} intensity={3.2} color="#ffffff" />
        <pointLight position={[-5, -5, -2]} intensity={1.5} color="#fbbf24" />
        <Model scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}