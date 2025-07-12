"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Code, Globe, Activity, Target, Coffee, Rocket } from "lucide-react" // Import necessary icons

interface InteractiveSkillBarProps {
  skill: string
  level: number
  icon: React.ElementType // Use React.ElementType for component props
}

const iconMap: { [key: string]: React.ElementType } = {
  Code: Code,
  Globe: Globe,
  Activity: Activity,
  Target: Target,
  Coffee: Coffee,
  Rocket: Rocket,
  // Add other icons as needed
}

export default function InteractiveSkillBar({ skill, level, icon }: InteractiveSkillBarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level)
    }, 500)
    return () => clearTimeout(timer)
  }, [level])

  const Icon = iconMap[icon.name] || Code // Fallback to Code icon if not found

  return (
    <div
      className="space-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            className={`h-4 w-4 transition-all duration-300 ${isHovered ? "text-purple-500 scale-125" : "text-gray-500"}`}
          />
          <span className={`text-sm font-medium transition-colors duration-300 ${isHovered ? "text-purple-500" : ""}`}>
            {skill}
          </span>
        </div>
        <span
          className={`text-xs transition-all duration-300 ${isHovered ? "text-purple-500 font-bold" : "text-gray-500"}`}
        >
          {level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
            isHovered
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
              : "bg-gradient-to-r from-purple-500 to-pink-500"
          }`}
          style={{
            width: `${animatedLevel}%`,
            transform: isHovered ? "scaleY(1.2)" : "scaleY(1)",
          }}
        />
      </div>
    </div>
  )
}
