import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { useProjects } from '../../hooks/useProjects'
import type { Task } from '../../types'

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
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
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
    initialState: { pagination: { pageSize: 5 } },
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading tasks</div>

  return (
    <div>
      <h1>Overall Tasks</h1>
      <table>
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
      <div>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  )
}

export default TasksPage