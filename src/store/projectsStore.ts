import { create } from 'zustand'

interface ProjectsStore {
  filter: 'all' | 'active' | 'archived'
  setFilter: (filter: 'all' | 'active' | 'archived') => void
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}))