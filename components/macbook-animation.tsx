"use client"

import { useRef, useEffect } from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface MacBookAnimationProps {
  imageUrl: string
  onAnimationComplete: () => void
}

export default function MacBookAnimation({ imageUrl, onAnimationComplete }: MacBookAnimationProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/assets/3d/macbook.glb") // Assuming you have a macbook.glb model
  const texture = useTexture(imageUrl)

  // Animation state
  const animationProgress = useRef(0)
  const animationDuration = 2.5 // seconds for the opening animation

  useEffect(() => {
    if (texture) {
      // Apply the texture to the screen material
      const screenMaterial = scene.getObjectByName("screen_material") as THREE.MeshStandardMaterial
      if (screenMaterial) {
        screenMaterial.map = texture
        screenMaterial.needsUpdate = true
      }
    }
  }, [texture, scene])

  useFrame((state, delta) => {
    if (!group.current) return

    // Animate the MacBook opening
    if (animationProgress.current < animationDuration) {
      animationProgress.current += delta
      const t = Math.min(animationProgress.current / animationDuration, 1)
      const easedT = 1 - Math.pow(1 - t, 3) // Ease-out cubic for smoother animation

      // Rotate the screen (adjust based on your model's pivot point)
      const screen = group.current.getObjectByName("screen") // Replace 'screen' with the actual name of your screen mesh in the GLB
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

  return (
    <group ref={group} dispose={null} position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}
