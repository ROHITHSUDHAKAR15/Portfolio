"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Music, ImageOff } from "lucide-react"

// Placeholder video URL (replace with actual video URLs if available)
const PLACEHOLDER_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"

const reelsData = [
  {
    id: 1,
    username: "rohith_dev",
    userAvatar: "/rohith-photo.jpeg",
    videoUrl: PLACEHOLDER_VIDEO_URL,
    description:
      "My coding journey from beginner to full-stack developer. Full Q&A live now!! #coding #developer #journey #fullstack #webdev",
    likes: 30123,
    comments: 348,
    isFollowing: false,
    audioTitle: "rohith_dev • Original audio",
  },
  {
    id: 2,
    username: "tech_insights",
    userAvatar: "/placeholder.svg?height=40&width=40",
    videoUrl: PLACEHOLDER_VIDEO_URL,
    description: "Deep dive into the latest AI trends and machine learning algorithms. #AI #ML #tech #innovation",
    likes: 15678,
    comments: 120,
    isFollowing: true,
    audioTitle: "tech_insights • AI Vibes",
  },
  {
    id: 3,
    username: "robotics_lab",
    userAvatar: "/placeholder.svg?height=40&width=40",
    videoUrl: PLACEHOLDER_VIDEO_URL,
    description: "Showcasing our new autonomous robot navigating complex terrains. #robotics #automation #engineering",
    likes: 22450,
    comments: 210,
    isFollowing: false,
    audioTitle: "robotics_lab • Future Sounds",
  },
  {
    id: 4,
    username: "dev_life",
    userAvatar: "/placeholder.svg?height=40&width=40",
    videoUrl: PLACEHOLDER_VIDEO_URL,
    description:
      "A day in the life of a software engineer. From coding to coffee breaks! #dayinthelife #softwareengineer #developerlife",
    likes: 18900,
    comments: 180,
    isFollowing: true,
    audioTitle: "dev_life • Chill Coding Beats",
  },
]

export default function ReelsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set())
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())
  const [isMuted, setIsMuted] = useState(true)
  const [avatarImageErrors, setAvatarImageErrors] = useState<Set<string>>(new Set())
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDarkMode)
  }, [])

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, reelsData.length)

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.play().catch((e) => console.error("Video play failed:", e))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.75 }, // Play when 75% of the video is visible
    )

    videoRefs.current.forEach((video) => {
      if (video) {
        observerRef.current?.observe(video)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [reelsData])

  const toggleLike = (reelId: number) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
        toast.info("Removed from favorites", { duration: 1000 })
      } else {
        newSet.add(reelId)
        toast.success("Added to favorites! ❤️", { duration: 1000 })
      }
      return newSet
    })
  }

  const toggleFollow = (username: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(username)) {
        newSet.delete(username)
        toast.info(`Unfollowed ${username}`, { duration: 1000 })
      } else {
        newSet.add(username)
        toast.success(`Now following ${username}! 🎉`, { duration: 1000 })
      }
      return newSet
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this reel!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard! 🔗", { duration: 1000 })
    }
  }

  const handleAvatarImageError = (id: string) => {
    setAvatarImageErrors((prev) => new Set(prev).add(id))
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Volume Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </Button>

      {/* Back to Home Button */}
      <Link href="/" className="fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 rounded-full p-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
      </Link>

      <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
        {reelsData.map((reel, index) => (
          <div key={reel.id} className="relative w-full h-screen flex items-center justify-center bg-black snap-start">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.videoUrl}
              loop
              autoPlay={false} // Controlled by IntersectionObserver
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain" // Use object-contain to fit video without cropping
              onError={(e) => {
                console.error("Video load error:", e)
                // Optionally show a placeholder or error message
              }}
            />

            {/* Overlay UI */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="flex justify-between items-end">
                {/* Left side: User info and description */}
                <div className="flex flex-col gap-2 text-white max-w-[calc(100%-80px)]">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 ring-1 ring-white">
                      <AvatarImage
                        src={reel.userAvatar || "/placeholder.svg"}
                        alt={reel.username}
                        onError={() => handleAvatarImageError(`reel-avatar-${reel.id}`)}
                      />
                      <AvatarFallback className="bg-gray-700 text-white text-sm">
                        {avatarImageErrors.has(`reel-avatar-${reel.id}`) ? (
                          <ImageOff className="h-4 w-4" />
                        ) : (
                          reel.username.charAt(0).toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">{reel.username}</span>
                    <span className="mx-1">•</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white border border-white/50 rounded-md px-3 py-1 h-auto text-xs hover:bg-white/20"
                      onClick={() => toggleFollow(reel.username)}
                    >
                      {followedUsers.has(reel.username) ? "Following" : "Follow"}
                    </Button>
                  </div>
                  <p className="text-sm line-clamp-2">
                    {reel.description} <span className="text-white/70 cursor-pointer">... more</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Music className="h-3 w-3" />
                    <span>{reel.audioTitle}</span>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex flex-col items-center gap-6 text-white">
                  <div className="flex flex-col items-center">
                    <Heart
                      className={`h-8 w-8 cursor-pointer ${
                        likedReels.has(reel.id) ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                      onClick={() => toggleLike(reel.id)}
                    />
                    <span className="text-xs font-semibold">
                      {reel.likes >= 1000 ? `${(reel.likes / 1000).toFixed(1)}K` : reel.likes}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle className="h-8 w-8 cursor-pointer" />
                    <span className="text-xs font-semibold">{reel.comments}</span>
                  </div>
                  <Send className="h-8 w-8 cursor-pointer" onClick={handleShare} />
                  <Bookmark className="h-8 w-8 cursor-pointer" />
                  <MoreHorizontal className="h-8 w-8 cursor-pointer" />
                  {/* Small profile avatar at the bottom right */}
                  <Avatar className="w-6 h-6 ring-1 ring-white">
                    <AvatarImage
                      src={reel.userAvatar || "/placeholder.svg"}
                      alt={reel.username}
                      onError={() => handleAvatarImageError(`reel-small-avatar-${reel.id}`)}
                    />
                    <AvatarFallback className="bg-gray-700 text-white text-xs">
                      {avatarImageErrors.has(`reel-small-avatar-${reel.id}`) ? (
                        <ImageOff className="h-3 w-3" />
                      ) : (
                        reel.username.charAt(0).toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
