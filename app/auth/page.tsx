// app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import createClient from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth error:', error.message)
        // Optionally redirect to an error page
      } else {
        // Redirect to homepage or dashboard
        router.replace('/dashboard')
      }
    }

    handleAuth()
  }, [router, supabase])

  return <p>Loading...</p>
}
