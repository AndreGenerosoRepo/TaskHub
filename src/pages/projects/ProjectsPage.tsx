import ProjectCard from "../../components/ProjectCard"
import { useProjects, useCreateProject } from '../../hooks/useProjects'
import { Modal, Button, TextInput, Textarea, Group, Title, SegmentedControl, Loader, Alert } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { useProjectsStore } from '../../store/projectsStore'
import styles from './ProjectsPage.module.css'

function ProjectsPage() {
    const { data: projects, isLoading, isError } = useProjects()
    const [opened, { open, close }] = useDisclosure(false)
    const { mutate: createProject } = useCreateProject()
    const { filter, setFilter } = useProjectsStore()

    const form = useForm({
        initialValues: {
          name: '',
          description: '',
        },
        validate: {
          name: (value) => value.trim().length === 0 ? 'Name is required' : null,
          description: (value) => value.trim().length === 0 ? 'Description is required' : null,
        },
    })

    if (isLoading) return (
        <div className={styles.loading}>
          <Loader />
        </div>
      )
      if (isError) return (
        <Alert color="red" variant="light" mt="md">
          Something went wrong. Please try again later.
        </Alert>
      )

    const filteredProjects = projects?.filter((project) => {
        if (filter === 'all') return true
        return project.status === filter
    }) ?? []

    return (
        <>
            <Group justify="space-between" mb="md">
                <Title order={2} mb="md" c="blue">Projects</Title>
                <Button onClick={open}>New Project</Button>
            </Group>

            <SegmentedControl
                mb="md"
                value={filter}
                onChange={(value) => setFilter(value as 'all' | 'active' | 'archived')}
                data={[
                    { label: 'All', value: 'all' },
                    { label: 'Active', value: 'active' },
                    { label: 'Archived', value: 'archived' },
                ]}
            />

            <Modal opened={opened} onClose={close} title="New Project">
                <TextInput
                    label="Name"
                    placeholder="Project name"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label="Description"
                    placeholder="Project description"
                    mt="sm"
                    {...form.getInputProps('description')}
                />
                <Button mt="md" onClick={() => {
                    if (form.validate().hasErrors) return
                    createProject(form.values)
                    close()
                    form.reset()
                }}>
                    Create Project
                </Button>
            </Modal>

            <div className={styles.grid}>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    )
}

export default ProjectsPage