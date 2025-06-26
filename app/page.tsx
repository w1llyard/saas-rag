"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import {
  Check,
  Menu,
  X,
  Moon,
  Sun,
  FileText,
  Database,
  MessageSquare,
  Layers,
  Code,
  Upload,
  Bot,
  ExternalLink,
  ArrowRight,
  Github,
  Zap,
  Shield,
  LogIn,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useUserStore } from "@/store/user-store"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const router = useRouter()

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  })

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  const { isAuthenticated } = useUserStore()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogin = () => {
    router.push("/auth")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Upload & Parse Documents",
      description: "Easily upload PDFs, TXTs, or Markdown files and automatically parse their content.",
      icon: <FileText className="size-5" />,
    },
    {
      title: "Vector Search with Supabase",
      description: "Store and search document embeddings with Supabase for lightning-fast retrieval.",
      icon: <Database className="size-5" />,
    },
    {
      title: "Contextual Q&A",
      description: "Get accurate, context-aware answers powered by Google's Gemini AI models.",
      icon: <MessageSquare className="size-5" />,
    },
    {
      title: "Multiple Chatbots",
      description: "Create and manage multiple chatbots for different document sets or use cases.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Embed Anywhere",
      description: "Add your chatbot to any website with our lightweight JavaScript widget.",
      icon: <Code className="size-5" />,
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and security for your sensitive documents and data.",
      icon: <Shield className="size-5" />,
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Sign Up & Connect",
      description: "Create an account and connect your Gemini API key to get started.",
      icon: <Upload className="size-6" />,
    },
    {
      step: "02",
      title: "Upload Documents",
      description: "Upload your PDFs, TXTs, or Markdown files to train your chatbot.",
      icon: <FileText className="size-6" />,
    },
    {
      step: "03",
      title: "Install Widget",
      description: "Add the embed widget to your website with a simple code snippet.",
      icon: <Code className="size-6" />,
    },
    {
      step: "04",
      title: "Start Chatting",
      description: "Ask questions and get accurate, context-aware answers from your documents.",
      icon: <MessageSquare className="size-6" />,
    },
  ]

  const testimonials = [
    {
      quote:
        "RAG SaaS has transformed how we handle customer support. Our response time has decreased by 70% while maintaining high accuracy.",
      author: "Sarah Johnson",
      title: "Head of Customer Success",
      company: "TechCorp Inc.",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "Implementing the chatbot on our documentation site has reduced support tickets by 45%. The setup was incredibly simple.",
      author: "Michael Chen",
      title: "CTO",
      company: "DevFlow",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "The ability to train the AI on our internal documents has been game-changing for our team's productivity and knowledge sharing.",
      author: "Emily Rodriguez",
      title: "Knowledge Manager",
      company: "Global Solutions",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  const faqs = [
    {
      question: "How does RAG SaaS work?",
      answer:
        "RAG SaaS uses Retrieval-Augmented Generation to create AI chatbots trained on your documents. You upload your documents, our system processes them into embeddings, and then when users ask questions, the AI retrieves relevant information and generates accurate, context-aware answers.",
    },
    {
      question: "What types of documents can I upload?",
      answer:
        "Currently, we support PDF, TXT, and Markdown (MD) files. We're working on adding support for more file types including DOCX, HTML, and CSV in the near future.",
    },
    {
      question: "Do I need my own Gemini API key?",
      answer:
        "Yes, you'll need to provide your own Gemini API key to power the AI models. This gives you full control over your usage and costs. You can easily get a key from Google AI Studio.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer a 14-day free trial with no credit card required. After that, our Pro plan starts at $49/month for 5 chatbots and 10,000 queries. We also offer custom Enterprise plans for larger organizations.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level encryption for all data at rest and in transit. Your documents are stored securely, and we never use your data to train our models. You maintain full ownership of your content.",
    },
    {
      question: "Can I customize the appearance of the chatbot?",
      answer:
        "Yes, you can fully customize the appearance of your chatbot widget including colors, position, theme, and more to match your brand and website design.",
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <motion.header
        style={{ opacity: isScrolled ? headerOpacity : 1 }}
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white">
              R
            </div>
            <span>RAG SaaS</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="rounded-full text-sm font-medium border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                >
                  Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                onClick={handleLogin}
                className="rounded-full text-sm font-medium border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
              >
                <LogIn className="mr-2 size-4" />
                Sign In
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link href="#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="#how-it-works" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="#testimonials" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Testimonials
              </Link>
              <Link href="#pricing" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="#faq" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="ghost" onClick={handleLogin} className="justify-start py-2 text-sm font-medium">
                  <LogIn className="mr-2 size-4" />
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="w-full py-20 md:py-32 overflow-hidden">
          <div className="container p-4 md:p-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <Badge className="mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  <Zap className="mr-1 h-3.5 w-3.5" />
                  Powered by Gemini AI
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Turn Your <span className="text-purple-600 dark:text-purple-400">Documents</span> into Smart AI
                  Chatbots
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Upload PDFs, TXTs, or Markdown, then ask questions and get context-aware answers powered by Gemini AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAuthenticated ? (
                    <Link href="/dashboard">
                      <Button size="lg" className="rounded-full h-12 px-8 text-base bg-purple-600 hover:bg-purple-700">
                        Go to Dashboard
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleLogin}
                      className="rounded-full h-12 px-8 text-base bg-purple-600 hover:bg-purple-700"
                    >
                      Get Started
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-12 px-8 text-base border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-600" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-600" />
                    <span>Free Trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-600" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-md bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        R
                      </div>
                      <span className="font-medium text-sm">RAG SaaS Widget</span>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <ExternalLink className="size-3" />
                      Embed
                    </Badge>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                      <div className="flex gap-3 items-start">
                        <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <Bot className="size-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm max-w-[80%]">
                          <p>Hello! I'm your document assistant. Ask me anything about your uploaded content.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start justify-end">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg p-3 text-sm max-w-[80%]">
                          <p>What's the main feature of your product?</p>
                        </div>
                        <div className="size-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                          <span className="text-xs font-medium">U</span>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <Bot className="size-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm max-w-[80%]">
                          <p>
                            Based on your documents, our main feature is the ability to create AI chatbots trained on
                            your specific content. You can upload PDFs, TXTs, or Markdown files, and our system will
                            process them to create a knowledge base for your chatbot.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Ask a question..."
                            className="w-full rounded-full border border-gray-200 dark:border-gray-700 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800"
                          />
                          <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-purple-600 p-1.5 text-white">
                            <ArrowRight className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code snippet overlay */}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-4 w-[200px] transform rotate-6">
                  <div className="text-xs font-mono text-gray-800 dark:text-gray-300 overflow-hidden">
                    <div className="text-purple-600 dark:text-purple-400">{"<script>"}</div>
                    <div>{"  window.ragWidget.init({"}</div>
                    <div className="pl-4">{'chatbotId: "cb_123",'}</div>
                    <div className="pl-4">{'position: "bottom-right"'}</div>
                    <div>{"})"}</div>
                    <div className="text-purple-600 dark:text-purple-400">{"</script>"}</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl opacity-70"></div>
                <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-pink-600/30 to-purple-600/30 blur-3xl opacity-70"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 border-y bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">Trusted by innovative companies worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100"></div>
                    <Image
                      src={`/placeholder.svg?height=60&width=120`}
                      alt={`Company logo ${i}`}
                      width={120}
                      height={60}
                      className="h-8 w-auto opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 relative"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Powerful RAG Capabilities</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Our platform provides everything you need to create, deploy, and manage AI chatbots trained on your
                documents.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate={featuresInView ? "show" : "hidden"}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item} className="group">
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md hover:shadow-purple-500/5 hover:border-purple-500/10">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple Process, Powerful Results</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Get started in minutes and transform your documents into interactive AI chatbots.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4 group"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Customers Say</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Don't just take our word for it. See how RAG SaaS is helping businesses improve their customer support
                and knowledge management.
              </p>
            </motion.div>

            <div className="relative mt-16">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-purple-100/20 to-background dark:from-background dark:via-purple-900/10 dark:to-background rounded-2xl"></div>

              <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/80 backdrop-blur-sm">
                <div className="p-8 md:p-12">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: activeTestimonial === i ? 1 : 0,
                        x: activeTestimonial === i ? 0 : 20,
                        position: activeTestimonial === i ? "relative" : "absolute",
                        zIndex: activeTestimonial === i ? 10 : -10,
                      }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <div className="mb-8 text-center">
                        <p className="text-xl md:text-2xl italic mb-6 max-w-3xl mx-auto">"{testimonial.quote}"</p>
                        <div className="flex flex-col items-center">
                          <div className="size-16 rounded-full overflow-hidden mb-3 border-2 border-purple-200 dark:border-purple-800">
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.author}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold">{testimonial.author}</h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center pb-6">
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`size-2 rounded-full transition-colors ${
                          activeTestimonial === i
                            ? "bg-purple-600"
                            : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                        }`}
                        aria-label={`View testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Embed Your Chatbot Anywhere</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our lightweight JavaScript widget makes it easy to add your document-trained chatbot to any website.
                  Just copy and paste a simple code snippet, and you're ready to go.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "No iframes or complex setup required",
                    "Customizable appearance to match your brand",
                    "Responsive design works on all devices",
                    "Minimal impact on page load performance",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="size-5 text-purple-600 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-fit rounded-full bg-purple-600 hover:bg-purple-700">
                  View Documentation
                  <ExternalLink className="ml-2 size-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <div className="size-3 rounded-full bg-yellow-500"></div>
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">index.html</div>
                  </div>
                  <div className="font-mono text-sm bg-white dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-800 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400">{"<head>"}</span>
                      {"\n  <!-- Other head elements -->\n"}
                      <span className="text-purple-600 dark:text-purple-400">
                        {'  <script src="https://cdn.ragsaas.com/widget.js"></script>'}
                      </span>
                      {"\n"}
                      <span className="text-purple-600 dark:text-purple-400">{"</head>"}</span>
                      {"\n\n"}
                      <span className="text-purple-600 dark:text-purple-400">{"<body>"}</span>
                      {"\n  <!-- Your website content -->\n\n"}
                      <span className="text-purple-600 dark:text-purple-400">{"  <script>"}</span>
                      {"\n    window.ragWidget.init({\n"}
                      <span className="text-green-600 dark:text-green-400">{'      chatbotId: "cb_123456",\n'}</span>
                      <span className="text-green-600 dark:text-green-400">{'      position: "bottom-right",\n'}</span>
                      <span className="text-green-600 dark:text-green-400">{'      theme: "light",\n'}</span>
                      <span className="text-green-600 dark:text-green-400">{'      primaryColor: "#9333ea"\n'}</span>
                      {"    });\n"}
                      <span className="text-purple-600 dark:text-purple-400">{"  </script>"}</span>
                      {"\n"}
                      <span className="text-purple-600 dark:text-purple-400">{"</body>"}</span>
                    </pre>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl opacity-70"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="rounded-full p-1">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="annually" className="rounded-full px-6">
                      Annually (Save 20%)
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {[
                      {
                        name: "Free",
                        price: "$0",
                        description: "Perfect for trying out the platform.",
                        features: [
                          "1 chatbot",
                          "10 queries/month",
                          "Upload up to 5MB",
                          "Basic customization",
                          "Community support",
                        ],
                        cta: "Get Started",
                      },
                      {
                        name: "Basic",
                        price: "$29",
                        description: "Great for small businesses and startups.",
                        features: [
                          "3 chatbots",
                          "5,000 queries/month",
                          "Upload up to 500 pages",
                          "Custom branding",
                          "Email support",
                        ],
                        cta: "Start Free Trial",
                      },
                      {
                        name: "Pro",
                        price: "$49",
                        description: "Perfect for growing businesses.",
                        features: [
                          "5 chatbots",
                          "10,000 queries/month",
                          "Upload up to 1,000 pages",
                          "Custom branding",
                          "Priority support",
                        ],
                        cta: "Start Free Trial",
                        popular: true,
                      },
                      {
                        name: "Enterprise",
                        price: "Custom",
                        description: "For organizations with advanced needs.",
                        features: [
                          "Unlimited chatbots",
                          "Unlimited queries",
                          "Unlimited document uploads",
                          "Priority support",
                          "Custom integrations",
                          "Dedicated account manager",
                        ],
                        cta: "Contact Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group"
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular ? "border-purple-600 shadow-lg" : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all duration-300 group-hover:shadow-xl ${
                            plan.popular ? "group-hover:shadow-purple-500/10" : ""
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {plan.name}
                            </h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold">{plan.price}</span>
                              {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
                            </div>
                            <p className="text-muted-foreground mt-2">{plan.description}</p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-purple-600" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={handleLogin}
                              className={`w-full mt-auto rounded-full ${
                                plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-muted hover:bg-muted/80"
                              } transition-transform duration-300 group-hover:scale-105`}
                              variant={plan.popular ? "default" : "outline"}
                            >
                              {plan.cta}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="annually">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {[
                      {
                        name: "Free",
                        price: "$0",
                        description: "Perfect for trying out the platform.",
                        features: [
                          "1 chatbot",
                          "10 queries/month",
                          "Upload up to 5MB",
                          "Basic customization",
                          "Community support",
                        ],
                        cta: "Get Started",
                      },
                      {
                        name: "Basic",
                        price: "$24",
                        description: "Great for small businesses and startups.",
                        features: [
                          "3 chatbots",
                          "5,000 queries/month",
                          "Upload up to 500 pages",
                          "Custom branding",
                          "Email support",
                        ],
                        cta: "Start Free Trial",
                      },
                      {
                        name: "Pro",
                        price: "$39",
                        description: "Perfect for growing businesses.",
                        features: [
                          "5 chatbots",
                          "10,000 queries/month",
                          "Upload up to 1,000 pages",
                          "Custom branding",
                          "Priority support",
                        ],
                        cta: "Start Free Trial",
                        popular: true,
                      },
                      {
                        name: "Enterprise",
                        price: "Custom",
                        description: "For organizations with advanced needs.",
                        features: [
                          "Unlimited chatbots",
                          "Unlimited queries",
                          "Unlimited document uploads",
                          "Priority support",
                          "Custom integrations",
                          "Dedicated account manager",
                        ],
                        cta: "Contact Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group"
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular ? "border-purple-600 shadow-lg" : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all duration-300 group-hover:shadow-xl ${
                            plan.popular ? "group-hover:shadow-purple-500/10" : ""
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {plan.name}
                            </h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold">{plan.price}</span>
                              {plan.price !== "Custom" && plan.price !== "$0" && (
                                <span className="text-muted-foreground ml-1">/month</span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-2">{plan.description}</p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-purple-600" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={handleLogin}
                              className={`w-full mt-auto rounded-full ${
                                plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-muted hover:bg-muted/80"
                              } transition-transform duration-300 group-hover:scale-105`}
                              variant={plan.popular ? "default" : "outline"}
                            >
                              {plan.cta}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Find answers to common questions about RAG SaaS and how it can help your business.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <AccordionItem value={`faq-${i}`}>
                      <AccordionTrigger className="data-[state=open]:text-purple-600 dark:data-[state=open]:text-purple-400">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white">
                R
              </div>
              <span>RAG SaaS</span>
            </div>
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/terms"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="https://github.com/AntonioErdeljac/next13-ai-saas-starter"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="mr-2 size-4 inline-block" />
                Github
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
