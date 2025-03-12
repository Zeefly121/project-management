"use client"

import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    useReactTable,
    Header as HeaderType
  } from "@tanstack/react-table"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';
import { Task } from '@/state/api';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const DataTable = <TData, TValue>({columns, data}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        }
    })

  return (
    <div className='rounded-md border border-slate-300 dark:border-[#2d3135]'>
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row)  => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className='odd:bg-gray-200 even:bg-gray-300 dark:odd:bg-[#1d1f21] dark:even:bg-[#151617]'>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                            No Results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  )
}

type PopoverFilterProps = {
    header: HeaderType<Task, unknown>
}

export const PopoverFilter = ({header}: PopoverFilterProps) => {
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="hover:bg-transparent hover:text-cyan-500 p-2">
                    <Filter className='size-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Input
                    placeholder={`Filter ${header.column.id}`}
                    value={(header.column.getFilterValue() as string) ?? ""}
                    onChange={(event) => header.column.setFilterValue(event.target.value)}
                    />
            </PopoverContent>
        </Popover>
    )
}

export default DataTable