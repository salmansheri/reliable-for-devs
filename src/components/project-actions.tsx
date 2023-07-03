'use client'; 

import { DeleteIcon, Edit } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const ProjectActions = ({
    projectId
}: {
    projectId: string, 
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
        <Link href={`/edit-project/${projectId}`} className="">
            <Edit className="text-green-500" />

        </Link>
        <Button  variant="ghost">
            <DeleteIcon className="text-red-500" />
        </Button>
    </div>
  )
}

export default ProjectActions