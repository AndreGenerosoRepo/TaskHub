import ProjectCard from "../../components/ProjectCard"
import { useProjects, useCreateProject } from '../../hooks/useProjects'
import { Modal, Button, TextInput, Textarea, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'

function ProjectsPage() {
    const { data: projects, isLoading, isError } = useProjects()
    const [opened, { open, close }] = useDisclosure(false)

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

      const { mutate: createProject } = useCreateProject()


      if (isLoading) return <div>Loading...</div>
      if (isError) return <div>Error loading projects</div>

      return (
        <>
          <Group justify="space-between" mb="md">
            <h1>Projects</h1>
            <Button onClick={open}>New Project</Button>
          </Group>
      
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
      
          <ul>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        </>
      )
}

export default ProjectsPage