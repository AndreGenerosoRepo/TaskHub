import { useState } from "react"
import type { Project, NewProject } from "../types"
import ProjectCard from "../components/ProjectCard"


const initialProjects: Project[] = [
    {
        id: "1",
        name: "Company Website",
        description: "Redesign the company website to improve the user experience",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Mobile App",
        description: "Mobile app for Android and iOS",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Internal Dashboard",
        description: "Dashboard for the internal team to manage the projects",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [newProject, setNewProject] = useState<NewProject>({
        name: "",
        description: ""
    })

    function addProject() {
        if (!newProject.name.trim() || !newProject.description.trim()) {
            return
        }
        setProjects([...projects, {
            id: crypto.randomUUID(),
            name: newProject.name,
            description: newProject.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        }])
        setNewProject({
            name: "",
            description: ""
        })
    }
    return (
        <div>
                <h1>Projects</h1>
                <input
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Project name"
                />
                <input
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Project description"
                />
                <button onClick={addProject}>Add Project</button>
                <ul>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>
        </div>
  );
}

export default ProjectsPage;
