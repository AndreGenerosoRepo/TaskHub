import type { Project } from "../../types"
import { useLoaderData } from "react-router-dom"


function ProjectDetailPage() {
    const projectDetail = useLoaderData() as Project

    return (
        <div>
            <h1>{projectDetail.name}</h1>
            <p>{projectDetail.description}</p>
        </div>
    )
}

export default ProjectDetailPage