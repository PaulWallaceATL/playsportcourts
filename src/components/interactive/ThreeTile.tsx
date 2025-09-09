"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

function TileMesh() {
  return (
    <mesh castShadow receiveShadow rotation={[0.3, -0.5, 0]}>
      <boxGeometry args={[1.6, 0.08, 1.6]} />
      <meshStandardMaterial color="#0ea5e9" metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

export function ThreeTile({ height = 260 }: { height?: number }) {
  return (
    <div style={{ height }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [3, 2, 3], fov: 38 }}>
        <color attach="background" args={[0, 0, 0]} />
        <Stage intensity={0.8} environment={"warehouse"}>
          <TileMesh />
        </Stage>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}


