'use client'

import React from 'react'
import { useAppSelector } from '../redux'
import { Team, useGetTeamsQuery } from '@/state/api'
import Header from '@/components/Header';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/DataTable';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Teams = () => {
    const {data: teams, isLoading, isError} = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const columns: ColumnDef<Team>[] = [
      {
        accessorKey: "id",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='dark:hover:bg-black'
              onClick={() => column.toggleSorting()}
              >
                Team ID
                <ArrowUpDown className='ml-2 size-4' />
              </Button>
          )
        },
      },
      {
        accessorKey: "teamName",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='dark:hover:bg-black'
              onClick={() => column.toggleSorting()}
              >
                Team Name
                <ArrowUpDown className='ml-2 size-4' />
              </Button>
          )
        },
      },
      {
        accessorKey: "productOwnerUsername",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='dark:hover:bg-black'
              onClick={() => column.toggleSorting()}
              >
                Product Owner
                <ArrowUpDown className='ml-2 size-4' />
              </Button>
          )
        },
      },
      {
        accessorKey: "projectManagerUsername",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='dark:hover:bg-black'
              onClick={() => column.toggleSorting()}
              >
                Product Manager
                <ArrowUpDown className='ml-2 size-4' />
              </Button>
          )
        },
      },
    ]

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching teams</div>

  return (
    
      <div className='flex w-full flex-col p-8'>
          <Header name="Teams" />
          <div>
            <DataTable columns={columns} data={teams ?? []} />
          </div>
      </div>
    
  )
}

export default Teams