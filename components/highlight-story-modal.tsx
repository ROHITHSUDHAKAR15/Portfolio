"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { X, MoreHorizontal, ChevronLeft, ChevronRight, ImageOff, Heart, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HighlightFrame {
  text: string
  background: string
  image: string | null
}

interface Highlight {
  id: number
  label: string
  color: string
  avatar: string
  description: string
  frames: HighlightFrame[]
}

interface HighlightStoryModalProps {
  isOpen: boolean
  onClose: () => void
  highlights: Highlight[]
  initialHighlightId: number | null
  avatarImageErrors: Set<string>
  setAvatarImageErrors: React.Dispatch<React.SetStateAction<Set<string>>>
  darkMode: boolean
}

export function HighlightStoryModal({
  isOpen,
  onClose,
  highlights,
  initialHighlightId,
  avatarImageErrors,
  setAvatarImageErrors,
  darkMode,
}: HighlightStoryModalProps) {
  const [currentHighlight, setCurrentHighlight] = React.useState<Highlight | null>(null)
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0)

  React.useEffect(() => {
    if (isOpen && initialHighlightId !== null) {
      const highlight = highlights.find((h) => h.id === initialHighlightId)
      if (highlight) {
        setCurrentHighlight(highlight)
        setCurrentFrameIndex(0)
      }
    }
  }, [isOpen, initialHighlightId, highlights])

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (isOpen && currentHighlight) {
      timer = setTimeout(() => {
        nextFrame()
      }, 5000) // Auto-advance every 5 seconds
    }
    return () => clearTimeout(timer)
  }, [isOpen, currentHighlight, currentFrameIndex])

  const nextFrame = () => {
    if (!currentHighlight) return

    if (currentFrameIndex < currentHighlight.frames.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1)
    } else {
      // Move to the next highlight
      const currentHighlightIndex = highlights.findIndex((h) => h.id === currentHighlight.id)
      if (currentHighlightIndex < highlights.length - 1) {
        setCurrentHighlight(highlights[currentHighlightIndex + 1])
        setCurrentFrameIndex(0)
      } else {
        // Last highlight, close modal
        onClose()
      }
    }
  }

  const prevFrame = () => {
    if (!currentHighlight) return

    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1)
    } else {
      // Move to the previous highlight
      const currentHighlightIndex = highlights.findIndex((h) => h.id === currentHighlight.id)
      if (currentHighlightIndex > 0) {
        setCurrentHighlight(highlights[currentHighlightIndex - 1])
        setCurrentFrameIndex(highlights[currentHighlightIndex - 1].frames.length - 1) // Go to last frame of previous highlight
      } else {
        // First highlight, close modal
        onClose()
      }
    }
  }

  const handleAvatarImageError = (id: string) => {
    setAvatarImageErrors((prev) => new Set(prev).add(id))
  }

  if (!currentHighlight) return null

  const currentFrame = currentHighlight.frames[currentFrameIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-md p-0 overflow-hidden ${darkMode ? "bg-gray-900 border-gray-700" : "bg-black"}`}
        style={{ borderRadius: "10px" }}
      >
        <div
          className="relative h-[600px] flex flex-col text-white"
          style={{
            background: currentFrame.background,
          }}
        >
          {currentFrame.image ? (
            <img
              src={currentFrame.image || "/placeholder.svg"}
              alt="Highlight content"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=600&width=400"
                e.currentTarget.alt = "Image failed to load"
                e.currentTarget.className = "absolute inset-0 w-full h-full object-contain p-16 bg-gray-800"
              }}
            />
          ) : null}
          {currentFrame.image && currentFrame.image.includes("/placeholder.svg") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-800 z-0">
              <ImageOff className="h-16 w-16 mb-4" />
              <span className="text-lg">Image failed to load</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
            {currentHighlight.frames.map((_: any, index: number) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${index <= currentFrameIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>

          {/* Story Header */}
          <div className="flex items-center justify-between p-4 z-10">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 ring-2 ring-white">
                <AvatarImage
                  src="/rohith-photo.jpeg"
                  alt="Rohith S"
                  onError={() => handleAvatarImageError(`highlight-avatar-${currentHighlight.id}`)}
                />
                <AvatarFallback className="bg-gray-700 text-white text-sm">
                  {avatarImageErrors.has(`highlight-avatar-${currentHighlight.id}`) ? (
                    <ImageOff className="h-4 w-4" />
                  ) : (
                    currentHighlight.avatar
                  )}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">rohith_dev</span> {/* Assuming fixed username for highlights */}
              <span className="text-xs text-white/70">now</span> {/* Assuming 'now' for simplicity */}
            </div>
            <div className="flex items-center space-x-2">
              <MoreHorizontal className="h-5 w-5 cursor-pointer text-white/70 hover:text-white" />
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Story Content */}
          <div
            key={currentFrameIndex} // Add key to force re-render and trigger transition
            className="flex-1 flex items-center justify-center p-6 text-center z-10 animate-fade-in"
          >
            <p className="text-xl font-medium leading-relaxed drop-shadow-lg">{currentFrame.text}</p>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={prevFrame}
            disabled={currentFrameIndex === 0 && highlights.findIndex((h) => h.id === currentHighlight.id) === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={nextFrame}
            disabled={
              currentFrameIndex === currentHighlight.frames.length - 1 &&
              highlights.findIndex((h) => h.id === currentHighlight.id) === highlights.length - 1
            }
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Reply Section (simplified for highlights) */}
          <div className="p-4 flex items-center space-x-2 z-10">
            <Input
              placeholder={`Reply to ${currentHighlight.label}...`}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 rounded-full h-10 px-4 focus-visible:ring-white"
            />
            <Heart className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
            <Send className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
