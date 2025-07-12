"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Search,
  Home,
  Compass,
  MessageSquare,
  PlusSquare,
  Github,
  ExternalLink,
  Star,
  Calendar,
  MapPin,
  Mail,
  Download,
  Moon,
  Sun,
  X,
  Loader2,
  Bell,
  ThumbsUp,
  Zap,
  Code,
  Sparkles,
  Rocket,
  Award,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Film,
  ImageOff,
  Linkedin,
  Globe,
  Twitter,
  Activity,
  Target,
  Coffee,
} from "lucide-react"
import ScrollVelocity from "@/components/scroll-velocity"
import "@/components/scroll-velocity.css"
import { Canvas } from "@react-three/fiber"
import { Html, OrbitControls, Environment } from "@react-three/drei"
import MacBookAnimation from "@/components/macbook-animation" // Import the new component
import InteractiveSkillBar from "@/components/interactive-skill-bar" // Import InteractiveSkillBar
import ContactForm from "@/components/contact-form" // Import ContactForm
import FloatingParticles from "@/components/floating-particles" // Import FloatingParticles

// Enhanced loading page
function LoadingPage({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => {
      clearInterval(progressInterval)
    }
  }, [])

  const handle3DAnimationComplete = () => {
    setFadeOut(true)
    setTimeout(onComplete, 1000) // Fade out after 3D animation
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D MacBook Animation */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="warehouse" />
        <MacBookAnimation imageUrl="/rohith-photo.jpeg" onAnimationComplete={handle3DAnimationComplete} />
      </Canvas>

      {/* Content Container - overlaid using Html from drei */}
      <Html fullscreen>
        <div className="relative z-10 flex items-center justify-center h-full w-screen p-8 pointer-events-none">
          <div className="text-center max-w-4xl">
            {/* Name with modern typography */}
            <h1
              className={`text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight transition-all duration-2000 ${
                fadeOut ? "transform translate-y-[-100px] opacity-0" : "transform translate-y-0 opacity-100"
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(102, 126, 234, 0.5)",
                animation: "glow 2s ease-in-out infinite alternate",
              }}
            >
              ROHITH SUDHAKAR
            </h1>

            {/* Animated subtitle with ScrollVelocity */}
            <div
              className={`text-xl md:text-2xl text-white/90 font-light mb-8 transition-all duration-2000 delay-500 ${
                fadeOut ? "transform translate-y-[50px] opacity-0" : "transform translate-y-0 opacity-100"
              }`}
              style={{ animation: "fadeInUp 2s ease-out 0.5s both" }}
            >
              <ScrollVelocity
                texts={["Computer Science Student", "Full-Stack Developer"]}
                velocity={20} // Adjust velocity as needed
                className="scroll-velocity-text-item" // Custom class for individual text items
              />
            </div>

            {/* Skills badges */}
            <div
              className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-1000 delay-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
              style={{ animation: "fadeIn 1s ease-out 1.5s both" }}
            >
              {["React", "Python", "Node.js", "AI/ML", "ROS 2"].map((skill, index) => (
                <Badge
                  key={skill}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300 animate-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Progress bar */}
            <div
              className={`w-full max-w-md mx-auto transition-all duration-1000 delay-1500 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Loading Portfolio</span>
                <span className="text-white/80 text-sm">{progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Loading dots */}
            <div className={`mt-8 transition-all duration-1000 delay-2000 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Html>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          to { text-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(118, 75, 162, 0.5); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        /* Removed photo-pulse-animation as the main photo is now in 3D model */
      `}</style>
    </div>
  )
}

