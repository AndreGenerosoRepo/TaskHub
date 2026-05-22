import type { Project } from "../types";
import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { Card, Text, Badge, Group } from '@mantine/core'

function ProjectCard({ project }: { project: Project }) {
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
          </Card>
        </Link>
      )
}

export default ProjectCard;