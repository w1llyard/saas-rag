"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error.message)
          setError(error.message)
          // Redirect to auth page with error
          setTimeout(() => {
            router.replace("/auth?error=" + encodeURIComponent(error.message))
          }, 2000)
          return
        }

        if (data.session) {
          // Successfully authenticated, redirect to dashboard
          router.replace("/dashboard")
        } else {
          // No session found, redirect to auth
          router.replace("/auth")
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
        setTimeout(() => {
          router.replace("/auth")
        }, 2000)
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="text-center space-y-4">
          <div className="text-red-600 dark:text-red-400">
            <h2 className="text-xl font-semibold">Authentication Error</h2>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <p className="text-sm text-muted-foreground">Redirecting you back...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
        <div>
          <h2 className="text-xl font-semibold">Completing sign in...</h2>
          <p className="text-sm text-muted-foreground mt-2">Please wait while we set up your account</p>
        </div>
      </div>
    </div>
  )
}
