import type { LoaderFunctionArgs } from 'react-router-dom'
import type { Project } from '../../types'

const projects: Project[] = [
  {
    id: '1',
    name: 'Company Website',
    description: 'Redesign the company website to improve the user experience',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Mobile app for Android and iOS',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Internal Dashboard',
    description: 'Dashboard for the internal team to manage the projects',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function projectDetailLoader({ params }: LoaderFunctionArgs) {
  const id = params.id
  if (!id) throw new Response('Not found', { status: 404 })

  const project = projects.find(p => p.id === id)
  if (!project) throw new Response('Not found', { status: 404 })
  return project
}