import { create } from 'zustand';
import { User } from '@supabase/supabase-js'; // Import Supabase User type

interface UserState {
  user: User | null;
  isLoading: boolean; // To know if we are still fetching the initial user
  isAuthenticated: boolean; // Derived state for convenience
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true, // Start with loading true
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));