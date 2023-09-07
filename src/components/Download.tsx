import React from 'react'
import { FileType } from '../config/types';
import {RiCloseFill, RiFolder3Fill} from 'react-icons/ri'

interface propTypes {
    file: FileType,
    onRemove: (file: FileType) => void
}

const Download = ({file, onRemove}: propTypes) => {
    // const [percentage, setPercentage] = useState(0);
    

    const handleRemoveDownload = () => {
        onRemove(file)
    }
    

  return (
    <li className='flex items-center px-4 py-2 w-80 shadow-md rounded mb-2 bg-white relative'>
        <div className="bg-slate-100 rounded-full mr-4 p-2 text-xl w-9 h-9 text-[#7A8085]">
            <RiFolder3Fill />
        </div>


        <div>
            <h6 className='text-sm font-medium text-[#2E3031] mb-0.5'>{file.name}</h6>
            <p className='text-xs text-[#6F7376]'>Downloading...</p>
        </div>

        <div className='absolute rounded-full bg-[#7A8085] text-sm text-white cursor-pointer top-2 right-2 p-0.5' 
        onClick={handleRemoveDownload}> 
        <RiCloseFill />
        </div>
    </li>
            
  )
}

export default Download