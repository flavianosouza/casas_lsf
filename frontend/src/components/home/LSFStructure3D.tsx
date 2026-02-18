"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   House Dimensions (units ≈ meters)
   ═══════════════════════════════════════════════════ */
const W = 9;
const D = 6;
const H = 2.8;
const T = 0.06;
const SP = 0.4;
const RH = 1.2;
const HW = W / 2;
const HD = D / 2;

const STEEL = "#C0C8D0";

interface Prof {
  p: [number, number, number];
  s: [number, number, number];
  r?: [number, number, number];
  c: string;
  o: number;
}

/* ═══════════════════════════════════════════════════ */
function buildHouse(): Prof[] {
  const profs: Prof[] = [];
  let seq = 0;

  function add(
    pos: [number, number, number],
    size: [number, number, number],
    color: string,
    rot?: [number, number, number],
  ) {
    profs.push({ p: pos, s: size, c: color, o: seq++, r: rot });
  }

  const doorL = -3.3, doorR = -2.1, doorH = 2.1;
  const w1L = -0.5, w1R = 0.7;
  const w2L = 1.9, w2R = 3.1;
  const wSill = 0.9, wHead = 2.1;
  const bwL = -0.5, bwR = 0.7;

  function frontZone(x: number): "door" | "window" | null {
    if (x > doorL + 0.05 && x < doorR - 0.05) return "door";
    if (x > w1L + 0.05 && x < w1R - 0.05) return "window";
    if (x > w2L + 0.05 && x < w2R - 0.05) return "window";
    return null;
  }

  function backZone(x: number): boolean {
    return x > bwL + 0.05 && x < bwR - 0.05;
  }

  /* Foundation */
  add([0, T / 2, HD], [W, T, T], STEEL);
  add([0, T / 2, -HD], [W, T, T], STEEL);
  add([-HW, T / 2, 0], [T, T, D], STEEL);
  add([HW, T / 2, 0], [T, T, D], STEEL);

  /* Front wall */
  const nW = Math.floor(W / SP);
  for (let i = 0; i <= nW; i++) {
    const x = -HW + Math.min(i * SP, W);
    const zone = frontZone(x);
    if (!zone) {
      add([x, T + H / 2, HD], [T, H, T], STEEL);
    } else if (zone === "door") {
      const cH = H - doorH;
      if (cH > T * 3) add([x, T + doorH + cH / 2, HD], [T, cH, T], STEEL);
    } else {
      if (wSill > T * 3) add([x, T + wSill / 2, HD], [T, wSill, T], STEEL);
      const abH = H - wHead;
      if (abH > T * 3) add([x, T + wHead + abH / 2, HD], [T, abH, T], STEEL);
    }
  }

  add([(doorL + doorR) / 2, T + doorH, HD], [doorR - doorL, T, T], STEEL);
  add([(w1L + w1R) / 2, T + wHead, HD], [w1R - w1L, T, T], STEEL);
  add([(w1L + w1R) / 2, T + wSill, HD], [w1R - w1L, T, T], STEEL);
  add([(w2L + w2R) / 2, T + wHead, HD], [w2R - w2L, T, T], STEEL);
  add([(w2L + w2R) / 2, T + wSill, HD], [w2R - w2L, T, T], STEEL);

  /* Back wall */
  for (let i = 0; i <= nW; i++) {
    const x = -HW + Math.min(i * SP, W);
    if (backZone(x)) {
      add([x, T + wSill / 2, -HD], [T, wSill, T], STEEL);
      const abH = H - wHead;
      if (abH > T * 3) add([x, T + wHead + abH / 2, -HD], [T, abH, T], STEEL);
    } else {
      add([x, T + H / 2, -HD], [T, H, T], STEEL);
    }
  }
  add([(bwL + bwR) / 2, T + wHead, -HD], [bwR - bwL, T, T], STEEL);
  add([(bwL + bwR) / 2, T + wSill, -HD], [bwR - bwL, T, T], STEEL);

  /* Side walls */
  const nD = Math.floor(D / SP);
  for (let i = 1; i < nD; i++) {
    add([-HW, T + H / 2, -HD + i * SP], [T, H, T], STEEL);
  }
  for (let i = 1; i < nD; i++) {
    add([HW, T + H / 2, -HD + i * SP], [T, H, T], STEEL);
  }

  /* Top runners */
  add([0, T + H, HD], [W, T, T], STEEL);
  add([0, T + H, -HD], [W, T, T], STEEL);
  add([-HW, T + H, 0], [T, T, D], STEEL);
  add([HW, T + H, 0], [T, T, D], STEEL);

  /* Interior partition */
  const partX = 1.0;
  add([partX, T / 2, 0], [T, T, D], STEEL);
  add([partX, T + H, 0], [T, T, D], STEEL);
  for (let i = 0; i <= nD; i++) {
    const z = -HD + Math.min(i * SP, D);
    add([partX, T + H / 2, z], [T, H, T], STEEL);
  }

  /* Floor joists */
  for (let i = 1; i < nW; i++) {
    add([-HW + i * SP, T / 2, 0], [T, T, D], STEEL);
  }

  /* Roof ridge */
  add([0, T + H + RH, 0], [T, T, D + 0.4], STEEL);

  /* Roof rafters */
  const roofAngle = Math.atan2(RH, HW);
  const roofLen = Math.sqrt(RH * RH + HW * HW);
  const nRafters = 8;
  for (let i = 0; i <= nRafters; i++) {
    const z = -HD + (i * D) / nRafters;
    add([-HW / 2, T + H + RH / 2, z], [roofLen, T, T], STEEL, [0, 0, roofAngle]);
    add([HW / 2, T + H + RH / 2, z], [roofLen, T, T], STEEL, [0, 0, Math.PI - roofAngle]);
  }

  const maxSeq = seq - 1;
  profs.forEach((p) => (p.o = p.o / maxSeq));
  return profs;
}

