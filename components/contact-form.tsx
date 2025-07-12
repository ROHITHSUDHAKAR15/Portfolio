"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

interface ContactFormProps {
  darkMode: boolean
  contactRef: React.RefObject<HTMLDivElement>
}

export default function ContactForm({ darkMode, contactRef }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.", { duration: 1000 })
      return
    }

    setIsSending(true)
    // Simulate sending message
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon. 🚀", { duration: 1000 })
      setName("")
      setEmail("")
      setMessage("")
      setIsSending(false)
    }, 2000)
  }

  return (
    <Card
      ref={contactRef}
      className={`transition-all duration-300 hover:shadow-lg ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      <CardContent className="p-4">
        <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          <Mail className="h-5 w-5 text-blue-500" />
          Contact Me
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}
            />
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition-all duration-200"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" /> Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
