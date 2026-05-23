import type { Project } from "../types";
import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { Card, Text, Badge, Group, Button, Modal, TextInput, Textarea } from '@mantine/core'
import { useUpdateProject, useDeleteProject, useEditProject } from '../hooks/useProjects'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'

function ProjectCard({ project }: { project: Project }) {
    const { mutate: updateProject } = useUpdateProject()
    const { mutate: deleteProject } = useDeleteProject()
    const { mutate: editProject } = useEditProject()
    const [opened, { open, close }] = useDisclosure(false)

    const form = useForm({
        initialValues: {
            name: project.name,
            description: project.description,
        },
        validate: {
            name: (value) => value.trim().length === 0 ? 'Name is required' : null,
        },
    })

    return (
        <>
            <Modal opened={opened} onClose={close} title="Edit Project">
                <TextInput
                    label="Name"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label="Description"
                    mt="sm"
                    {...form.getInputProps('description')}
                />
                <Button mt="md" onClick={() => {
                    if (form.validate().hasErrors) return
                    editProject({ id: project.id, ...form.values })
                    close()
                }}>
                    Save
                </Button>
            </Modal>

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
                                open()
                            }}
                        >
                            Edit
                        </Button>
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
        </>
    )
}

export default ProjectCard;