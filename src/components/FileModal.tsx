import React from 'react'
import { FileType } from '../config/types'
import {RiDownloadCloudFill, RiCloseFill} from 'react-icons/ri'
import { formatDate, getContentTypeHeader, getFileType } from '../lib/utils'
import axios from 'axios'



interface propTypes {
    file: FileType,
    onClose: () => void,
    onDownload: (file: FileType) => void,
}

const FileModal = ({file, onClose, onDownload}: propTypes) => {

    console.log(file.src)

    const fileType = getFileType(file.src)
    const contentType = getContentTypeHeader(fileType!)

    const handleClose = () => {
        onClose()
    }


    const handleDownloadFile = () => {
        onDownload(file)
      };




  return (
    <div className='fixed inset-0 bg-black bg-opacity-20  backdrop-blur-xxs flex justify-center items-center'>
        <div className='bg-white w-1/2 min-h-44 max-h-[90vh]  py-2 rounded-lg '>
            <div className='flex justify-between items-center px-4 border-b py-2 mb-4'>
                
                    <button onClick={handleDownloadFile} 
                    className='rounded-full cursor-pointer flex text-base justify-center 
                    items-center w-8 h-8 outline outline-1 outline-slate-100 text-[#6E7377]'>
                        <RiDownloadCloudFill />
                    </button>
                
                <button className='bg-[#DFE1E2] rounded-md px-4 py-2 text-sm flex text-[#53575A] hover:bg-[#c4c5c6]' onClick={handleClose}>
                    <RiCloseFill className='text-xl'/>
                    Close
                    </button>
            </div>
            
            <div className=' px-4 mb-2'>
                <div className='max-h-[calc(90vh-150px)] rounded-md relative overflow-auto mb-2 bg-[#F2F5F7]'>
                    <img src={file.src} alt={file.name} className='object-fill w-full h-full' />
                </div>
                
                <div className='flex items-center'>

                    <div className='rounded-full h-10 w-10 bg-slate-100 mr-4 relative '>

                    </div>

                    <div>
                        <h6 className='text-sm font-medium text-[#2E3031] mb-0.5'>{file.name}</h6>
                        <p className='text-xs text-[#6F7376]'>{formatDate(file.created_at)}</p>
                    </div>
                </div>
                        
            </div>
            
        </div>
    </div>
  )
}

export default FileModal