import React from 'react'
import { FileType } from '../config/types'
import {RiDownloadCloudFill, RiCloseFill} from 'react-icons/ri'
import { formatDate, getContentTypeHeader, getFileType } from '../lib/utils'
import axios from 'axios'
import {BiSolidFileImage} from 'react-icons/bi'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'



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


const downloadD = async () => {
  try {
    
    // Use the cors-anywhere proxy to bypass CORS restrictions
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const proxiedUrl = `${proxyUrl}${file.src}`;
    
    // Fetch the proxied PDF file
    const response = await axios.get(proxiedUrl, {
      responseType: 'blob', // Set the response type to 'blob' for binary data
    });

    if (response.status === 200) {
      // Create a downloadable link for the PDF
      const blob = new Blob([response.data], { type: contentType! });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Example-file.pdf';
      a.click();
      window.URL.revokeObjectURL(url); // Release the object URL
    } else {
      console.error('Failed to fetch thefile.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const downloadEmployeeData = async () => {
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

        await fetch(corsProxyUrl + file.src)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'Example-PDF-file.' + fileType;
                    a.click();
                });
                //window.location.href = response.url;
        });
}


  return (
    <div className='fixed inset-0 bg-black bg-opacity-20  backdrop-blur-xxs flex justify-center items-center'>
        <div className='bg-white w-1/2 min-h-44  py-2 rounded-lg '>
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
                <div className='h-60 rounded-md relative overflow-hidden mb-2 bg-[#F2F5F7]'>
                    <img src={file.src} alt={file.name} className='object-fill' />
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