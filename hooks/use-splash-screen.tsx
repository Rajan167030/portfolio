"use client"

import { create } from "zustand"

interface SplashScreenState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  progress: number
  setProgress: (progress: number) => void
}

export const useSplashScreen = create<SplashScreenState>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
}))
