// src/TreeModel.js
import React from "react";

export default function TreeModel() {
    return (
      <group scale={[0.5, 0.5, 0.5]}>
        {/* Tree Trunk */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
          <meshStandardMaterial color="saddlebrown" />
        </mesh>
  
        {/* Tree Foliage */}
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.5, 1.5, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
  
        <mesh position={[0, 0.75, 0]}>
          <coneGeometry args={[0.4, 1.2, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
  
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.3, 0.9, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
    );
  }