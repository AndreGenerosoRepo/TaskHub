import { useParams } from 'react-router-dom'
import { useProject } from '../../hooks/useProjects'
import { useTasksByProject, useCreateTask, useUpdateTask, useDeleteTask } from '../../hooks/useTasks'
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import type { Task } from '../../types'
import { Modal, Button, TextInput, Textarea, Select, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import KanbanBoard from '../../components/KanbanBoard'


function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProject(id!)
  const { data: tasks } = useTasksByProject(id!)
  const [sorting, setSorting] = useState<SortingState>([])
  const [opened, { open, close }] = useDisclosure(false)

  const { mutate: createTask } = useCreateTask()
  const { mutate: updateTask } = useUpdateTask()
  const { mutate: deleteTask } = useDeleteTask()

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      status: 'todo' as 'todo' | 'in_progress' | 'done',
      priority: 'medium' as 'low' | 'medium' | 'high',
      dueDate: '',
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      dueDate: (value) => value.trim().length === 0 ? 'Due date is required' : null,
    },
  })

  const columns: ColumnDef<Task>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'priority', header: 'Priority' },
    { accessorKey: 'dueDate', header: 'Due Date' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Group>
          <Button size="xs" variant="outline" onClick={() => updateTask({ id: row.original.id, status: row.original.status === 'todo' ? 'in_progress' : row.original.status === 'in_progress' ? 'done' : 'todo' })}>
            Next Status
          </Button>
          <Button size="xs" variant="outline" color="red" onClick={() => deleteTask(row.original.id)}>
            Delete
          </Button>
        </Group>
      )
    }
  ]

  const table = useReactTable({
    data: tasks ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading project</div>
  if (!project) return <div>Project not found</div>

  return (
    <div>
      <Group justify="space-between" mb="md">
        <h1>{project.name}</h1>
        <Button onClick={open}>New Task</Button>
      </Group>
      <p>{project.description}</p>

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
          createTask({ ...form.values, projectId: id! })
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