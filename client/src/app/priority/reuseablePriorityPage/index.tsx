'use client'

import { useAppSelector } from '@/app/redux'
import DataTable, { PopoverFilter } from '@/components/DataTable'
import Header from '@/components/Header'
import ModalNewTask from '@/components/ModalNewTask'
import TaskCard from '@/components/TaskCard'
import { Button } from '@/components/ui/button'
import { Priority, Task, useGetTasksByUserQuery } from '@/state/api'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    priority: Priority
}

const ReuseablePriorityPage = ({priority}: Props) => {
    const [view, setView] = useState("list")
    const [isModalNewTaskOpen, setIsNewModalNewTaskOpen] = useState(false)

    const userId = 1
    const {data: tasks, isLoading, isError: isTasksError} = useGetTasksByUserQuery(userId || 0, {
        skip: userId === null
    })

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    const filteredTasks = tasks?.filter((task: Task) => task.priority === priority)

    const columns: ColumnDef<Task>[] = [
      {
          accessorKey: "title",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Title</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                          <PopoverFilter header={header}/>
                  </div>
              )
          },
      },
      {
          accessorKey: "description",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Description</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
      },
      {
          accessorKey: "status",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Status</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
      },
      {
          accessorKey: "tags",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Tags</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
      },
      {
          accessorKey: "startDate",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Start Date</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
          cell: ({cell}) => {
              const value = cell.getValue();
              const dateValue = (typeof value === 'string' || typeof value === 'number') ? new Date(value) : null
              return (
                  <div>{dateValue ? format(dateValue, "P"): "Invalid Date"}</div>
              )
          }
      },
      {
          accessorKey: "dueDate",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Due Date</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
          cell: ({cell}) => {
              const value = cell.getValue();
              const dateValue = (typeof value === 'string' || typeof value === 'number') ? new Date(value) : null
              return (
                  <div>{dateValue ? format(dateValue, "P"): "Invalid Date"}</div>
              )
          }
      },
      {
          accessorKey: "author",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Author</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
          cell: ({cell}) => {
              const author = cell.getValue() as Task['author'];
              return(
                  <div>{author?.username || ""}</div>
              )
          },
          filterFn: (row, columnId, filterValue) => {
              const value = row.getValue(columnId) as {username: string};
              return value?.username?.toLowerCase().includes(filterValue.toLowerCase());
          }
      },
      {
          accessorKey: "assignee",
          header: ({column, header}) => {
              return (
                  <div className='flex items-center'>
                      <div>Assignee</div>
                      <Button
                          variant="ghost"
                          className='group p-2 hover:bg-transparent'
                          onClick={() => column.toggleSorting()}
                          >
                          <ArrowUpDown className='size-4 group-hover:text-cyan-500' />
                      </Button>
                      <PopoverFilter header={header}/>
                  </div>
              )
          },
          cell: ({cell}) => {
              const assignee = cell.getValue() as Task['assignee'];
              return(
                  <div>{assignee?.username || ""}</div>
              )
          },
          filterFn: (row, columnId, filterValue) => {
              const value = row.getValue(columnId) as {username: string};

              if (!value) {
                  return false;
              }

              return value?.username?.toLowerCase().includes(filterValue.toLowerCase());
          }
      },
  ]

    if (isTasksError || !tasks) return <div>Error fetching tasks.</div>

  return (
    <div className='m-5 p-4'>
      <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsNewModalNewTaskOpen(false)} />
      <Header name="Priority Page" buttonComponent={
        <button 
          className='mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => setIsNewModalNewTaskOpen(true)}
        >
          Add Task
        </button>
      } />
      <div className='mb-4 flex justify-start'>
        <button className={`px-4 py-2 ${
          view === "list" ? "bg-gray-300" : "bg-white"
        } rounded-l`}
        onClick={() => setView("list")}
        >
          List
        </button>
        <button className={`px-4 py-2 ${
          view === "table" ? "bg-gray-300" : "bg-white"
        } rounded-l`}
        onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (<div>Loading tasks...</div>) : view === "list" ? (
        <div className='grid grid-cols-1 gap-4'>
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" && filteredTasks && (
          <div className='w-full'>
            <DataTable columns={columns} data={filteredTasks ?? []} />
          </div>
        )
      )}
    </div>
  )
}

export default ReuseablePriorityPage