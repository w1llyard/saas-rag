"use client"

import { Bot, MessageSquare, FileText, Clock, MoreHorizontal, ExternalLink, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatbotCardProps {
  chatbot: {
    id: string
    name: string
    description: string
    documents: number
    queries: number
    lastUpdated: string
    status: string
  }
  onClick: () => void
}

export function ChatbotCard({ chatbot, onClick }: ChatbotCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <Bot className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{chatbot.name}</h3>
              <p className="text-muted-foreground text-sm line-clamp-1">{chatbot.description}</p>
            </div>
          </div>
          <Badge variant={chatbot.status === "active" ? "default" : "secondary"}>
            {chatbot.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="size-4" />
            <span>{chatbot.queries.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="size-4" />
            <span>{chatbot.documents}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{chatbot.lastUpdated}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
            <ExternalLink className="size-4" />
            <span className="sr-only">Preview</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}
