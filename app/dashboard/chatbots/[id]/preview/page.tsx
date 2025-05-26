"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Bot, Send, User, RefreshCw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardShell } from "@/components/dashboard-shell"

// Sample conversation for demonstration
const initialMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your product documentation assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
]

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function ChatbotPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const chatbotId = params.id as string
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      // This would be replaced with actual API call to your backend
      const mockResponses = [
        "Based on the documentation, you can find this information in the user manual section 3.2.",
        "The product supports Windows 10/11, macOS 10.15+, and Ubuntu 20.04+. You'll need at least 4GB RAM and 10GB of free disk space.",
        "To reset your password, go to the login page and click 'Forgot Password'. You'll receive an email with instructions.",
        "The installation process typically takes 5-10 minutes depending on your system specifications.",
        "Yes, we offer a mobile app for both iOS and Android. You can download it from the respective app stores.",
      ]

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setMessages(initialMessages)
    inputRef.current?.focus()
  }

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Chatbot Preview</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Test your chatbot and see how it responds to questions
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 sm:h-10" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Reset Chat</span>
            <span className="sm:hidden">Reset</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 sm:h-10">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export Conversation</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)]">
            <CardHeader className="border-b p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <div className="size-6 sm:size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
                  <Bot className="size-3 sm:size-4" />
                </div>
                <div>
                  <CardTitle className="text-sm sm:text-base">Product Documentation Bot</CardTitle>
                  <CardDescription className="text-xs">Chatbot ID: {chatbotId}</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto text-xs">
                  Preview Mode
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 sm:gap-3 items-start ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="size-6 sm:size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <Bot className="size-3 sm:size-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-2 sm:p-3 text-xs sm:text-sm max-w-[85%] sm:max-w-[80%] ${
                        message.role === "user"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="mt-1 text-[10px] sm:text-xs opacity-60">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="size-6 sm:size-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                        <User className="size-3 sm:size-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <div className="size-6 sm:size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <Bot className="size-3 sm:size-4" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                      <div className="flex space-x-1 sm:space-x-2">
                        <div className="size-1.5 sm:size-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="size-1.5 sm:size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="size-1.5 sm:size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <Separator />
              <form onSubmit={handleSubmit} className="p-2 sm:p-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 h-9 sm:h-10 text-sm"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="sm" className="h-9 sm:h-10" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base sm:text-lg">Chatbot Information</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Details about this chatbot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div>
                <h3 className="text-xs sm:text-sm font-medium">Model</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Gemini Pro</p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium">Documents</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">5 documents</p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium">Temperature</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">0.7</p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium">Max Tokens</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">1024</p>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-9 sm:h-10"
                onClick={() => router.push(`/dashboard/chatbots/${chatbotId}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chatbot
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base sm:text-lg">Testing Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Try asking specific questions about your documents</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Test edge cases and complex queries</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Verify accuracy of responses against your documents</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Try different phrasings of the same question</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
