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

export interface Task {
    id: string
    projectId: string
    name: string
    description: string
    status: 'todo' | 'in_progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    dueDate: string
}
