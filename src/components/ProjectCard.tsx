import type { Project } from "../types";
import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { Card, Text, Badge, Group } from '@mantine/core'
import { Button } from '@mantine/core'
import { useUpdateProject, useDeleteProject } from '../hooks/useProjects'


function ProjectCard({ project }: { project: Project }) {
    const { mutate: updateProject } = useUpdateProject()
    const { mutate: deleteProject } = useDeleteProject()

    return (
        <Link to={`/projects/${project.id}`} className={styles.link}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Text fw={500}>{project.name}</Text>
              <Badge color={project.status === 'active' ? 'blue' : 'gray'}>
                {project.status}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              {project.description}
            </Text>
            <Group mt="md">
            <Button
                size="xs"
                variant="outline"
                onClick={(e) => {
                e.preventDefault()
                updateProject({ id: project.id, status: project.status === 'active' ? 'archived' : 'active' })
                }}
            >
                {project.status === 'active' ? 'Archive' : 'Activate'}
            </Button>
            <Button
                size="xs"
                variant="outline"
                color="red"
                onClick={(e) => {
                e.preventDefault()
                deleteProject(project.id)
                }}
            >
                Delete
            </Button>
            </Group>
          </Card>
        </Link>
      )
}

export default ProjectCard;