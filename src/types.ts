export interface Project {
    id: string
    name: string
    description: string
    status: 'active' | 'archived'
    createdAt: Date
    updatedAt: Date
}
export interface NewProject {
    name: string
    description: string
}
