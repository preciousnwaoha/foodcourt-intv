import React, {useState} from 'react'
import { FileType } from '../config/types';
import {RiFolder3Fill} from 'react-icons/ri'

interface propTypes {
    file: FileType
}

const Download = ({file}: propTypes) => {
    const [percentage, setPercentage] = useState(0);
    
    

  return (
    <li className='flex items-center px-4 py-2 w-80 shadow-md rounded mb-2 bg-white'>
        <div className="bg-slate-100 rounded-full mr-4 p-2 text-xl w-9 h-9 text-[#7A8085]">
            <RiFolder3Fill />
        </div>

        <div>
            <h6 className='text-sm font-medium text-[#2E3031] mb-0.5'>{file.name}</h6>
            <p className='text-xs text-[#6F7376]'>Downloading...</p>
        </div>
    </li>
            
  )
}

export default Download