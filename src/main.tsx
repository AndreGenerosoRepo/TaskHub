import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { projectsLoader } from './pages/projects/ProjectsLoader'
import { projectDetailLoader } from './pages/projects/ProjectDetailLoader'
import ProjectsPage from './pages/projects/ProjectsPage'
import ProjectDetailPage  from './pages/projects/ProjectDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/projects'),
    errorElement: <div>Page not found</div>,
  },
  {
    path: '/projects',
    Component: ProjectsPage,
    loader: projectsLoader,
  },
  {
    path: '/projects/:id',
    Component: ProjectDetailPage,
    loader: projectDetailLoader,
    errorElement: <div>Project not found</div>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} /> 
    </MantineProvider> 
  </StrictMode>,
)
