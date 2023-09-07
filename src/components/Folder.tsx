import React from 'react'
import { FileType } from '../config/types'
import {RiFolder3Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom'

interface propTypes  {
  folder: FileType
}

const Folder = ({folder}: propTypes) => {

  

  return (
    <Link to={`/${folder.id}` }>
     <div className='rounded-md border flex px-4 py-2 items-center cursor-pointer' 
     >
      <div className="bg-slate-100 rounded-full mr-4 p-2 text-xl w-9 h-9 text-[#7A8085]">
        <RiFolder3Fill />
      </div>
      <div>
        <h6 className='text-sm font-medium text-[#2E3031] mb-0.5'>{folder.name}</h6>
        <p className='text-xs text-[#6F7376]'>size</p>
      </div>
      </div>
    </Link>
   
  )
}

export default Folder