/* ═══════════════════════════════════════════════════
   Animated Steel Profile — scroll OR time driven
   ═══════════════════════════════════════════════════ */
function SteelProfile({
  data,
  scrollProgress,
}: {
  data: Prof;
  scrollProgress?: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t0 = useRef(-1);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    const mat = matRef.current;
    if (!group || !mat) return;

    let visibility: number;

    if (scrollProgress) {
      // Scroll-driven: compress so build completes at 90% scroll
      const adjusted = data.o * 0.84;
      const raw = (scrollProgress.current - adjusted) / 0.06;
      visibility = Math.min(Math.max(raw, 0), 1);
    } else {
      // Time-based: auto-build over 3.5s
      if (t0.current < 0) t0.current = clock.elapsedTime;
      const elapsed = clock.elapsedTime - t0.current;
      const raw = (elapsed - data.o * 3.5) / 0.4;
      visibility = Math.min(Math.max(raw, 0), 1);
    }

    const ease = 1 - Math.pow(1 - visibility, 4);
    group.scale.setScalar(Math.max(ease, 0.001));
    mat.opacity = ease;
  });

  return (
    <group ref={groupRef} position={data.p} rotation={data.r || [0, 0, 0]} scale={0.001}>
      <mesh>
        <boxGeometry args={data.s} />
        <meshStandardMaterial
          ref={matRef}
          color={data.c}
          emissive={data.c}
          emissiveIntensity={0.04}
          metalness={0.85}
          roughness={0.18}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════ */
function Ground() {
  return (
    <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#0a0a0a" />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.2 + i * 0.7) * 0.0006;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#8899aa" size={0.03} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════ */
function Scene({ scrollProgress }: { scrollProgress?: { current: number } }) {
  const profiles = useMemo(() => buildHouse(), []);

  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 14, 28]} />
      <ambientLight intensity={0.4} color="#d0d8e0" />
      <directionalLight position={[6, 10, 5]} intensity={1.2} />
      <directionalLight position={[-4, 6, -3]} intensity={0.4} color="#a0b0c0" />
      <pointLight position={[0, 2.5, 0]} intensity={0.5} color="#c0d0e0" distance={10} />

      {profiles.map((data, i) => (
        <SteelProfile key={i} data={data} scrollProgress={scrollProgress} />
      ))}

      <Ground />
      <Particles />

      <OrbitControls
        target={[0, 1.6, 0]}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        enableZoom
        minDistance={6}
        maxDistance={18}
        enablePan={false}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
interface LSFProps {
  scrollProgress?: { current: number };
}

export default function LSFStructure3D({ scrollProgress }: LSFProps) {
  return (
    <div className="w-full relative" style={{ height: "420px" }}>
      <Canvas
        camera={{ position: [10, 5.5, 8], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      {!scrollProgress && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">
            Arraste para explorar
          </span>
        </div>
      )}
    </div>
  );
}
