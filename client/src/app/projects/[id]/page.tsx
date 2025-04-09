'use client'

import React, { useEffect, useState } from 'react'
import ProjectHeader from "@/app/projects/ProjectHeader"
import Board from '../BoardView'
import List from '../ListView'
import Timeline from "../TimelineView"
import Table from "../TableView"
import { useParams } from 'next/navigation'
import ModalNewTask from '@/components/ModalNewTask'

const Project = () => {
    const [activeTab, setActiveTab] = useState("Board")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)

    
    const routeId = useParams<{id: string}>()

    const projectId = routeId.id
    

  return (
    <div>
        <ModalNewTask
            isOpen={isModalNewTaskOpen}
            onClose={() => setIsModalNewTaskOpen(false)}
            id={Number(projectId)}
            />
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Board" && (
            <Board id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        {activeTab === "List" && (
            <List id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        {activeTab === "Timeline" && (
            <Timeline id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        {activeTab === "Table" && (
            <Table id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
    </div>
  )
}

export default Project