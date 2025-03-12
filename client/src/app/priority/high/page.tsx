import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage'
import { Priority } from '@/state/api'

const High = () => {
  return (
    <ReuseablePriorityPage priority={Priority.High} />
  )
}

export default High