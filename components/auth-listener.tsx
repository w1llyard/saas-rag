"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { createClient } from "@/lib/supabase/client";

export default function AuthListener() {
  const supabase = createClient();
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    let mounted = true;

    async function getInitialUser() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (mounted) {
        if (user) {
          setUser(user);
        } else {
          clearUser(); // Ensure isLoading is set to false even if no user
        }
      }
    }

    getInitialUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          console.log("Auth event:", event, session);
          if (session) {
            setUser(session.user);
          } else {
            clearUser();
          }
        }
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, setUser, clearUser, setLoading]); // Add supabase as a dependency if its creation isn't memoized outside

  return null;
}
