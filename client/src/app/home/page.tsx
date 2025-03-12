'use client'

import { Priority, Project, Status, Task, useGetProjectsQuery, useGetTasksQuery } from '@/state/api';
import React from 'react'
import { useAppSelector } from '../redux';
import Header from '@/components/Header';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts'
import DataTable, { PopoverFilter } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const {data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading...</div>
  if (tasksError || !tasks || !projects) return <div>Error fetching data.</div>

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const {priority} = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    }, {},
  )

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status as Status] = (acc[status as Status] || 0) + 1;
      return acc;
    }, {},
  )

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

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
        accessorKey: "priority",
        header: ({column, header}) => {
            return (
                <div className='flex items-center'>
                    <div>Priority</div>
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

  const chartColors = isDarkMode
    ? {
      bar: "#8884d8",
      barGrid: "#303030",
      pieFill: "#4a90e2",
      text: "#ffffff"
    } : {
      bar: "#8884d8",
      barGrid: "#e0e0e0",
      pieFill: "#82ca9d",
      text: "#000000"
    }

  return (
    <div className='container h-full w-[100%] bg-gray-100 bg-transparent p-8'>
      <Header name="Project Management Dashboard" /> 
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Task Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.barGrid}
                  />
                  <XAxis dataKey="name" stroke={chartColors.text} />
                  <YAxis stroke={chartColors.text} />
                  <Tooltip
                    contentStyle={{
                      width: "min-content",
                      height: "min-content",
                    }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill={chartColors.bar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Task Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie dataKey="count" data={projectStatus} fill='#82ca9d' label>
                  {projectStatus.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary col-span-2">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Your Tasks
            </h3>
            <div style={{height: 400, width: "100%"}}>
              <DataTable columns={columns} data={tasks ?? []} />
            </div>
          </div>
      </div> 
    </div>
  )
}

export default HomePage