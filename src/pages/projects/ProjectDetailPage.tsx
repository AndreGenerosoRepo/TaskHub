import { useParams } from 'react-router-dom'
import { useProject } from '../../hooks/useProjects'

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProject(id!)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading project</div>
  if (!project) return <div>Project not found</div>

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectDetailPage