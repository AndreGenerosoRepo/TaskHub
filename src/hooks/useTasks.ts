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