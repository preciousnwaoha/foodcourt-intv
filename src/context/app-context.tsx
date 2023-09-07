import React, {useState, useContext, createContext} from 'react'
import { FileType, AppContextType} from '../config/types'


export const AppContext = createContext<AppContextType>({
    files: [],
    favorites: [],
    folderStructure: [],
    addFolderStructure: (str: string) => {},
    removeFolderStructure: () => {},
    setAllFiles: (files: FileType[]) => {},
    addToFavorites: (fileId: string) => {},
    removeFromFavorites: (fileId: string) => {},
})

interface providerPropTypes {
    children: React.ReactNode
}

 const AppContextProvider = ({children}: providerPropTypes) => {
    const [files, setFiles] = useState<FileType[]>([])
    const [favorites, setFavorites] = useState<string[]>([])
    const [folderStructure, setFolderStructure] = useState<string[]>([])


    const setAllFiles = (files: FileType[]) => {
        setFiles(files)
    }  

    const addFolderStructure = (str: string) => {
        setFolderStructure(prev => [...prev, str])
    }

    const removeFolderStructure = () => {
      
        setFolderStructure(prev => {
            const newFS = [...prev]
            newFS.pop()
            return newFS
        })
    }

    const addToFavorites = (fileId: string) => {
        setFavorites(prev => [...prev, fileId])
    }

    const removeFromFavorites = (fileId: string) => {
        setFavorites(prevFavs => {
            const newFavs = prevFavs.filter(id => id !== fileId)
            console.log({newFavs})
            return newFavs
        })
    }

    return <AppContext.Provider value={{
        files,
        favorites,
        folderStructure,
        addFolderStructure,
        removeFolderStructure,
        setAllFiles,
        addToFavorites,
        removeFromFavorites,
    }}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider