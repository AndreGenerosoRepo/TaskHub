import { useQuery } from '@tanstack/react-query'
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