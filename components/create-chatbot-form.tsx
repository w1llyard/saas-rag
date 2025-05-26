"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"

interface CreateChatbotFormProps {
  onSubmit: (data: any) => void
}

export function CreateChatbotForm({ onSubmit }: CreateChatbotFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "gemini-pro",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="My Awesome Chatbot"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="This chatbot helps users with..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="model">Model</Label>
          <Select value={formData.model} onValueChange={(value) => handleChange("model", value)}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
              <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Select the AI model that will power your chatbot</p>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Create Chatbot
        </Button>
      </DialogFooter>
    </form>
  )
}
