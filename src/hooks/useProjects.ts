import { useQuery } from '@tanstack/react-query'
import type { Project } from '../types'

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('http://localhost:3000/projects')
  return response.json()
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })
}