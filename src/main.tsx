import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import ProjectsPage from './pages/projects/ProjectsPage'
import ProjectDetailPage  from './pages/projects/ProjectDetailPage'
import Layout from './components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TasksPage from './pages/tasks/TasksPage'


const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <div>Page not found</div>,
    children: [
      {
        index: true,
        loader: () => redirect('/projects'),
      },
      {
        path: 'projects',
        Component: ProjectsPage,
      },
      {
        path: 'projects/:id',
        Component: ProjectDetailPage,
        errorElement: <div>Project not found</div>,
      },
      {
        path: 'tasks',
        Component: TasksPage,
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)