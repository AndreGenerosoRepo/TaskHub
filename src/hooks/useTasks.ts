import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task } from '../types'

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('http://localhost:3000/tasks')
  return response.json()
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })
}

export function useTasksByProject(projectId: string) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks')
      const tasks: Task[] = await response.json()
      return tasks.filter(task => task.projectId === projectId)
    },
  })
}

async function createTask(task: { projectId: string; name: string; description: string; status: 'todo' | 'in_progress' | 'done'; priority: 'low' | 'medium' | 'high'; dueDate: string }) {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  return response.json()
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

async function updateTask(task: { id: string; status: 'todo' | 'in_progress' | 'done' }) {
  const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: task.status }),
  })
  return response.json()
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

async function deleteTask(id: string) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}