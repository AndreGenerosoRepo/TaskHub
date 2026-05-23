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

async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`http://localhost:3000/projects/${id}`)
  if (!response.ok) throw new Error('Project not found')
  const data = await response.json()
  if (!data || !data.id) throw new Error('Project not found')
  return data
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProject(id),
  })
}

async function createProject(project: { name: string; description: string }) {
  const response = await fetch('http://localhost:3000/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...project,
      status: 'active',
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

async function updateProject(project: { id: string; status: 'active' | 'archived' }) {
  const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: project.status }),
  })
  return response.json()
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

async function deleteProject(id: string) {
  await fetch(`http://localhost:3000/projects/${id}`, {
    method: 'DELETE',
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

async function editProject(project: { id: string; name: string; description: string }) {
  const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: project.name, description: project.description }),
  })
  return response.json()
}

export function useEditProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}