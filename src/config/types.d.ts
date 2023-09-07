export type FileType = {
    type: string,
    id: string,
    name: string,
    contents: FileType[],
    src: string,
    favorite: boolean,
    created_at: string,
}

export type AppContextType = {
    files: FileType[],
    favorites: string[],
    folderStructure: string[],
    addFolderStructure: (str: string) => void,
    removeFolderStructure: () => void,
    setAllFiles: (files: FileType[]) => void,
    addToFavorites: (file: string) => void,
    removeFromFavorites: (file: string) => void,
}