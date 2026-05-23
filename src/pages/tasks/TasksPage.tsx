import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { useProjects } from '../../hooks/useProjects'
import type { Task } from '../../types'
import { Badge, Button, Title, Alert, Loader } from '@mantine/core'
import styles from './TasksPage.module.css'

function TasksPage() {
  const { data: projects } = useProjects()
  const { data: tasks, isLoading, isError } = useTasks()
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'projectId',
      header: 'Project',
      cell: ({ row }) => {
        const project = projects?.find(p => p.id === row.original.projectId)
        return project?.name ?? 'Unknown'
      }
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const color = status === 'done' ? 'green' : status === 'in_progress' ? 'blue' : 'gray'
        const label = status === 'in_progress' ? 'In Progress' : status === 'done' ? 'Done' : 'To Do'
        return <Badge color={color} size="sm">{label}</Badge>
      }
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.original.priority
        const color = priority === 'high' ? 'red' : priority === 'medium' ? 'yellow' : 'green'
        return <Badge color={color} size="sm">{priority}</Badge>
      },
      sortingFn: (rowA, rowB) => {
        const order = { high: 0, medium: 1, low: 2 }
        return order[rowA.original.priority] - order[rowB.original.priority]
      }
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
    },
  ]

  const table = useReactTable({
    data: tasks ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
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

  return (
    <div>
      <Title order={2} mb="sm">Overall Tasks</Title>
      <Alert color="blue" variant="light" mb="md">
        This is a read-only view of all tasks across all projects. To manage tasks, go to Projects and click on the project you want to edit.
      </Alert>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Button size="xs" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span className={styles.pageInfo}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button size="xs" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default TasksPage