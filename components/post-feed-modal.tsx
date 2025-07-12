"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Github,
  ExternalLink,
  ThumbsUp,
  Loader2,
  ImageOff,
  ChevronLeft,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Post {
  id: number
  username: string
  avatar: string
  time: string
  image: string
  title: string
  description: string
  tech: string[]
  likes: number
  comments: number
  period: string
  github: string
  demo: string
}

interface Comment {
  id: number
  username: string
  avatar: string
  text: string
  time: string
  likes: number
}

interface PostFeedModalProps {
  isOpen: boolean
  onClose: () => void
  posts: Post[]
  initialPostId: number | null
  likedPosts: Set<number>
  setLikedPosts: React.Dispatch<React.SetStateAction<Set<number>>>
  savedPosts: Set<number>
  setSavedPosts: React.Dispatch<React.SetStateAction<Set<number>>>
  comments: { [key: number]: Comment[] }
  setComments: React.Dispatch<React.SetStateAction<{ [key: number]: Comment[] }>>
  avatarImageErrors: Set<string>
  setAvatarImageErrors: React.Dispatch<React.SetStateAction<Set<string>>>
  postImageErrors: Set<number>
  setPostImageErrors: React.Dispatch<React.SetStateAction<Set<number>>>
  darkMode: boolean
}

export function PostFeedModal({
  isOpen,
  onClose,
  posts,
  initialPostId,
  likedPosts,
  setLikedPosts,
  savedPosts,
  setSavedPosts,
  comments,
  setComments,
  avatarImageErrors,
  setAvatarImageErrors,
  postImageErrors,
  setPostImageErrors,
  darkMode,
}: PostFeedModalProps) {
  const [currentPostIndex, setCurrentPostIndex] = React.useState(
    initialPostId ? posts.findIndex((p) => p.id === initialPostId) : 0,
  )
  const [newComment, setNewComment] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen && initialPostId !== null) {
      const index = posts.findIndex((p) => p.id === initialPostId)
      if (index !== -1) {
        setCurrentPostIndex(index)
        // Scroll to the initial post when the modal opens
        setTimeout(() => {
          const postElement = document.getElementById(`post-${initialPostId}`)
          if (postElement && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
              top: postElement.offsetTop,
              behavior: "smooth",
            })
          }
        }, 50) // Small delay to ensure modal is rendered
      }
    }
  }, [isOpen, initialPostId, posts])

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        toast.info("Removed from favorites", { duration: 1000 })
      } else {
        newSet.add(postId)
        toast.success("Added to favorites! ❤️", { duration: 1000 })
      }
      return newSet
    })
  }

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        toast.info("Removed from saved", { duration: 1000 })
      } else {
        newSet.add(postId)
        toast.success("Saved for later! 📌", { duration: 1000 })
      }
      return newSet
    })
  }

  const addComment = (postId: number) => {
    if (!newComment.trim()) return

    setIsTyping(true)
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        username: "rohith_dev", // Assuming current user
        avatar: "👨‍💻",
        text: newComment,
        time: "now",
        likes: 0,
      }

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment],
      }))

      setNewComment("")
      setIsTyping(false)
      toast.success("Comment added! 💬", { duration: 1000 })
    }, 1000)
  }

  const handleShare = (postId: number) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this project by Rohith`,
        url: window.location.href, // In a real app, this would be the specific post URL
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard! 🔗", { duration: 1000 })
    }
  }

  const handlePostImageError = (postId: number) => {
    setPostImageErrors((prev) => new Set(prev).add(postId))
  }

  const handleAvatarImageError = (id: string) => {
    setAvatarImageErrors((prev) => new Set(prev).add(id))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          "flex flex-col p-0", // Override default grid and padding, make it a flex column
          darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300",
          "max-w-2xl h-[90vh]", // Set a max-width and max-height for the modal to be centered
        )}
        style={{ borderRadius: 0 }}
      >
        {/* Header for the modal */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className={`h-6 w-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
          </Button>
          <h2 className="text-lg font-semibold">Posts</h2>
          <MoreHorizontal className={`h-6 w-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
        </div>

        {/* Scrollable Post Feed */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto snap-y snap-mandatory">
          {posts.map((post) => (
            <div key={post.id} id={`post-${post.id}`} className={`h-full flex flex-col justify-center snap-start p-4`}>
              <div
                className={`rounded-lg shadow-md overflow-hidden ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                }`}
              >
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src="/rohith-photo.jpeg"
                        alt="Rohith S"
                        onError={() => handleAvatarImageError(`post-avatar-${post.id}`)}
                      />
                      <AvatarFallback
                        className={`text-sm ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
                      >
                        {avatarImageErrors.has(`post-avatar-${post.id}`) ? <ImageOff className="h-4 w-4" /> : "RS"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {post.username}
                      </p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{post.time}</p>
                    </div>
                  </div>
                  <MoreHorizontal
                    className={`h-5 w-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-all duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
                  />
                </div>

                {/* Post Image */}
                <div className="relative group">
                  {postImageErrors.has(post.id) ? (
                    <div className="w-full h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 flex-col p-8">
                      <ImageOff className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Image failed to load</span>
                    </div>
                  ) : (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => handlePostImageError(post.id)}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded animate-pulse">
                      {post.period}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <Heart
                        className={`h-6 w-6 cursor-pointer hover:scale-125 transition-all duration-200 ${
                          likedPosts.has(post.id)
                            ? "fill-red-500 text-red-500 animate-pulse"
                            : darkMode
                              ? "text-white"
                              : "text-gray-900"
                        }`}
                        onClick={() => toggleLike(post.id)}
                      />
                      <MessageCircle
                        className={`h-6 w-6 cursor-pointer hover:scale-125 transition-all duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
                        // onClick={() => handleCommentClick(post)} // Re-enable if comment modal is needed here
                      />
                      <Send
                        className={`h-6 w-6 cursor-pointer hover:scale-125 transition-all duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
                        onClick={() => handleShare(post.id)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                        onClick={() => window.open(post.github, "_blank")}
                      >
                        <Github className={`h-4 w-4 ${darkMode ? "text-white" : "text-gray-900"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                        onClick={() => window.open(post.demo, "_blank")}
                      >
                        <ExternalLink className={`h-4 w-4 ${darkMode ? "text-white" : "text-gray-900"}`} />
                      </Button>
                      <Bookmark
                        className={`h-6 w-6 cursor-pointer hover:scale-125 transition-all duration-200 ${
                          savedPosts.has(post.id)
                            ? "fill-black dark:fill-white"
                            : darkMode
                              ? "text-white"
                              : "text-gray-900"
                        }`}
                        onClick={() => toggleSave(post.id)}
                      />
                    </div>
                  </div>

                  <p
                    className={`font-semibold text-sm mb-2 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {likedPosts.has(post.id) ? post.likes + 1 : post.likes} stars
                  </p>

                  <div className="mb-3">
                    <span className={`font-semibold text-sm mr-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {post.username}
                    </span>
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <strong>{post.title}</strong> - {post.description}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-blue-600 dark:text-blue-400 text-sm cursor-pointer hover:underline hover:scale-105 transition-all duration-200"
                      >
                        #{tech.toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <p
                    className={`text-sm cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    // onClick={() => handleCommentClick(post)} // Re-enable if comment modal is needed here
                  >
                    View all {comments[post.id]?.length || post.comments} comments
                  </p>

                  {/* Comment Input */}
                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addComment(post.id)}
                      className={darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}
                    />
                    <Button onClick={() => addComment(post.id)} disabled={isTyping}>
                      {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
