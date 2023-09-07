import { contentTypeMap } from "../config/site";
import { FileType } from "../config/types";
import { matchSorter } from "match-sorter";

export function getFileType(fileName: string): string | null {
    // Split the file name by '?' to handle query parameters
    const fileNameParts = fileName.split('?');
    const fileNameWithoutQueryParams = fileNameParts[0]; // Get the part before the '?'
  
    const lastDotIndex = fileNameWithoutQueryParams.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return null; // No file extension found
    }
  
    // Get the file extension (excluding the dot)
    const fileType = fileNameWithoutQueryParams.slice(lastDotIndex + 1).toLowerCase();
    return fileType;
  }

  
  
  export function getContentTypeHeader(fileType: string): string | null {
    
    const normalizedFileType = fileType.toLowerCase();
    return contentTypeMap[normalizedFileType] || null;
  }
  

  export function ApplySortBy(by:string, files: FileType[]): FileType[] {

    if (by === 'time') {
      return files.sort((a, b) => {
        const aTime = new Date(a.created_at).getTime()
        const bTime = new Date(b.created_at).getTime()
        return bTime - aTime
        
      })
    } 
    if (by === 'name') {
      return files.sort((a, b) => {
        const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
        const nameB = b.name.toLowerCase();
        
        if (nameA < nameB) {
            return -1; // a should come before b in the sorted order
        }
        
        if (nameA > nameB) {
            return 1; // a should come after b in the sorted order
        }
        
        return 0; // names are equal, no change in order
    });
    }
    return files
  }


  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();
  
    if (timeDifference < 60000) {
      // Less than a minute ago
      return 'Added just now';
    } else if (timeDifference < 3600000) {
      // Less than an hour ago
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `Added ${minutesAgo} ${minutesAgo === 1 ? 'min' : 'mins'} ago`;
    } else {
      // More than an hour ago
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      return `Added on ${day}th ${month}, ${year}`;
    }
  };



  
  
  

// Utility function to find a folder by ID
export const findFolderById = (folder: FileType, id: string): FileType | undefined => {
  if (folder.id === id) {
    return folder;
  }
  if (folder.contents) {
    for (const nestedFolder of folder.contents) {
      const result = findFolderById(nestedFolder, id);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

export const findFolder = (files: FileType[], id: string ) => {
  for (const file of files) {
    const result = findFolderById(file, id)
    if (result) {
      return result
    }
  }

  return undefined
}


export function getFileTypeColor(fileType: string): string {
  const fileTypeRegex = /\.(doc|docx|pdf|jpg|jpeg|png|gif|xls|xlsx|js|ts|html|css|ppt|pptx)$/i;

  if (fileType.match(fileTypeRegex)) {
    const fileTypeLower = fileType.toLowerCase();
    switch (true) {
      case /doc|docx/.test(fileTypeLower):
        return 'blue'; // Color for document files
      case /pdf/.test(fileTypeLower):
        return 'red'; // Color for PDF files
      case /jpg|jpeg|png|gif/.test(fileTypeLower):
        return 'green'; // Color for image files
      case /xls|xlsx/.test(fileTypeLower):
        return 'orange'; // Color for Excel files
      case /js|ts|html|css/.test(fileTypeLower):
        return 'purple'; // Color for code files
      case /ppt|pptx/.test(fileTypeLower):
        return 'pink'; // Color for PowerPoint files
      default:
        return 'black'; // Default color for other file types
    }
  } else {
    return 'gray'; // Default color for unrecognized file types
  }
}
