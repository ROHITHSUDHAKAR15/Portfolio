"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  ChevronLeft,
  MoreHorizontal,
  Grid,
  Film,
  Tag,
  ImageOff,
  UserPlus,
  MessageSquare,
  Heart,
  Send,
  Loader2,
} from "lucide-react"
import { PostFeedModal } from "@/components/post-feed-modal"
import { HighlightStoryModal } from "@/components/highlight-story-modal"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [avatarImageErrors, setAvatarImageErrors] = useState<Set<string>>(new Set())
  const [postImageErrors, setPostImageErrors] = useState<Set<number>>(new Set())
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set()) // For profile page follow button
  const [showCommentModal, setShowCommentModal] = useState(false) // For individual post comments
  const [currentPostForComment, setCurrentPostForComment] = useState<any>(null)
  const [comments, setComments] = useState<{ [key: number]: any[] }>({})
  const [newComment, setNewComment] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFollowingProfile, setIsFollowingProfile] = useState(false)
  const [isFollowAnimating, setIsFollowAnimating] = useState(false) // State to trigger animation

  const [showPostFeedModal, setShowPostFeedModal] = useState(false)
  const [initialPostIdInModal, setInitialPostIdInModal] = useState<number | null>(null)

  const [showHighlightStoryModal, setShowHighlightStoryModal] = useState(false)
  const [initialHighlightIdInModal, setInitialHighlightIdInModal] = useState<number | null>(null)

  // Dummy data for the profile page, reusing existing post structure
  const posts = [
    {
      id: 1,
      username: "rohith_dev",
      avatar: "👨‍💻",
      time: "2 days ago",
      image: "/ecommerce-project.png",
      title: "E-Commerce System Using OOAD",
      description:
        "Designed a modular online shopping platform using the MERN stack, applying OOAD principles for scalable system architecture. Implemented core features like user authentication, cart management, and order tracking following the MVC pattern.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      likes: 127,
      comments: 23,
      period: "Jan 2025 - Mar 2025",
      github: "https://github.com/ROHITHSUDHAKAR15/ecommerce",
      demo: "https://ecommerce-demo.vercel.app",
    },
    {
      id: 2,
      username: "rohith_dev",
      avatar: "👨‍💻",
      time: "5 days ago",
      image: "/messaging-project.png",
      title: "Encrypted Messaging System",
      description:
        "Developed a secure messaging application using Python and Flask, integrating SSL/TLS protocols to encrypt data in transit and prevent interception or tampering during message exchange.",
      tech: ["Python", "Flask", "SSL/TLS", "Cryptography"],
      likes: 89,
      comments: 15,
      period: "Mar 2024 - May 2024",
      github: "https://github.com/ROHITHSUDHAKAR15/secure-chat",
      demo: "https://secure-chat-demo.vercel.app",
    },
    {
      id: 3,
      username: "rohith_dev",
      avatar: "👨‍💻",
      time: "1 week ago",
      image: "/robot-project.png",
      title: "Autonomous Path Planning Robot",
      description:
        "Developed an autonomous robot for real-time obstacle avoidance and path planning using ROS 2, LiDAR/Ultrasonic sensors, and A*/Dijkstra algorithms. Implemented modular ROS 2 nodes for sensing, navigation, and feedback control.",
      tech: ["ROS 2", "Python", "LiDAR", "Gazebo", "A*"],
      likes: 156,
      comments: 31,
      period: "Mar 2025 - Apr 2025",
      github: "https://github.com/ROHITHSUDHAKAR15/autonomous-robot",
      demo: "https://robot-demo.vercel.app",
    },
    {
      id: 4,
      username: "rohith_dev",
      avatar: "👨‍💻",
      time: "2 weeks ago",
      image: "/inventory-project.png",
      title: "AutoStock Inventory Management",
      description:
        "A Flask-based system with SQL Server for managing car inventory, suppliers, and orders efficiently. Features seamless stock tracking, real-time updates, and a user-friendly interface for automotive businesses.",
      tech: ["Flask", "SQL Server", "Python", "REST API"],
      likes: 94,
      comments: 18,
      period: "Aug 2024 - Oct 2024",
      github: "https://github.com/ROHITHSUDHAKAR15/autostock",
      demo: "https://autostock-demo.vercel.app",
    },
  ]

  const highlights = [
    {
      id: 1,
      label: "Projects",
      color: "bg-orange-200",
      avatar: "💡",
      description: "Explore my diverse portfolio of projects, from web apps to robotics.",
      frames: [
        {
          text: "My top projects showcase full-stack development and AI/ML.",
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%)",
          image: "/ecommerce-project.png",
        },
        {
          text: "From e-commerce to secure messaging and robotics.",
          background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
          image: "/robot-project.png",
        },
        {
          text: "Each project solves real-world problems with innovative solutions.",
          background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
          image: "/messaging-project.png",
        },
      ],
    },
    {
      id: 2,
      label: "Skills",
      color: "bg-pink-200",
      avatar: "⚡",
      description: "A deep dive into my technical proficiencies and expertise.",
      frames: [
        {
          text: "Proficient in MERN stack, Python, Java, and AI/ML.",
          background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
          image: null,
        },
        {
          text: "Continuously expanding my knowledge in new frameworks and technologies.",
          background: "linear-gradient(135deg, #fddb92 0%, #f2f2f2 100%)",
          image: null,
        },
      ],
    },
    {
      id: 3,
      label: "Education",
      color: "bg-blue-200",
      avatar: "🎓",
      description: "My academic journey and achievements at PES University.",
      frames: [
        {
          text: "Pursuing B.Tech CSE at PES University (2022-Present).",
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          image: null,
        },
        {
          text: "Strong academic performance with a practical focus.",
          background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
          image: null,
        },
      ],
    },
    {
      id: 4,
      label: "Experience",
      color: "bg-green-200",
      avatar: "💼",
      description: "Hands-on experience from hackathons, research, and community involvement.",
      frames: [
        {
          text: "Hands-on experience from multiple hackathons and coding challenges.",
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          image: null,
        },
        {
          text: "Involved in research projects and active in technical communities.",
          background: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)",
          image: null,
        },
      ],
    },
    {
      id: 5,
      label: "Interests",
      color: "bg-purple-200",
      avatar: "🎯",
      description: "Beyond coding: my passions in AI/ML, sports, and gaming.",
      frames: [
        {
          text: "Passionate about AI/ML, constantly exploring new algorithms.",
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          image: null,
        },
        {
          text: "Love problem-solving, whether in code or real life.",
          background: "linear-gradient(135deg, #fed6e3 0%, #a8edea 100%)",
          image: null,
        },
      ],
    },
  ]

  // Initialize comments
  useEffect(() => {
    const initialComments: { [key: number]: any[] } = {}
    posts.forEach((post) => {
      initialComments[post.id] = [
        {
          id: 1,
          username: "tech_enthusiast",
          avatar: "🤓",
          text: "Amazing work! Love the architecture.",
          time: "1h ago",
          likes: 5,
        },
        {
          id: 2,
          username: "dev_community",
          avatar: "👩‍💻",
          text: "Can you share the GitHub repo?",
          time: "30m ago",
          likes: 2,
        },
      ]
    })
    setComments(initialComments)
  }, [])

  const handleAvatarImageError = (id: string) => {
    setAvatarImageErrors((prev) => new Set(prev).add(id))
  }

  const handlePostImageError = (postId: number) => {
    setPostImageErrors((prev) => new Set(prev).add(postId))
  }

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDarkMode)
  }, [])

  const handlePostClick = (postId: number) => {
    setInitialPostIdInModal(postId)
    setShowPostFeedModal(true)
  }

  const handleHighlightClick = (highlightId: number) => {
    setInitialHighlightIdInModal(highlightId)
    setShowHighlightStoryModal(true)
  }

  // Functions for comment modal (if needed for individual post comments)
  const handleCommentClick = (post: any) => {
    setCurrentPostForComment(post)
    setShowCommentModal(true)
  }

  const addComment = () => {
    if (!newComment.trim() || !currentPostForComment) return

    setIsTyping(true)
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        username: "rohith_dev",
        avatar: "👨‍💻",
        text: newComment,
        time: "now",
        likes: 0,
      }

      setComments((prev) => ({
        ...prev,
        [currentPostForComment.id]: [...(prev[currentPostForComment.id] || []), comment],
      }))

      setNewComment("")
      setIsTyping(false)
      toast.success("Comment added! 💬", { duration: 1000 })
    }, 1000)
  }

  const handleFollowToggle = () => {
    setIsFollowingProfile((prev) => !prev)
    setIsFollowAnimating(true) // Trigger animation
    toast.success(isFollowingProfile ? "Unfollowed!" : "Now following! 🎉", { duration: 1000 })
    setTimeout(() => setIsFollowAnimating(false), 1200) // Reset animation state after 1.2s (duration of animation)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`border-b sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
          darkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-300"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <ChevronLeft
              className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
            />
          </Link>
          <h1 className="text-xl font-semibold">{`rohith_dev`}</h1>
          <MoreHorizontal
            className={`h-6 w-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-all duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
          />
        </div>
      </header>

      {/* Fixed Profile Info Section */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-around mb-6">
          <Avatar className="w-24 h-24 ring-2 ring-purple-500 ring-offset-2">
            <AvatarImage
              src="/rohith-photo.jpeg"
              alt="Rohith S"
              onError={() => handleAvatarImageError("profile-page-avatar")}
            />
            <AvatarFallback className={`text-4xl ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>
              {avatarImageErrors.has("profile-page-avatar") ? <ImageOff className="h-12 w-12" /> : "RS"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="font-bold text-xl">4</p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">500+</p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">79</p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Following</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <h2 className={`font-bold text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
            Rohith S | Computer Science Student
          </h2>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Entrepreneur</p>
          <ul className={`list-disc list-inside ml-2 text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li>Build innovative solutions with a focus on full-stack development.</li>
            <li>Passionate about AI/ML and robotics.</li>
            <li>Always learning and contributing to impactful projects.</li>
          </ul>
          <a
            href="https://rohithdev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline"
          >
            rohithdev.com
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={isFollowingProfile ? "outline" : "default"}
            className={`flex-1 ${darkMode ? "border-gray-600 text-white bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-white hover:bg-gray-100"}
          ${isFollowingProfile ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600 text-white"}
          ${isFollowAnimating ? "animate-[follow-button-click_1.2s_cubic-bezier(0.34,1.56,0.64,1)_forwards]" : ""}
        `}
            onClick={handleFollowToggle}
          >
            {isFollowingProfile ? (
              <>
                Following <ChevronLeft className="h-4 w-4 rotate-90 ml-1" />
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-1" /> Follow
              </>
            )}
          </Button>
        </div>

        {/* Story Highlights (Circular) */}
        <div className="flex space-x-4 overflow-x-auto mb-6 pb-2">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="flex flex-col items-center space-y-1 min-w-0 cursor-pointer group"
              onClick={() => handleHighlightClick(highlight.id)}
            >
              <div
                className={`w-16 h-16 rounded-full p-0.5 ${highlight.color} flex items-center justify-center ${darkMode ? "dark:bg-opacity-20 dark:border dark:border-gray-700" : ""}`}
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center text-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
                >
                  {highlight.avatar}
                </div>
              </div>
              <span
                className={`text-xs text-center group-hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {highlight.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs for Posts, Reels, Tagged */}
        <div className={`grid grid-cols-3 border-t ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
          <div
            className={`flex items-center justify-center py-3 cursor-pointer border-t-2 ${darkMode ? "border-white text-white" : "border-gray-900 text-gray-900"}`}
          >
            <Grid className="h-5 w-5 mr-2" />
            <span className="font-semibold text-sm">Posts</span>
          </div>
          <Link
            href="/reels"
            className={`flex items-center justify-center py-3 cursor-pointer ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Film className="h-5 w-5 mr-2" />
            <span className="font-semibold text-sm">Reels</span>
          </Link>
          <div
            className={`flex items-center justify-center py-3 cursor-pointer ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Tag className="h-5 w-5 mr-2" />
            <span className="font-semibold text-sm">Tagged</span>
          </div>
        </div>

        {/* Posts Grid (Initial Layout) */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden group cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              {postImageErrors.has(post.id) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 flex-col p-4">
                  <ImageOff className="h-10 w-10 text-gray-500 dark:text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Failed to load</span>
                </div>
              ) : (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => handlePostImageError(post.id)}
                />
              )}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-white text-sm font-semibold">
                  <Heart className="h-4 w-4 mr-1" /> {post.likes}
                  <MessageSquare className="h-4 w-4 ml-3 mr-1" /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Feed Modal */}
      <PostFeedModal
        isOpen={showPostFeedModal}
        onClose={() => setShowPostFeedModal(false)}
        posts={posts}
        initialPostId={initialPostIdInModal}
        likedPosts={likedPosts}
        setLikedPosts={setLikedPosts}
        savedPosts={savedPosts}
        setSavedPosts={setSavedPosts}
        comments={comments}
        setComments={setComments}
        avatarImageErrors={avatarImageErrors}
        setAvatarImageErrors={setAvatarImageErrors}
        postImageErrors={postImageErrors}
        setPostImageErrors={setPostImageErrors}
        darkMode={darkMode}
      />

      {/* Highlight Story Modal */}
      <HighlightStoryModal
        isOpen={showHighlightStoryModal}
        onClose={() => setShowHighlightStoryModal(false)}
        highlights={highlights}
        initialHighlightId={initialHighlightIdInModal}
        avatarImageErrors={avatarImageErrors}
        setAvatarImageErrors={setAvatarImageErrors}
        darkMode={darkMode}
      />

      {/* Comment Modal (for individual post comments, if still desired) */}
      <Dialog open={showCommentModal} onOpenChange={setShowCommentModal}>
        <DialogContent className={`max-w-lg ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"}`}>
          <DialogHeader>
            <DialogTitle className={darkMode ? "text-white" : "text-gray-900"}>Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {currentPostForComment &&
              comments[currentPostForComment.id]?.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="/rohith-photo.jpeg"
                      alt="User"
                      onError={() => handleAvatarImageError(`comment-avatar-${comment.id}`)}
                    />
                    <AvatarFallback
                      className={`text-sm ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
                    >
                      {avatarImageErrors.has(`comment-avatar-${comment.id}`) ? (
                        <ImageOff className="h-4 w-4" />
                      ) : (
                        comment.avatar
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {comment.username}
                      </span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{comment.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{comment.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Heart className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors duration-200" />
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {comment.likes} likes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addComment()}
              className={darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}
            />
            <Button onClick={addComment} disabled={isTyping}>
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