export default function InstagramPortfolio() {
  const [isLoading, setIsLoading] = useState(true) // Always start as true
  const [showProfileAnimation, setShowProfileAnimation] = useState(false)
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode
  const [isLightModeAnimating, setIsLightModeAnimating] = useState(false) // New state for light mode animation
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [followedPlatforms, setFollowedPlatforms] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<number>(3)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [currentStory, setCurrentStory] = useState<any>(null)
  const [currentStoryFrameIndex, setCurrentStoryFrameIndex] = useState(0)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [currentPost, setCurrentPost] = useState<any>(null)
  const [comments, setComments] = useState<{ [key: number]: any[] }>({})
  const [newComment, setNewComment] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [postImageErrors, setPostImageErrors] = useState<Set<number>>(new Set())
  const [avatarImageErrors, setAvatarImageErrors] = useState<Set<string>>(new Set()) // For avatar images

  const contactRef = useRef<HTMLDivElement>(null)

  const stories = [
    {
      id: 1,
      name: "About Me",
      username: "rohith_dev",
      avatar: "👨‍💻",
      time: "1h",
      active: true,
      frames: [
        {
          text: "Hi, I'm Rohith! A passionate CS student at PES University.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          image: null,
        },
        {
          text: "My CGPA is 7.85, and I love building innovative solutions.",
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          image: null,
        },
        {
          text: "Always eager to learn and contribute to impactful projects.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          image: null,
        },
      ],
    },
    {
      id: 2,
      name: "Skills",
      username: "rohith_dev",
      avatar: "⚡",
      time: "3h",
      active: true,
      frames: [
        {
          text: "I'm a full-stack developer proficient in MERN stack.",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          image: null,
        },
        {
          text: "Strong in Python, Java, and emerging technologies like AI/ML.",
          background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
          image: null,
        },
        {
          text: "Continuously expanding my knowledge in new frameworks.",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          image: null,
        },
      ],
    },
    {
      id: 3,
      name: "Projects",
      username: "rohith_dev",
      avatar: "🚀",
      time: "5h",
      active: true,
      frames: [
        {
          text: "Built 5+ major projects, showcasing diverse technical skills.",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          image: "/ecommerce-project.png",
        },
        {
          text: "From e-commerce systems to secure messaging and robotics.",
          background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
          image: "/robot-project.png",
        },
        {
          text: "Each project solves real-world problems with innovative solutions.",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          image: "/messaging-project.png",
        },
      ],
    },
    {
      id: 4,
      name: "Education",
      username: "rohith_dev",
      avatar: "🎓",
      time: "7h",
      active: true,
      frames: [
        {
          text: "Currently pursuing B.Tech CSE at PES University (2022-Present).",
          background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          image: null,
        },
        {
          text: "Maintaining a strong academic performance with a practical focus.",
          background: "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)",
          image: null,
        },
        {
          text: "Engaged in various academic and extracurricular activities.",
          background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          image: null,
        },
      ],
    },
    {
      id: 5,
      name: "Experience",
      username: "rohith_dev",
      avatar: "💼",
      time: "9h",
      active: true,
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
        {
          text: "Always seeking opportunities to apply theoretical knowledge.",
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          image: null,
        },
      ],
    },
    {
      id: 6,
      name: "Interests",
      username: "rohith_dev",
      avatar: "🎯",
      time: "11h",
      active: true,
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
        {
          text: "Also a sports enthusiast and a gaming aficionado!",
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          image: null,
        },
      ],
    },
  ]

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

  const socialPlatforms = [
    {
      name: "GitHub",
      username: "ROHITHSUDHAKAR15",
      avatar: "🐙",
      url: "https://github.com/ROHITHSUDHAKAR15",
      icon: Github,
      followers: "50+ repos",
    },
    {
      name: "LinkedIn",
      username: "rohith-s-75624531b",
      avatar: "💼",
      url: "https://linkedin.com/in/rohith-s-75624531b",
      icon: Linkedin,
      followers: "500+ connections",
    },
    {
      name: "Portfolio",
      username: "rohithdev.com",
      avatar: "🌐",
      url: "https://rohithdev.com",
      icon: Globe,
      followers: "Live website",
    },
    {
      name: "Twitter",
      username: "rohith_codes",
      avatar: "🐦",
      url: "https://twitter.com/rohith_codes",
      icon: Twitter,
      followers: "Tech updates",
    },
  ]

  const skills = [
    { name: "Python", level: 90, icon: Code },
    { name: "React", level: 85, icon: Globe },
    { name: "Node.js", level: 80, icon: Activity },
    { name: "MongoDB", level: 75, icon: Target },
    { name: "Flask", level: 85, icon: Coffee },
    { name: "ROS 2", level: 70, icon: Rocket },
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

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowProfileAnimation(true)
    setTimeout(() => setShowProfileAnimation(false), 2000)
    toast.success("Welcome to my portfolio! 🎉", { description: "Explore my projects and skills", duration: 1000 })
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    if (!newDarkMode) {
      // If switching to light mode
      setIsLightModeAnimating(true)
      setTimeout(() => setIsLightModeAnimating(false), 500) // Match animation duration
      toast.success("Light mode activated! ☀️", { duration: 1000 })
    } else {
      toast.success("Dark mode activated! 🌙", { duration: 1000 })
    }
  }

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

  const toggleFollow = (platform: string) => {
    setFollowedPlatforms((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(platform)) {
        newSet.delete(platform)
        toast.info("Unfollowed", { duration: 1000 })
      } else {
        newSet.add(platform)
        toast.success("Now following! 🎉", { duration: 1000 })
      }
      return newSet
    })
  }

  const handleStoryClick = (story: any) => {
    setCurrentStory(story)
    setCurrentStoryFrameIndex(0) // Start from the first frame
    setShowStoryModal(true)
    toast.info(`Viewing ${story.name} story`, { duration: 1000 })
  }

  const nextStoryFrame = () => {
    if (!currentStory) return

    if (currentStoryFrameIndex < currentStory.frames.length - 1) {
      setCurrentStoryFrameIndex(currentStoryFrameIndex + 1)
    } else {
      // Move to the next story
      const currentStoryIndex = stories.findIndex((s) => s.id === currentStory.id)
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStory(stories[currentStoryIndex + 1])
        setCurrentStoryFrameIndex(0)
      } else {
        // Last story, close modal
        setShowStoryModal(false)
      }
    }
  }

  const prevStoryFrame = () => {
    if (!currentStory) return

    if (currentStoryFrameIndex > 0) {
      setCurrentStoryFrameIndex(currentStoryFrameIndex - 1)
    } else {
      // Move to the previous story
      const currentStoryIndex = stories.findIndex((s) => s.id === currentStory.id)
      if (currentStoryIndex > 0) {
        setCurrentStory(stories[currentStoryIndex - 1])
        setCurrentStoryFrameIndex(stories[currentStoryIndex - 1].frames.length - 1) // Go to last frame of previous story
      } else {
        // First story, close modal
        setShowStoryModal(false)
      }
    }
  }

  // Auto-advance story frames
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showStoryModal && currentStory) {
      timer = setTimeout(() => {
        nextStoryFrame()
      }, 5000) // Auto-advance every 5 seconds
    }
    return () => clearTimeout(timer)
  }, [showStoryModal, currentStory, currentStoryFrameIndex]) // Re-run effect when story or frame changes

  const handleCommentClick = (post: any) => {
    setCurrentPost(post)
    setShowCommentModal(true)
  }

  const addComment = () => {
    if (!newComment.trim()) return

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
        [currentPost.id]: [...(prev[currentPost.id] || []), comment],
      }))

      setNewComment("")
      setIsTyping(false)
      toast.success("Comment added! 💬", { duration: 1000 })
    }, 1000)
  }

  const handleContactScroll = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      toast.info("Scrolling to contact form! 📧", { duration: 1000 })
    }
  }

  const handleShare = (postId: number) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this project by Rohith`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard! 🔗", { duration: 1000 })
    }
  }

  const clearNotifications = () => {
    setNotifications(0)
    toast.success("All notifications cleared! ✨", { duration: 1000 })
  }

  const handlePostImageError = (postId: number) => {
    setPostImageErrors((prev) => new Set(prev).add(postId))
  }

  const handleAvatarImageError = (id: string) => {
    setAvatarImageErrors((prev) => new Set(prev).add(id))
  }

  if (isLoading) {
    return <LoadingPage onComplete={handleLoadingComplete} />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} ${isLightModeAnimating ? "animate-light-mode-flash" : ""}`}
    >
      <FloatingParticles />
      {/* Toaster is now in app/layout.tsx */}

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className={`flex flex-col gap-2 transition-all duration-300 ${showFloatingMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          <Button
            size="sm"
            className="rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <TrendingUp className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
            onClick={handleContactScroll}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
            onClick={() => window.open("https://github.com/ROHITHSUDHAKAR15", "_blank")}
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg mt-2"
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>

      {/* Instagram Header */}
      <header
        className={`border-b sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
          darkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-300"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Portfolio
            </h1>
          </div>

          <div
            className={`hidden md:flex items-center rounded-lg px-4 py-2 w-64 transition-all duration-300 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Search className={`h-4 w-4 mr-2 ${darkMode ? "text-gray-300" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Search projects, skills..."
              className={`bg-transparent outline-none text-sm w-full ${darkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun
                className={`h-4 w-4 transition-all duration-300 ${darkMode ? "text-gray-400" : "text-yellow-500"}`}
              />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className={`h-4 w-4 transition-all duration-300 ${darkMode ? "text-blue-400" : "text-gray-400"}`} />
            </div>

            <Link href="/">
              <Home
                className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
              />
            </Link>
            <Link href="/reels">
              <Film
                className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
              />
            </Link>
            <MessageSquare
              className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
              onClick={handleContactScroll}
            />
            <PlusSquare
              className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
            />
            <Compass
              className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
            />

            <div className="relative">
              <Bell
                className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
                onClick={clearNotifications}
              />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {notifications}
                </span>
              )}
            </div>

            <Link href="/profile">
              <Avatar
                className={`h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200 ring-2 ring-purple-500 ring-offset-2 ${
                  showProfileAnimation ? "animate-pulse ring-4 ring-yellow-400" : ""
                }`}
              >
                <AvatarImage
                  src="/rohith-photo.jpeg"
                  alt="Rohith S"
                  onError={() => handleAvatarImageError("main-profile")}
                />
                <AvatarFallback className={darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}>
                  {avatarImageErrors.has("main-profile") ? <ImageOff className="h-4 w-4" /> : "RS"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto flex gap-8 pt-8 relative z-10">
        {/* Main Content */}
        <div className="flex-1 max-w-lg mx-auto">
          {/* Stories Section */}
          <div
            className={`border rounded-lg p-4 mb-6 transition-all duration-300 hover:shadow-lg ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <div className="flex space-x-4 overflow-x-auto">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col items-center space-y-1 min-w-0 cursor-pointer group"
                  onClick={() => handleStoryClick(story)}
                >
                  <div
                    className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 group-hover:scale-110 ${
                      story.active ? "bg-gradient-to-tr from-yellow-400 to-pink-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      {story.avatar}
                    </div>
                  </div>
                  <span
                    className={`text-xs text-center group-hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {story.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
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
                    <Badge className="bg-black/70 text-white animate-pulse">{post.period}</Badge>
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
                        onClick={() => handleCommentClick(post)}
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
                    onClick={() => handleCommentClick(post)}
                  >
                    View all {comments[post.id]?.length || post.comments} comments
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 space-y-6">
          {/* Profile Card */}
          <Card
            className={`transition-all duration-300 hover:shadow-lg ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            } ${showProfileAnimation ? "ring-4 ring-yellow-400 ring-opacity-75 animate-pulse" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-14 h-14 ring-2 ring-purple-500 ring-offset-2">
                  <AvatarImage
                    src="/rohith-photo.jpeg"
                    alt="Rohith S"
                    onError={() => handleAvatarImageError("sidebar-profile")}
                  />
                  <AvatarFallback
                    className={`text-2xl ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
                  >
                    {avatarImageErrors.has("sidebar-profile") ? <ImageOff className="h-6 w-6" /> : "RS"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Rohith S</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Computer Science Student</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-500">Active now</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div
                  className={`flex items-center gap-2 hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Bengaluru, India</span>
                </div>
                <div
                  className={`flex items-center gap-2 hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>PES University</span>
                </div>
                <div
                  className={`flex items-center gap-2 hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  <Star className="h-4 w-4" />
                  <span>CGPA: 7.85</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200"
                  onClick={handleContactScroll}
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4 mr-1" />
                  )}
                  Contact
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex-1 hover:scale-105 transition-all duration-200 ${darkMode ? "border-gray-600 text-white bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-white hover:bg-gray-100"}`}
                  onClick={() => window.open("https://github.com/ROHITHSUDHAKAR15", "_blank")}
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </Button>
              </div>

              <Button
                size="sm"
                variant="outline"
                className={`w-full mt-2 hover:scale-105 transition-all duration-200 ${darkMode ? "border-gray-600 text-white bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-white hover:bg-gray-100"}`}
                onClick={() => toast.success("Resume download started! 📄", { duration: 1000 })}
              >
                <Download className="h-4 w-4 mr-1" />
                Download Resume
              </Button>
            </CardContent>
          </Card>

          {/* Interactive Skills */}
          <Card
            className={`transition-all duration-300 hover:shadow-lg ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <Award className="h-5 w-5 text-yellow-500" />
                Top Skills
              </h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <InteractiveSkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card
            className={`transition-all duration-300 hover:shadow-lg ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                  <Users className="h-4 w-4" />
                  Connect with me
                </h3>
                <span
                  className={`text-xs font-semibold cursor-pointer hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  See All
                </span>
              </div>

              <div className="space-y-3">
                {socialPlatforms.map((platform) => (
                  <div key={platform.username} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      {" "}
                      {/* Added a wrapper for avatar and text */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform duration-200 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                      >
                        {platform.avatar}
                      </div>
                      <div>
                        <p
                          className={`font-semibold text-sm group-hover:text-purple-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {platform.name}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {platform.followers}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                        followedPlatforms.has(platform.username)
                          ? darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                          : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                      onClick={() => {
                        toggleFollow(platform.username)
                        window.open(platform.url, "_blank")
                      }}
                    >
                      {followedPlatforms.has(platform.username) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <ContactForm darkMode={darkMode} contactRef={contactRef} />
        </div>
      </div>
      <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
        <DialogContent
          className={`max-w-md p-0 overflow-hidden ${darkMode ? "bg-gray-900 border-gray-700" : "bg-black"}`}
          style={{ borderRadius: "10px" }}
        >
          {currentStory && currentStory.frames[currentStoryFrameIndex] && (
            <div
              className="relative h-[600px] flex flex-col text-white"
              style={{
                background: currentStory.frames[currentStoryFrameIndex].background,
              }}
            >
              {currentStory.frames[currentStoryFrameIndex].image ? (
                <img
                  src={currentStory.frames[currentStoryFrameIndex].image || "/placeholder.svg"}
                  alt="Story content"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=600&width=400"
                    e.currentTarget.alt = "Image failed to load"
                    e.currentTarget.className = "absolute inset-0 w-full h-full object-contain p-16 bg-gray-800"
                    // Instead of innerHTML, we'll just rely on the src change and styling
                  }}
                />
              ) : null}
              {currentStory.frames[currentStoryFrameIndex].image &&
                currentStory.frames[currentStoryFrameIndex].image.includes("/placeholder.svg") && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-800 z-0">
                    <ImageOff className="h-16 w-16 mb-4" />
                    <span className="text-lg">Image failed to load</span>
                  </div>
                )}

              {/* Progress bar */}
              <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
                {currentStory.frames.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full ${index <= currentStoryFrameIndex ? "bg-white" : "bg-white/50"}`}
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
                      onError={() => handleAvatarImageError(`story-avatar-${currentStory.id}`)}
                    />
                    <AvatarFallback className="bg-gray-700 text-white text-sm">
                      {avatarImageErrors.has(`story-avatar-${currentStory.id}`) ? (
                        <ImageOff className="h-4 w-4" />
                      ) : (
                        currentStory.avatar
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{currentStory.username}</span>
                  <span className="text-xs text-white/70">{currentStory.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MoreHorizontal className="h-5 w-5 cursor-pointer text-white/70 hover:text-white" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-1 h-auto"
                    onClick={() => setShowStoryModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Story Content */}
              <div
                key={currentStoryFrameIndex} // Add key to force re-render and trigger transition
                className="flex-1 flex items-center justify-center p-6 text-center z-10 animate-fade-in"
              >
                <p className="text-xl font-medium leading-relaxed drop-shadow-lg">
                  {currentStory.frames[currentStoryFrameIndex].text}
                </p>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                onClick={prevStoryFrame}
                disabled={currentStoryFrameIndex === 0 && stories.findIndex((s) => s.id === currentStory.id) === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                onClick={nextStoryFrame}
                disabled={
                  currentStoryFrameIndex === currentStory.frames.length - 1 &&
                  stories.findIndex((s) => s.id === currentStory.id) === stories.length - 1
                }
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Reply Section */}
              <div className="p-4 flex items-center space-x-2 z-10">
                <Input
                  placeholder={`Reply to ${currentStory.username}...`}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 rounded-full h-10 px-4 focus-visible:ring-white"
                />
                <Heart className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
                <Send className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={showCommentModal} onOpenChange={setShowCommentModal}>
        <DialogContent className={`max-w-lg ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"}`}>
          <DialogHeader>
            <DialogTitle className={darkMode ? "text-white" : "text-gray-900"}>Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {currentPost &&
              comments[currentPost.id]?.map((comment) => (
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
