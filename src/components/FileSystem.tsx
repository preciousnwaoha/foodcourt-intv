import React, { useState, useContext} from 'react';
import Search from './Search';
import Sort from './Sort';
import { FileType } from '../config/types';
import Folder from './Folder';
import File from './File';
import FileModal from './FileModal';
import { AppContext } from '../context/app-context';
import { ApplySortBy, findFolder,  getFileType } from '../lib/utils';
import Download from './Download';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { matchSorter } from 'match-sorter';

const FileSystem = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const appCtx = useContext(AppContext)

  
  console.log({id})
  

   // Get a specific query parameter
   const searchQuery = searchParams.get('search');
   const sortBy = searchParams.get('sort-by');

  const { files, } = appCtx

  const [selectedFile, setSelectedFile] = useState<FileType | null >(null)
  const [downloadingFiles, setDownloadingFiles] = useState<FileType[]>([])

    const handleSelectFile = (file:FileType) => {
        setSelectedFile(file)
    }

    const handleDeSelectFile = () => {
        setSelectedFile(null)
    }


    const handleDownloadFile = async (file: FileType) => {
    

    const fileType = getFileType(file.src)
    // const contentType = getContentTypeHeader(fileType!)

    await fetch(file.src)
    .then(response => {
      setDownloadingFiles(prev => [...prev, file])
      return response.blob()
    })
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.download =  'Example-PDF-file.' + fileType;

      document.body.appendChild(link);

      link.click();

      link.parentNode!.removeChild(link);
    });

    }

    

  const folderFromId = findFolder(files, id!)

  const folderPageNotFound = id && !!folderFromId === false
  

  const folderPageFound = id && !!folderFromId

  
  if (folderPageNotFound) {
    return <div>Not found</div>
  }

  
  
  const filesAfterFolderSelection = folderPageFound ? folderFromId?.contents : files

  console.log({filesAfterFolderSelection})

  const inViewFiles = !!searchQuery ? matchSorter(filesAfterFolderSelection!, searchQuery, {keys: ['name']}) : filesAfterFolderSelection

  const folders = ApplySortBy(sortBy || "", inViewFiles.filter(file => file.type === "folder") )
  const realFiles = ApplySortBy(sortBy || "", inViewFiles.filter(file => file.type === "file"))

  // const canGoBack = folderStructure.length > 0

  const contentIsEmpty = realFiles.length === 0 && folders.length === 0


  

  
  
  return (
   
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 py-16">
      <header className="">
        {folderPageFound && 
        <div className='flex items-center mb-4'>
            <Link to="/" ><div className='rounded-md px-4 py-0.5 bg-slate-100 hover:bg-slate-200 mr-4'>Home</div></Link>
            <div>{folderFromId!.name}</div>
        </div>}
     
        <div className="flex justify-between items-center mb-8 ">
        <Sort />
        
        <Search />
        </div>
       
      </header>
      <main>
        <div>
          {contentIsEmpty && <div className='flex items-center justify-center'>
            <p>No Files </p>
          </div>}


          { (folders.length > 0) && <div className="mb-8">
            <h4 className='mb-2 font-semibold text-xl'>Folders</h4>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {folders.map((folder, index) => {
              // console.log(folder)
              return <Folder key={index} folder={folder}/>
            })}
            </ul>
          </div>}


          {(realFiles.length > 0) && <div className="mb-8">
            <h4 className='mb-2 font-semibold text-xl'>Files</h4>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {realFiles.map((file, index) => {
              return <File key={index} file={file} 
              onSelect={handleSelectFile} 
              onDeSelect={handleDeSelectFile} />
            })}
            </ul>
          </div>}
        </div>
      </main>


      {selectedFile && <FileModal file={selectedFile} onClose={handleDeSelectFile} 
      onDownload={handleDownloadFile} />}
      

      <div className='fixed inline-block top-2 right-2 max-h-[80vh] overflow-auto p-2'>
        <ul>
            {downloadingFiles.map((file, index) => {
                return <Download key={index} file={file} />
            })}
        </ul>
      </div>
     
    </div>
  );
}

export default FileSystem;
