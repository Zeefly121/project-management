'use client'

import React from 'react'
import { useAppSelector } from '../redux'
import { useGetUsersQuery, User } from '@/state/api'
import Header from '@/components/Header';
import Image from 'next/image';
import DataTable from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

const Users = () => {
    const {data: users, isLoading, isError} = useGetUsersQuery();

    const columns: ColumnDef<User>[] = [
      {
        accessorKey: "username",
        header: ({column}) => {
          return (
            <Button
              variant="ghost"
              className='dark:hover:bg-black'
              onClick={() => column.toggleSorting()}
              >
                User
                <ArrowUpDown className='ml-2 size-4' />
              </Button>
          )
        },
      },
      {
        accessorKey: "profilePictureUrl",
        header: "Profile Picture",
        cell: ({cell, row}) => {
          return (
            <div className="flex h-full w-full items-center">
              <div className='size-9'>
                <Image
                  src={`/${cell.getValue()}`}
                  alt={row.getValue("username")}
                  width={100}
                  height={50}
                  className='h-full rounded-full object-cover'
                />
              </div>
            </div>
          )
        }
      }
    ]

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching users</div>

  return (
    <div className='flex w-full flex-col p-8'>
        <Header name="Users" />
        <div style={{height: 650, width: "50%"}}>
          <DataTable columns={columns} data={users ?? []} />
        </div>
    </div>
  )
}

export default Users