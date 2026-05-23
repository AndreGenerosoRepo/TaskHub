import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import type { Task } from '../types'
import { useUpdateTask, useDeleteTask, useEditTask } from '../hooks/useTasks'
import { Badge, Button, Group, Text, Modal, TextInput, Textarea, Select } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import styles from './KanbanBoard.module.css'
import dayjs from 'dayjs'

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

  const priorityClass = task.priority === 'high' ? styles.cardHigh : task.priority === 'medium' ? styles.cardMedium : styles.cardLow

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

      <div
        ref={setNodeRef}
        style={style}
        className={`${styles.card} ${priorityClass}`}
      >
        <div {...listeners} {...attributes} style={{ cursor: 'grab' }}>
        <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{task.name}</div>
            <span className={styles.cardCreatedAt}>Created at: {dayjs(task.createdAt).format('DD MMM YY')}</span>
        </div>
          {task.description && (
            <Text size="xs" c="dimmed" mb="xs">{task.description}</Text>
          )}
          <div className={styles.cardMeta}>
            <Badge
              size="xs"
              color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}
            >
              {task.priority}
            </Badge>
            <Text className={styles.cardDate}>Due at: {dayjs(task.dueDate).format('DD MMM YYYY')}</Text>
          </div>
        </div>
        <Group className={styles.cardActions} gap="xs">
          <Button size="xs" variant="light" onClick={open}>Edit</Button>
          <Button size="xs" variant="light" color="red" onClick={() => deleteTask(task.id)}>Delete</Button>
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
    <div ref={setNodeRef} className={styles.column}>
      <div className={styles.columnHeader}>
        <span className={styles.columnTitle}>{title}</span>
        <span className={styles.columnCount}>{tasks.length}</span>
      </div>
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
      <div className={styles.board}>
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