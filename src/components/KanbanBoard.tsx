import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import type { Task } from '../types'
import { useUpdateTask, useDeleteTask, useEditTask } from '../hooks/useTasks'
import { Modal, Button, TextInput, Textarea, Select, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'

function KanbanCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  })
  const { mutate: deleteTask } = useDeleteTask()
  const { mutate: editTask } = useEditTask()
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      name: task.name,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
    },
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Task">
        <TextInput label="Name" {...form.getInputProps('name')} />
        <Textarea label="Description" mt="sm" {...form.getInputProps('description')} />
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
          mt="sm"
          valueFormat="YYYY-MM-DD"
          {...form.getInputProps('dueDate')}
        />
        <Button mt="md" onClick={() => {
          if (form.validate().hasErrors) return
          editTask({
            id: task.id,
            name: form.values.name,
            description: form.values.description,
            priority: form.values.priority,
            dueDate: form.values.dueDate ? form.values.dueDate.toISOString().split('T')[0] : '',
          })
          close()
        }}>
          Save
        </Button>
      </Modal>

      <div ref={setNodeRef} style={style}>
        <div {...listeners} {...attributes}>
          <p>{task.name}</p>
          <p>{task.priority}</p>
        </div>
        <Group gap="xs">
          <Button size="xs" variant="outline" onClick={open}>Edit</Button>
          <Button size="xs" variant="outline" color="red" onClick={() => deleteTask(task.id)}>Delete</Button>
        </Group>
      </div>
    </>
  )
}

function KanbanColumn({ title, tasks, status }: {
  title: string
  tasks: Task[]
  status: 'todo' | 'in_progress' | 'done'
}) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div ref={setNodeRef} style={{ minHeight: '200px', padding: '8px', flex: 1 }}>
      <h3>{title}</h3>
      {tasks.map(task => (
        <KanbanCard key={task.id} task={task} />
      ))}
    </div>
  )
}

function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const { mutate: updateTask } = useUpdateTask()

  const columns = [
    { id: 'todo' as const, title: 'To do' },
    { id: 'in_progress' as const, title: 'In progress' },
    { id: 'done' as const, title: 'Done' },
  ]

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const taskId = active.id as string
    const newStatus = over.id as 'todo' | 'in_progress' | 'done'
    updateTask({ id: taskId, status: newStatus })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '16px' }}>
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            status={column.id}
            tasks={tasks.filter(t => t.status === column.id)}
          />
        ))}
      </div>
    </DndContext>
  )
}

export default KanbanBoard