import { useParams } from 'react-router-dom'
import { useProject } from '../../hooks/useProjects'
import { useTasksByProject, useCreateTask } from '../../hooks/useTasks'
import type { Task } from '../../types'
import { Modal, Button, TextInput, Textarea, Select, Group, Text, Badge, Stack, Title, Loader, Alert } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import KanbanBoard from '../../components/KanbanBoard'
import styles from './ProjectDetailPage.module.css'


function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProject(id!)
  const { data: tasks } = useTasksByProject(id!)
  const [opened, { open, close }] = useDisclosure(false)

  const { mutate: createTask } = useCreateTask()

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      status: 'todo' as Task['status'],
      priority: 'medium' as Task['priority'],
      dueDate: null as Date | null,
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      dueDate: (value) => !value ? 'Due date is required' : null,
    },
  })

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
      <Loader />
    </div>
  )
  if (isError) return (
    <Alert color="red" variant="light" mt="md">
      Project not found. The project you are looking for does not exist or has been deleted.
    </Alert>
  )

  return (
    <div>
      <Group justify="space-between" mb="xs">
        <Stack gap="xs">
          <Group gap="sm" align="center">
          <Title order={1} className={styles.title}>{project.name}</Title>
          <div className={styles.badgeWrapper}>
            <Badge color={project.status === 'active' ? 'blue' : 'gray'} size="sm">
              {project.status}
            </Badge>
          </div>
          </Group>
          <Text size="sm" c="dimmed">{project.description}</Text>
        </Stack>
        <Button onClick={open}>New Task</Button>
      </Group>

      <Modal opened={opened} onClose={close} title="New Task">
        <TextInput label="Name" placeholder="Task name" {...form.getInputProps('name')} />
        <Textarea label="Description" placeholder="Task description" mt="sm" {...form.getInputProps('description')} />
        <Select
          label="Status"
          mt="sm"
          data={[
            { value: 'todo', label: 'To do' },
            { value: 'in_progress', label: 'In progress' },
            { value: 'done', label: 'Done' },
          ]}
          {...form.getInputProps('status')}
        />
        <Select
          label="Priority"
          mt="sm"
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          {...form.getInputProps('priority')}
        />
        <DateInput
          label="Due Date"
          placeholder="Pick a date"
          mt="sm"
          valueFormat="YYYY-MM-DD"
          {...form.getInputProps('dueDate')}
        />
        <Button mt="md" onClick={() => {
          if (form.validate().hasErrors) return
          createTask({
            ...form.values,
            projectId: id!,
            dueDate: form.values.dueDate ? form.values.dueDate.toISOString().split('T')[0] : '',
          })
          close()
          form.reset()
        }}>
          Create Task
        </Button>
      </Modal>

      <h2>Tasks</h2>
      <KanbanBoard tasks={tasks ?? []} />
    </div>
  )
}

export default ProjectDetailPage