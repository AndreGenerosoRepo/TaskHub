import type { Project } from "../../types"
import ProjectCard from "../../components/ProjectCard"
import { useLoaderData } from "react-router-dom"

function ProjectsPage() {
    const projects = useLoaderData() as Project[]

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </ul>
        </div>
    )
}

export default ProjectsPage