import type { Project } from "../../types"

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

export function projectsLoader() {
    return initialProjects
  }