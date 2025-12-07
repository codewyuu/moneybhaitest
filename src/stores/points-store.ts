import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const BHAI_POINTS = 'bhai_points'
const DEFAULT_POINTS = 100

type PointsState = {
  points: number
  spend: (amount: number) => boolean
  earn: (amount: number) => void
  reset: (next?: number) => void
}

export const usePointsStore = create<PointsState>()((set, get) => {
  const cookieState = getCookie(BHAI_POINTS)
  const initPoints = cookieState ? Number(cookieState) : DEFAULT_POINTS

  const persist = (value: number) => {
    setCookie(BHAI_POINTS, String(value))
  }

  return {
    points: Number.isFinite(initPoints) ? initPoints : DEFAULT_POINTS,
    spend: (amount: number) => {
      const current = get().points
      if (amount <= 0) return true
      if (current < amount) return false
      const next = current - amount
      persist(next)
      set({ points: next })
      return true
    },
    earn: (amount: number) => {
      const current = get().points
      const next = current + Math.max(0, amount)
      persist(next)
      set({ points: next })
    },
    reset: (next?: number) => {
      if (typeof next === 'number') {
        persist(next)
        set({ points: next })
        return
      }
      removeCookie(BHAI_POINTS)
      set({ points: DEFAULT_POINTS })
    },
  }
})

