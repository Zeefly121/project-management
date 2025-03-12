import { useAppSelector } from '@/app/redux';
import DataTable, {PopoverFilter} from '@/components/DataTable';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Task, useGetTasksQuery } from '@/state/api';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react'


type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TableView = ({id, setIsModalNewTaskOpen}: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({projectId: Number(id)})

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

    if (isLoading) return <div>Loading</div>;
    if (error) return <div>An error occured while fetching tasks</div>
    

  return (
    <div className='h-[540px] w-full px-4 pb-8 xl:px-6'>
        <div className="pt-5">
            <Header name="Table"buttonComponent={
            <button
            className='flex items-center bg-blue-primary rounded px-3 py-2 text-white hover:bg-blue-600'
            onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText 
          />
        </div>
        <DataTable columns={columns} data={tasks ?? []} />
    </div>
  )
}

export default TableView