"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Trophy, RefreshCw, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";

// Mock Data for the Basket Challenge Items
interface FruitItem {
  id: number;
  name: string;
  type: "mango" | "apple" | "avocado";
  isRipe: boolean;
  hint: string;
  color: string;
}

const INITIAL_FRUITS: FruitItem[] = [
  { id: 1, name: "Royal Alphonso Mango", type: "mango", isRipe: true, hint: "Golden base with firm stem cap & sweet aroma.", color: "#F59E0B" },
  { id: 2, name: "Unripe Green Mango", type: "mango", isRipe: false, hint: "Too green and chalky hard at the base.", color: "#10B981" },
  { id: 3, name: "Hass Avocado", type: "avocado", isRipe: true, hint: "Dark pebbled skin with vibrant green stem cavity.", color: "#3F6212" },
  { id: 4, name: "Overripe Avocado", type: "avocado", isRipe: false, hint: "Mushy texture with brown bruised patches underneath.", color: "#27272A" },
  { id: 5, name: "Crisp Red Apple", type: "apple", isRipe: true, hint: "Deep crimson blush with crisp tight skin.", color: "#EF4444" },
];

function SingleFruitModel({ color, isRipe }: { color: string; isRipe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={isRipe ? 0.3 : 0.6} 
          metalness={0.1} 
        />
      </mesh>
    </Float>
  );
}

export default function FruitBasketGame() {
  const [selectedFruit, setSelectedFruit] = useState<FruitItem | null>(null);
  const [basket, setBasket] = useState<{ [id: number]: boolean } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handlePickDecision = (fruitId: number, keep: boolean) => {
    setBasket((prev) => ({ ...prev, [fruitId]: keep }));
    setSelectedFruit(null);
  };

  const calculateScore = () => {
    let correctPicks = 0;
    let totalAssessed = Object.keys(basket || {}).length;

    if (totalAssessed === 0) {
      alert("Please inspect and pack at least one fruit into your basket!");
      return;
    }

    INITIAL_FRUITS.forEach((fruit) => {
      const userPicked = basket?.[fruit.id];
      // If user decided to keep a ripe fruit, or discard an unripe fruit -> correct!
      if ((userPicked === true && fruit.isRipe) || (userPicked === false && !fruit.isRipe) || (userPicked === undefined && !fruit.isRipe)) {
        correctPicks++;
      }
    });

    const finalPercentage = Math.round((correctPicks / INITIAL_FRUITS.length) * 100);
    setScore(finalPercentage);
    setIsSubmitted(true);
  };

  const resetGame = () => {
    setBasket({});
    setIsSubmitted(false);
    setScore(null);
    setSelectedFruit(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-[3rem] border border-zinc-200 shadow-2xl my-16 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-amber-600 tracking-wider">Interactive 3D Training Module</span>
          <h2 className="text-3xl font-black text-zinc-900 mt-1">Produce Inspection Sandbox</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-4 py-2 rounded-full">
            Packed: {Object.keys(basket || {}).filter((id) => basket?.[Number(id)]).length} / {INITIAL_FRUITS.length} items
          </span>
          {isSubmitted && (
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-amber-500 hover:text-zinc-950 transition-all cursor-pointer"
            >
              <RefreshCw size={13} /> Try Again
            </button>
          )}
        </div>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Basket Inventory Grid */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm font-bold text-zinc-700">Click any specimen in the basket to inspect in 3D:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_FRUITS.map((fruit) => {
                const isPicked = basket?.[fruit.id];
                return (
                  <div
                    key={fruit.id}
                    onClick={() => setSelectedFruit(fruit)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedFruit?.id === fruit.id
                        ? "border-amber-500 bg-amber-50/50 shadow-md"
                        : "border-zinc-200 bg-zinc-50/50 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner" style={{ backgroundColor: fruit.color }}>
                        {fruit.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900">{fruit.name}</h4>
                        <p className="text-[11px] text-zinc-500">
                          {isPicked === true ? "✅ Packed in cart" : isPicked === false ? "❌ Discarded" : "🔍 Uninspected"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={calculateScore}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-2xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Submit Inspection Results 🎯
              </button>
            </div>
          </div>

          {/* Right: 3D Inspection Viewer */}
          <div className="lg:col-span-6 bg-zinc-950 rounded-[2.5xl] p-6 text-white relative min-h-[420px] flex flex-col items-center justify-center">
            {selectedFruit ? (
              <>
                <div className="absolute top-4 left-6 z-10">
                  <p className="text-xs font-mono text-amber-400">Inspecting Specimen #{selectedFruit.id}</p>
                  <h3 className="text-lg font-bold">{selectedFruit.name}</h3>
                </div>

                <div className="w-full h-[280px]">
                  <Canvas camera={{ position: [0, 0, 4] }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <SingleFruitModel color={selectedFruit.color} isRipe={selectedFruit.isRipe} />
                    <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={6} />
                    <OrbitControls enableZoom={false} autoRotate />
                  </Canvas>
                </div>

                <p className="text-xs text-zinc-400 text-center px-4 mb-4">
                  💡 <span className="text-white font-semibold">Teacher Tip:</span> {selectedFruit.hint}
                </p>

                <div className="flex gap-3 w-full px-4">
                  <button
                    onClick={() => handlePickDecision(selectedFruit.id, true)}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Pack in Basket 🧺
                  </button>
                  <button
                    onClick={() => handlePickDecision(selectedFruit.id, false)}
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Discard 🗑️
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-3 px-6">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-lg font-bold">Select a fruit from the basket</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Rotate 360° in 3D space, analyze skin pores and stems, and decide whether to pack or discard.
                </p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy size={36} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-zinc-900">Inspection Success Rate</h3>
            <p className="text-6xl font-black text-amber-500 mt-3">{score}%</p>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {score! >= 80 ? "🎉 Outstanding grading accuracy! You are ready to pick peak orchard harvests like a professional." : "⚠️ Room for improvement. Review our ripeness guides and test your 3D inspection skills again!"}
          </p>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            Play Again 🎮
          </button>
        </motion.div>
      )}

    </div>
  );
}