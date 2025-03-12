import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage'
import { Priority } from '@/state/api'

const Low = () => {
  return (
    <ReuseablePriorityPage priority={Priority.Low} />
  )
}

export default Low