import { create } from "zustand"

interface SearchState {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useChallengeSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
