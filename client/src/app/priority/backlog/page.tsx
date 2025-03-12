import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage'
import { Priority } from '@/state/api'

const Backlog = () => {
  return (
    <ReuseablePriorityPage priority={Priority.Backlog} />
  )
}

export default Backlog