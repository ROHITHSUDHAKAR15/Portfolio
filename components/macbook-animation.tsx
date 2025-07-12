"use client"

import { useRef, useEffect, useState } from "react"
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader" // Import GLTFLoader

interface MacBookAnimationProps {
  imageUrl: string
  onAnimationComplete: () => void
}

export default function MacBookAnimation({ imageUrl, onAnimationComplete }: MacBookAnimationProps) {
  const group = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Group | null>(null) // State to hold the loaded model
  const texture = useTexture(imageUrl)

  // Animation state
  const animationProgress = useRef(0)
  const animationDuration = 2.5 // seconds for the opening animation

  // Load the GLB model manually using GLTFLoader
  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      "/assets/3d/macbook.glb",
      (gltf) => {
        setModel(gltf.scene)
      },
      undefined, // Optional: progress callback
      (error) => {
        console.error("An error occurred loading the GLB model:", error)
      },
    )
  }, []) // Run once on mount to load the model

  useEffect(() => {
    if (model && texture) {
      // Apply the texture to the screen material once the model and texture are loaded
      const screenMaterial = model.getObjectByName("screen_material") as THREE.MeshStandardMaterial
      if (screenMaterial) {
        screenMaterial.map = texture
        screenMaterial.needsUpdate = true
      }
    }
  }, [model, texture]) // Re-run when model or texture changes

  useFrame((state, delta) => {
    if (!group.current || !model) return // Ensure model is loaded before animating

    // Animate the MacBook opening
    if (animationProgress.current < animationDuration) {
      animationProgress.current += delta
      const t = Math.min(animationProgress.current / animationDuration, 1)
      const easedT = 1 - Math.pow(1 - t, 3) // Ease-out cubic for smoother animation

      // Rotate the screen (adjust based on your model's pivot point)
      const screen = model.getObjectByName("screen") // Replace 'screen' with the actual name of your screen mesh in the GLB
      if (screen) {
        screen.rotation.x = -Math.PI / 2 + easedT * (Math.PI / 2 - 0.1) // Opens from flat to slightly open
      }

      // Optional: Animate the whole group's position or rotation
      group.current.position.y = -0.5 + easedT * 0.5 // Lift up slightly
      group.current.rotation.y = easedT * Math.PI * 2 // Spin around

      if (animationProgress.current >= animationDuration) {
        onAnimationComplete()
      }
    }
  })

  // Only render the model once it's loaded
  if (!model) {
    return null
  }

  return (
    <group ref={group} dispose={null} position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
      <primitive object={model} scale={1} />
    </group>
  )
}
