import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

async function createProject(project: { name: string; description: string }) {
  const response = await fetch('http://localhost:3000/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  })
  return response.json()
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}