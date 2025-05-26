"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { DashboardShell } from "@/components/dashboard-shell"
import { Search, FileText, Video, MessageSquare, ExternalLink, Mail } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")

  const faqs = [
    {
      question: "How do I create a new chatbot?",
      answer:
        "To create a new chatbot, go to the Dashboard and click the 'Create Chatbot' button. Fill in the required information such as name and description, then click 'Create Chatbot'. You'll then be able to upload documents to train your chatbot.",
    },
    {
      question: "What file types are supported for document upload?",
      answer:
        "We currently support PDF, TXT, and Markdown (MD) files. We're working on adding support for more file types in the future, including DOCX, HTML, and CSV.",
    },
    {
      question: "How do I embed my chatbot on my website?",
      answer:
        "After creating a chatbot, go to the chatbot details page and click on the 'Embed' tab. You'll find the embed code there that you can copy and paste into your website's HTML. You can also customize the appearance of the widget from this tab.",
    },
    {
      question: "What is the maximum file size for uploads?",
      answer:
        "The maximum file size for individual document uploads is 10MB. If you have larger files, we recommend splitting them into smaller documents or reaching out to our support team for assistance.",
    },
    {
      question: "How accurate are the chatbot responses?",
      answer:
        "The accuracy of responses depends on the quality and comprehensiveness of the documents you upload. Our system uses Google's Gemini AI models to generate responses based on the content in your documents. The more relevant and well-structured your documents are, the more accurate the responses will be.",
    },
    {
      question: "Can I customize the appearance of my chatbot?",
      answer:
        "Yes, you can customize the appearance of your chatbot widget. In the 'Embed' tab of your chatbot details page, you can change the position, theme, and primary color of the widget to match your website's design.",
    },
    {
      question: "How do I get a Gemini API key?",
      answer:
        "You can get a Gemini API key by signing up at Google AI Studio (ai.google.dev). Once you've created an account, you can generate an API key from the dashboard. Then, add this key to your RAG SaaS account in the Settings > API Keys section.",
    },
    {
      question: "How long does it take to process uploaded documents?",
      answer:
        "Processing time depends on the size and complexity of your documents. Most documents are processed within a few minutes. Larger documents or batches of documents may take longer. You'll receive a notification when processing is complete.",
    },
  ]

  const guides = [
    {
      title: "Getting Started with RAG SaaS",
      description: "Learn the basics of creating and managing your first chatbot",
      icon: <FileText className="size-5" />,
      tag: "Beginner",
      link: "#",
    },
    {
      title: "Uploading and Managing Documents",
      description: "Best practices for document preparation and management",
      icon: <FileText className="size-5" />,
      tag: "Intermediate",
      link: "#",
    },
    {
      title: "Embedding Your Chatbot",
      description: "Step-by-step guide to adding your chatbot to your website",
      icon: <FileText className="size-5" />,
      tag: "Beginner",
      link: "#",
    },
    {
      title: "Advanced Chatbot Configuration",
      description: "Fine-tune your chatbot for better performance",
      icon: <FileText className="size-5" />,
      tag: "Advanced",
      link: "#",
    },
    {
      title: "Analytics and Performance Optimization",
      description: "Understanding chatbot analytics and improving performance",
      icon: <FileText className="size-5" />,
      tag: "Advanced",
      link: "#",
    },
    {
      title: "API Integration Guide",
      description: "Integrate your chatbot with other applications via API",
      icon: <FileText className="size-5" />,
      tag: "Developer",
      link: "#",
    },
  ]

  const videos = [
    {
      title: "Quick Start Tutorial",
      description: "Get up and running with RAG SaaS in under 5 minutes",
      duration: "4:32",
      thumbnail: "/placeholder.svg?height=180&width=320",
      link: "#",
    },
    {
      title: "Document Preparation Best Practices",
      description: "Learn how to prepare your documents for optimal results",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=180&width=320",
      link: "#",
    },
    {
      title: "Customizing Your Chatbot Widget",
      description: "Make your chatbot match your brand and website design",
      duration: "6:47",
      thumbnail: "/placeholder.svg?height=180&width=320",
      link: "#",
    },
    {
      title: "Advanced Analytics Tutorial",
      description: "Get insights from your chatbot usage data",
      duration: "12:03",
      thumbnail: "/placeholder.svg?height=180&width=320",
      link: "#",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">Find answers and learn how to get the most out of RAG SaaS</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for help..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">Guides & Documentation</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about using RAG SaaS</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    No FAQs found matching your search. Try a different query or browse our guides.
                  </div>
                )}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Link href="#" className="text-purple-600 hover:text-purple-700">
                  Contact our support team
                </Link>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guides & Documentation</CardTitle>
              <CardDescription>Detailed guides to help you get the most out of RAG SaaS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredGuides.length > 0 ? (
                  filteredGuides.map((guide, index) => (
                    <Link href={guide.link} key={index} className="block">
                      <Card className="h-full transition-all hover:shadow-md">
                        <CardContent className="p-4 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
                              {guide.icon}
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                guide.tag === "Beginner"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : guide.tag === "Intermediate"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : guide.tag === "Advanced"
                                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                              }
                            >
                              {guide.tag}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{guide.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 flex-grow">{guide.description}</p>
                          <div className="flex items-center text-sm text-purple-600 hover:text-purple-700">
                            Read guide
                            <ExternalLink className="ml-1 size-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-muted-foreground">
                    No guides found matching your search. Try a different query or browse our FAQs.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Link href="#" className="text-purple-600 hover:text-purple-700 flex items-center">
                View all documentation
                <ExternalLink className="ml-1 size-4" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn visually with our step-by-step video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video, index) => (
                    <Link href={video.link} key={index} className="block">
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="relative aspect-video bg-muted">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-12 rounded-full bg-black/70 flex items-center justify-center text-white">
                              <Video className="size-5" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-muted-foreground">
                    No videos found matching your search. Try a different query or browse our guides.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Link href="#" className="text-purple-600 hover:text-purple-700 flex items-center">
                View all videos
                <ExternalLink className="ml-1 size-4" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Still need help?</h2>
        <p className="text-muted-foreground mb-4">Our support team is ready to assist you with any questions</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Mail className="mr-2 h-4 w-4" />
            Email Support
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
