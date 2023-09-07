import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import { AppContext } from './context/app-context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FileSystem from './components/FileSystem';


function App() {
  const appCtx = useContext(AppContext)

  const {setAllFiles, files, } = appCtx

 

  useEffect(() => {
    const getFiles = async () => {
      const res = await fetch('/site.json')
      const data = await res.json()
      // console.log({data})
      setAllFiles(data)
    }
    getFiles()
  }, [])





  return (
    <BrowserRouter>
    
      <Routes  >
        <Route path="/" element={<FileSystem  />} />
        
        <Route path="/:id" element={<FileSystem  />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
